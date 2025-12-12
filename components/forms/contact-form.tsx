"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email."
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="animate-slide-up">
              <FormLabel className="text-base font-medium">Email Address</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="your@email.com"
                  type="email"
                />
              </FormControl>
              <FormDescription className="text-muted-foreground">
                We'll use this to get back to you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <FormLabel className="text-base font-medium">Subject</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="What's this about?"
                />
              </FormControl>
              <FormDescription className="text-muted-foreground">
                A brief summary of your inquiry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <FormLabel className="text-base font-medium">Message</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Tell us more about what you need help with..."
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormDescription className="text-muted-foreground">
                Please provide as much detail as possible
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button 
            type="submit" 
            size="lg" 
            variant="gradient"
            className="w-full shadow-glow"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
