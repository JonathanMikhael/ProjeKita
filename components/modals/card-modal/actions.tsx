"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardwithList } from "@/types";
import { Clock, Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteCard } from "@/actions/delete-card";
import { copyCard } from "@/actions/copy-card";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";
import { toast } from "sonner";

interface ActionsProps{
    data: CardwithList;
};

export const Actions = ({
    data,
}: ActionsProps) => {
    const params = useParams();

    const cardModal = useCardModal();

    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" Copied`);
            cardModal.onClose();
        },
        onError(error) {
            toast.error(error);
        },
    });
    
    const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" Deleted`);
            cardModal.onClose();
        },
        onError(error) {
            toast.error(error);
        },
    })

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
            id: data.id,
            boardId,
        });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({
            id: data.id,
            boardId,
        });
    };

    return(
        <div className="mt-2 space-y-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
                onClick={onCopy}
                disabled={isLoadingCopy}
                className="justify-start w-full"
                variant="gray"
                size="inline"
            >
                <Copy className="w-4 h-4 mr-2"/>
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={isLoadingDelete}
                className="justify-start w-full"
                variant="gray"
                size="inline"
            >
                <Trash className="w-4 h-4 mr-2"/>
                Delete
            </Button>
            <Button
                className="justify-start w-full"
                variant="gray"
                size="inline"
            >
                <Clock className="w-4 h-4 mr-2"/>
                Deadline
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionSkeleton() {
    return(
        <div className="mt-2 space-y-2">
            <Skeleton className="w-20 h-4 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
        </div>
    );
};