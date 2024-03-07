"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { FormSubmit } from "./form-submit"
import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/update-card"
import { useParams } from "next/navigation"
import { CardwithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
 
const FormSchema = z.object({
  date: z.date({
    required_error: "A deadline is required.",
  }),
})

interface DeadlineProps{
  data: CardwithList;
};

export const DatePicker =({
  data
}: DeadlineProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
          queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
          queryKey: ["card-logs", data.id]
      });
      
      toast.success("Deadline updated!");
    },
    onError: (error) => {
        console.log({ error });
        toast.error(error); 
    }
});
 
  const onSubmit = (datanew: z.infer<typeof FormSchema>) => {
    const deadline = JSON.stringify(datanew, null, 2);
    const boardId = params.boardId as string;

    execute({
        id: data.id,
        deadline,
        boardId,
    });

    console.log(deadline);
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmit className="w-full bg-blue-600 hover:bg-blue-500">
          Set Deadline
        </FormSubmit>
      </form>
    </Form>
  )
}