"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/clerk-react";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const Info = () =>{
    const { organization, isLoaded } = useOrganization();

    if(!isLoaded){
        return(
            <Info.Skeleton/>
        )
    }

    return(
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image 
                    fill
                    src={organization?.imageUrl!}
                    alt="Organization"
                    className="object-cover rounded-md"
                />
            </div>
            <div className="space-y-1">
                <p className="text-xl font-semibold">
                    {organization?.name}
                </p>

                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCard
                        className="w-3 h-3 mr-1"
                    /> Free
                </div>
            </div>
        </div>    
    );
};

Info.Skeleton = function SkeletonInfo(){
    return(
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="absolute w-full h-full"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
                <div className="flex items-center">
                    <Skeleton className="w-4 h-4 mr-2"/>
                    <Skeleton className="h-4 w-[100px]"/>
                </div>
            </div>
        </div>
    );
};

