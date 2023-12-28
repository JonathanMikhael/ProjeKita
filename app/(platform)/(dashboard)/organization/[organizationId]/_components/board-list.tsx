import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getAvailableCount } from "@/lib/org-limit";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { checkSubscription } from "@/lib/subscription";


export const BoardList = async () => {
    const { orgId } = auth();

    if(!orgId){
        return redirect("/select-org");
    }

    const boards = await db.board.findMany({
        where:{
            orgId,
        }
    });

    const availableCount = await getAvailableCount();
    const isPro = await checkSubscription();
    
    return(
        <div className="space-y-4">
            <div className="flex items-center text-lg font-semibold text-neutral-700">
                <User2 className="w-6 h-6 mr-2"/>
                Your Boards
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:grid-cols-3">
                {boards.map((board) =>(
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        className="relative w-full h-full p-2 overflow-hidden bg-center bg-no-repeat bg-cover rounded-sm group aspect-video bg-sky-700"
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                    >
                        <div className="absolute inset-0 transition bg-black/30 group-hover:bg-black/40"/>
                            <p className="relative font-semibold text-white">{board.title}</p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="relative flex flex-col items-center justify-center w-full h-full transition rounded-sm aspect-video bg-muted gap-y-1 hover:opacity-75"
                    >
                        <p className="text-sm">Create new board</p>
                        <span className="text-xs">
                            {isPro ? "Unlimited Boards" : `${MAX_FREE_BOARDS - availableCount} boards remaining`}
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`
                                Free Workspaces can have up to 5 open boards. For unlimited
                                boards upgrade this workspace.
                            `}
                        >
                            <HelpCircle
                                className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                            />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
            
        </div>
    );
};

BoardList.Skeleton = function SkeletonBoardList(){
    return(
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:cols-4">
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
            <Skeleton className="w-full h-full p-2 aspect-video"/>
        </div>
    );
};