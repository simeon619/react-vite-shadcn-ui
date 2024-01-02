import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addPost } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ButtonLoading } from "./LoadButton";
const schemaPost = z.object({
  titre: z.string().min(3, { message: "Title must be at least 3 characters" }),
  message: z.string().optional(),
});

type postType = z.infer<typeof schemaPost>;
export default function CreatePost() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    // mutationKey: ["addPost"],
    mutationFn: addPost,

    // onMutate: async (newTodo) => {
    //   await queryClient.cancelQueries({ queryKey: ["addPost"] });
    //   const previousTodos = queryClient.getQueryData(["addPost"]);
    //   queryClient.setQueryData(["addPost"], (old: any) => [...old, newTodo]);
    //   return { previousTodos };
    // },
    // onError: (err, newTodo, context) => {
    //   queryClient.setQueryData(["addPost"], context?.previousTodos);
    // },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const formHook = useForm<postType>({
    resolver: zodResolver(schemaPost),
  });
  function onSubmit(data: postType) {
    // console.log("🚀 ~ file: Register.tsx:40 ~ onSubmit ~ data:", data);
    mutate(data);
  }

  // if (isSuccess) {
  //   return <div>Success</div>;
  // }


  return (
    <div>
      <div className="flex flex-row justify-end gap-2 pb-4 ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-full ">
          <Form {...formHook}>
            <form
              className="space-y-4 flex flex-col gap-2"
              onSubmit={formHook.handleSubmit(onSubmit)}
            >
              <FormField
                control={formHook.control}
                name="titre"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="titre"
                        {...formHook.register("titre")}
                      />
                    </FormControl>
                    {Boolean(formHook.formState.errors.titre) ? (
                      <FormDescription className="text-red-500">
                        {formHook.formState.errors.titre?.message || ""}
                      </FormDescription>
                    ) : null}
                  </FormItem>
                )}
              />
              <FormField
                control={formHook.control}
                name="message"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        // control={formHook.control}
                        className="w-full hover:border-2 resize-none"
                        placeholder="Type your message here  (Optional)"
                        {...formHook.register("message")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {isPending ? (
                <div className={clsx("self-end")}>

                  <ButtonLoading />
                </div>
              ) : (
                <Button
                  type="submit"
                  className={clsx("self-end")}
                  disabled={!formHook.formState.isValid}
                >
                  Postez
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
      <hr />
    </div>
  );
}
