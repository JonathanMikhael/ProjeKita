"use client";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
    items: AuditLog[]
};

export const Activty = ({
    items,
}: ActivityProps) =>{
    return(
        
        <div className="flex items-start w-full gap-x-3">
            <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700"/>
            <div className="w-full">
                <p className="mb-2 font-semibold text-neutral-700">
                    Activity
                </p>
                <ol className="mt-2 space-y-4">
                    {items.map((items) => (
                        <ActivityItem 
                            key={items.id}
                            data={items}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
};

Activty.Skeleton = function ActivitySkeleton() {
    return(
        <div className="flex items-start w-full gap-x-3">
            <Skeleton className="w-6 h-6 bg-neutral-200"/>
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200"/>
                <Skeleton className="w-full h-10 bg-neutral-200"/>
            </div>
        </div>
    );
};