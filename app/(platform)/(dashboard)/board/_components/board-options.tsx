"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"

import { MoreHorizontal, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";

import { toast } from "sonner";

interface BoardOptionProps{
    id: string;
};

export const BoardOptions = ({ 
    id 
}: BoardOptionProps) =>{
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error);
        }
    });

    const onDelete = () =>{
        execute ({ id });
    };
    
    return(
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="w-auto h-auto p-2" variant="transparent">
                        <MoreHorizontal className="w-4 h-4"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent 
                    className="px-0 pt-3 pb-3"
                    side="bottom"
                    align="start"
                >
                    <div className="text-sm font-medium text-center text-neutral-600">
                        Board Acitons
                    </div>
                    <PopoverClose asChild>
                        <Button 
                            className="absolute w-auto h-auto p-2 top-2 right-2 text-neutral-600"
                            variant="ghost"
                        >
                            <X className="w-4 h-4"/>
                        </Button>
                    </PopoverClose>
                    <Button
                        variant="ghost"
                        onClick={onDelete}
                        disabled={isLoading}
                        className="justify-start w-full h-auto p-2 px-5 text-sm font-normal rounded-none"
                    >
                        Delete this board
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};