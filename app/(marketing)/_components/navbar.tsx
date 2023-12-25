import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () =>{
    return(
        <div className="fixed top-0 flex items-center w-full px-4 border-b shadow-sm h-14 bg-blue-950">
            <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
                <Logo/>
                <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500" size="sm" asChild>
                        <Link href="/sign-up">
                            Start Using ProjectKita
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};