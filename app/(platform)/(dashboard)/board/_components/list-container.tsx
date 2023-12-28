"use client";

import { ListWithCards } from "@/types";
import { useEffect, useState } from "react";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";


import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { toast } from "sonner";


interface ListContainerProps{
    data: ListWithCards[];
    boardId: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number){
  const result  = Array.from(list);
  const[removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const ListContainer = ({
    data,
    boardId,
}: ListContainerProps) =>{
    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
      onSuccess: () =>{
        toast.success("List reordered");
      },
      onError: (error) =>{
        toast.error(error);
      }
    });

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
      onSuccess: () =>{
        toast.success("Card reordered");
      },
      onError: (error) =>{
        toast.error(error);
      }
    });

    const [orderedData, setOrderedData] = useState(data);
    
    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const onDragEnd =(result: any) =>{
      const { destination, source, type } = result;

      if(!destination){
        return;
      }

      //if dropped in the same position
      if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ){
        return;
      }

      //if moves list
      if(type === "list"){
        const items = reorder(
          orderedData,
          source.index,
          destination.index,
        ).map((item,index) => ({...item, order:index }));

        setOrderedData(items);
        executeUpdateListOrder({items, boardId});
      }

      //if moves card
      if(type === "card"){
        let newOrderedData = [...orderedData];

        const sourceList = newOrderedData.find(list => list.id === source.droppableId);
        const destList = newOrderedData.find(list => list.id === destination.droppableId);
        
        if(!sourceList || !destList){
          return;
        }

        //check if cards exists on Sourcelist
        if(!sourceList.cards){
          sourceList.cards = [];
        }

        //check if cards exist on destList
        if(!destList.cards){
          destList.cards = [];
        }

        //if moves card to the same list
        if(source.droppableId === destination.droppableId){
          const reorderedCards = reorder(
            sourceList.cards,
            source.index,
            destination.index,
          );

          reorderedCards.forEach((card,idx) => {
            card.order = idx;
          });

          sourceList.cards = reorderedCards;

          setOrderedData(newOrderedData);
          
          executeUpdateCardOrder({
            boardId: boardId,
            items: reorderedCards,
          });
          //if moves card to another list
        } else{
          //remove card from list awal
          const [movedeCard] = sourceList.cards.splice(source.index, 1);
          
          // assign new listId to moved card
          movedeCard.listId = destination.droppableId;

          //add card to the list tujuan
          destList.cards.splice(destination.index, 0, movedeCard);

          sourceList.cards.forEach((card,idx) =>{
            card.order = idx;
          });

          //update the order
          destList.cards.forEach((card, idx) => {
            card.order = idx;
          });
          
          setOrderedData(newOrderedData);
          executeUpdateCardOrder({
            boardId: boardId,
            items: destList.cards,
          });
        }
      }

      
    };

    return(
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <ol 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex h-full gap-x-3"> 
                {orderedData.map((list, index) => {
                  return (
                    <ListItem
                      key={list.id}
                      index={index}
                      data={list}
                    />
                  )
                })}
                {provided.placeholder}
                <ListForm />
                <div className="w-1 flex-shrink-o"/>
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    );
};

