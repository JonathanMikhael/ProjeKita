import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Footer = () =>{
    return(
        <div className="fixed bottom-0 w-full p-4 border-t bg-blue-950">
            <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
                <Logo/>
                <div className="flex items-center justify-between w-full space-x-4 text-slate-100 md:block md:w-auto">
                    <Button size="sm" variant="ghost">
                       Privacy Policy
                    </Button>
                    <Button size="sm" variant="ghost">
                        Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    );
};