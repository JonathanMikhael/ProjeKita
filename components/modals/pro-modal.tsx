"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () =>{
    const proModal = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError : (error) => {
            toast.error(error);
        },
    });

    const onClick = () => {
        execute({});
    };

    return(
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="relative flex items-center justify-center aspect-video">
                    <Image
                        src="/pro.png"
                        alt="pro"
                        className="object-cover"
                        fill
                    />
                </div>

                <div className="p-6 mx-auto space-y-6 text-neutral-700">
                    <h2 className="text-xl font-semibold text-center">
                        Unlock unlimited boards with ProjeKita Pro!
                    </h2>
                    <p className="font-semibold text-center text-md text-neutral-600">
                        Aim for the best with the best
                    </p>
                    <Button 
                        disabled={isLoading}
                        onClick={onClick}
                        className="w-full bg-blue-600 hover:bg-blue-500"
                        variant="primary"
                    >
                        Upgrade now
                    </Button>
                </div>
            </DialogContent>
            
        </Dialog>
    )
}