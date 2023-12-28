"use client";

import { Card } from "@prisma/client";

import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps{
    data: Card;
    index: number;
};

export const CardItem = ({
    data,
    index,
}: CardItemProps) =>{
    const cardModal = useCardModal();

    return(
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    onClick={() => cardModal.onOpen(data.id)}
                    className="px-3 py-2 text-sm truncate bg-white border-2 border-transparent rounded-md shadow-sm hover:border-black"
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    );
};