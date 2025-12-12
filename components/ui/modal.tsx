"use client";

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }   

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl bg-card/95 backdrop-blur-md animate-scale-in">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                    <DialogDescription className="text-muted-foreground leading-relaxed">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="pt-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}