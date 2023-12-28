"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTIONS, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return{
            error: "Unauthorized",
        };
    }

    const { id, boardId } = data;
    let card;

    try{
        const cardToCopy = await db.card.findUnique({
            where:{
                id,
                list: {
                    board:{
                        orgId
                    },
                },
            },
            include:{
                subCards:{
                    orderBy:{
                        order: "asc"
                    },
                },
            },
        });

       if(!cardToCopy){
        return{
            error: "Card not found"
        }
       };

       const lastCard = await db.card.findFirst({
        where: { listId: cardToCopy.listId },
        orderBy: { order: "desc"},
        select: { order: true }
       })

       const newOrder = lastCard ? lastCard.order + 1 : 1;

       card = await db.card.create({
            data:{
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                order: newOrder,
                listId: cardToCopy.listId,
                deadline: cardToCopy.deadline,
                subCards: {
                    createMany:{
                        data: cardToCopy.subCards.map((subcard) =>({
                            title: subcard.title,
                            priority: subcard.priority,
                            order: subcard.order,
                        })),
                    },
                },
            },
       });

       await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTIONS.CREATE,
       });
       
    } catch (error){
        return{
            error: "Failed to copy."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);