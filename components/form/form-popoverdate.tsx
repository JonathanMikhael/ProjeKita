"use client"; 

import * as React from "react";

import { 
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";


import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { DatePicker } from "./form-datePicker";
import { useQuery } from "@tanstack/react-query";
import { CardwithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { useCardModal } from "@/hooks/use-card-modal";




interface FormPopoverProps{
    children: React.ReactNode
    side?: "left" | "right" | "top" | "bottom"
    align?: "start" | "center" | "end";
    sideOffset?: number;
};

export const FormPopoverDate = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const id = useCardModal((state) => state.id);
    const closeRef = useRef<ElementRef<"button">>(null);

    const { data: cardData } = useQuery<CardwithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`),
    });

    return(
        <Popover>

            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="pt-3 w-80"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="pb-4 text-sm font-medium text-center text-neutral-600">
                    Set Card Deadline
                </div>

                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="absolute w-auto h-auto p-2 top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="w-4 h-4"/>
                    </Button>
                </PopoverClose>
                    <DatePicker data={cardData} ></DatePicker>
            </PopoverContent>
        </Popover>
    )
}