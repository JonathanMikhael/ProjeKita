import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"

import { FormPopover } from "@/components/form/form-popover"

export const Navbar = () =>{
    return(
        <nav className="fixed top-0 z-50 flex items-center w-full px-4 border-b shadow-sm h-14 bg-blue-950">
            <MobileSidebar />

            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo/>
                </div>
                <FormPopover align="start" side="bottom" sideOffset={10}>
                    <Button variant="primary" size="sm" className="hidden px-4 py-2 font-bold text-white transition duration-300 ease-in-out transform bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:shadow-outline md:block ">
                        Create Board
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button variant="primary" size="sm" className="block bg-blue-600 rounded-sm hover:bg-blue-500 md:hidden">
                        <Plus className="w-4 h-4"/>
                    </Button>
                </FormPopover>
            </div>
            <div className="flex items-center ml-auto gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{ 
                        elements:{
                            rootBox:{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor:"white",
                                borderRadius:"0.575rem",
                                padding:"5px",
                                marginRight:"5px",
                                boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                "&:hover":{
                                    borderRadius:"0.575rem",
                                    backgroundColor:"#efefef"
                                }
                            },
                            organizationPreviewMainIdentifier:{
                                color:"white",
                                fontWeight:"500",
                            },
                            organizationPreviewMainIdentifier__organizationSwitcher:{
                                color:"black"
                            },
                        },
                     }}
                />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{ 
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            }
                        }
                     }}
                />
            </div>
        </nav>
    )
}