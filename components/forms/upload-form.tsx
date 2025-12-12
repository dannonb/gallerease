"use client";

import { useCallback, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useOverviewData } from "@/hooks/use-overview-data";
import ImageDetails from "../ui/image-details";
import { createImages } from "@/actions/images";
import { ImagePlus, Wand } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { uploadImageToS3 } from "@/actions/upload";

const formSchema = z.object({
  images: z.array(
    z.object({
      originalUrl: z.string(),
      cdnUrl: z.string(),
      galleryId: z.string(),
      file: z.instanceof(File),
      preview: z.any(),
      description: z.string().optional(),
      alt: z.string().optional(),
      link: z.string().optional(),
      isDraft: z.boolean().default(false),
      isArchived: z.boolean().default(false),
    })
  ),
  galleryId: z.string(),
});

type ProductFormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const params = useParams();
  const router = useRouter();

  const { galleries } = useOverviewData();

  const { siteId } = params;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { images: [] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        try {
          reader.onload = () => append({
            originalUrl: '',
            cdnUrl: '',
            file,
            preview: reader.result,
            description: "",
            alt: "",
            link: "",
            isDraft: true,
            isArchived: false,
            galleryId: "",
          });
          reader.readAsDataURL(file);
          form.clearErrors("images");
        } catch (error) {
          setPreview(null);
          form.resetField("images");
        }
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 30,
      maxSize: 10000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      console.log(data)
      const results = await Promise.all(
        data.images.map(async (image) => {
          const response = await uploadImageToS3(image.file.name, image.file.type)

          if (!response) {
            return
          }

          const { url, fields } = response

          const formData = new FormData()
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value as string)
          })
          formData.append('file', image.file)

          const imageUrl = `${response.url}${response.fields.key}`

          const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formData,
          })

          if (uploadResponse.ok) {
            return {
              ...image,
              originalUrl: imageUrl,
              cdnUrl: `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DISTRO}${response.fields.key}`
            }
          } else {
            console.error('S3 Upload Error:', uploadResponse)
          }
        })
      )

      const completeData = results.map((image) => {
        const img = {
          ...image,
          siteId,
          galleryId: data.galleryId,
        }

        delete img.file
        delete img.preview
        return img
      });

      const count = await createImages(completeData);

      router.refresh();
      router.push(`/dashboard/${siteId}/overview/images`);

      const toastMessage = `${count} image(s) successfully added`;
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-full">
        {/* Gallery Selection */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border shadow-soft">
          <div className="flex flex-col md:flex-row space-y-6 md:space-x-8 md:space-y-0 items-start md:items-center">
            <FormField
              control={form.control}
              name="galleryId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base font-medium">Select Gallery</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Choose a gallery for your images"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      {galleries.map((gallery) => (
                        <SelectItem key={gallery.id} value={gallery.id} className="rounded-lg">
                          {gallery.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Future AI Tools */}
            <div className="glass rounded-xl p-4 space-x-3 opacity-50">
              <Button variant='outline' size="sm" disabled className="rounded-lg">
                <Wand className="w-4 h-4" /> 
                <span className="ml-2">AI Alt Tags</span>
              </Button>
              <Button variant='outline' size="sm" disabled className="rounded-lg">
                <Wand className="w-4 h-4" /> 
                <span className="ml-2">AI Descriptions</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="w-full space-y-8">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="mx-auto max-w-2xl">
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`
                      mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-6 
                      rounded-2xl border-2 border-dashed p-12 transition-all duration-300
                      ${isDragActive 
                        ? 'border-primary bg-primary/5 scale-105' 
                        : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/20'
                      }
                      shadow-soft hover:shadow-glow
                    `}
                  >
                    <div className={`
                      p-6 rounded-full transition-all duration-300
                      ${isDragActive ? 'bg-primary/10 scale-110' : 'bg-muted/50'}
                    `}>
                      <ImagePlus className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <Input {...getInputProps()} type="file" multiple={true} max={30} className="hidden" />
                    <div className="text-center space-y-2">
                      {isDragActive ? (
                        <p className="text-lg font-medium text-primary">Drop your images here!</p>
                      ) : (
                        <>
                          <p className="text-lg font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG or JPEG (max 10MB each, up to 30 files)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage>
                  {fileRejections.length !== 0 && (
                    <p className="text-destructive text-center mt-4">
                      Some files were rejected. Images must be less than 10MB and of type PNG, JPG, or JPEG.
                    </p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          {fields.length > 0 && (
            <div className="flex justify-center animate-slide-up">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || !form.getValues().images.length}
                size="lg"
                variant="gradient"
                className="px-12 py-4 text-lg font-medium shadow-glow"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  `Upload ${fields.length} Image${fields.length > 1 ? 's' : ''}`
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Image Preview Grid */}
        {fields.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Preview & Edit</h3>
              <p className="text-muted-foreground">Review your images and add details before uploading</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fields.map((field, index) => (
                <div key={field.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ImageDetails
                    control={form.control}
                    field={field}
                    index={index}
                    remove={remove}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UploadForm;
