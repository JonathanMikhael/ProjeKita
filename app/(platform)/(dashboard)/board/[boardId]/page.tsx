import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ListContainer } from "../_components/list-container";

interface boardIdPageProps{
    params: {
        boardId: string;
        cardId: string;
    };
};

const BoardIdPage = async ({
    params,
}: boardIdPageProps) => {
    const { orgId } = auth();

    if(!orgId){
        redirect("/select-org");
    }

    const lists = await db.list.findMany({
        where:{
            boardId: params.boardId,
            board:{
                orgId,
            },
        },
        include:{
            cards:{
                orderBy:{
                    order: "asc",
                },
                include:{
                    subCards:{
                        orderBy:{
                            order: "asc",
                        }
                    },
                },
            },
        },
        orderBy:{
            order: "asc",
        }
    });

    return(
        <div className="h-full p-4 overflow-x-auto">
            <ListContainer
                boardId={params.boardId}
                data={lists}
            />
        </div>
    );
};

export default BoardIdPage;