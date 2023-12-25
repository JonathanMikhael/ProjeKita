"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId  || !orgId){
        return{
            error: "Unauthorized",
        };
    }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|");

    console.log({
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    })

    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML){
        return{
            error:"Missing fields. Failed to create board."
        };
    }

    let board;

    try{
        board = await db.board.create({
            data: {
                orgId,
                title,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            }
        });
    } catch(error){
        return{
            error: "failed to create."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return { data:board };
};

export const createBoard = createSafeAction(CreateBoard, handler);