"use client";

import { List } from "@prisma/client";

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";

interface ListOptionProps{
    data: List;
    onAddCard: () => void;
}

export const ListOptions = ({
    data,
    onAddCard
}: ListOptionProps) =>{
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute: executeDelete} = useAction(deleteList, {
        onSuccess: (data) =>{
            toast.success(`List "${data.title}" deleted`);
            closeRef.current?.click();
        },
        onError: (error) =>{
            toast.error(error);
        }
    });

    const { execute: executeCopy} = useAction(copyList, {
        onSuccess: (data) =>{
            toast.success(`List "${data.title}" copied`);
            closeRef.current?.click();
        },
        onError: (error) =>{
            toast.error(error);
        }
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        
        executeDelete ({ id, boardId });
    };

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        
        executeCopy ({ id, boardId });
    };

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-auto h-auto p-2" variant="ghost">
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </PopoverTrigger>
                <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start"> 
                    <div className="pb-4 text-sm font-medium text-center text-neutral-600">
                        List Actions
                    </div>
                
                <PopoverClose ref={closeRef} asChild>
                    <Button className="absolute w-auto h-auto p-2 top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button 
                    onClick={onAddCard}
                    className="justify-start w-full h-auto p-2 px-5 text-sm font-normal rounded-none"
                    variant="ghost"
                >
                    Add Card
                </Button>
                <form action={onCopy}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="justify-start w-full h-auto p-2 px-5 text-sm font-normal rounded-none"
                    >
                        Copy List
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        variant="ghost"
                        className="justify-start w-full h-auto p-2 px-5 text-sm font-normal rounded-none"
                    >
                        Delete List
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}