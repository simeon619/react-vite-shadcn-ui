import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePostStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Flag, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import VoteForm from "@/components/voteForm";
import { PostIndex } from "@/lib/route";

const FormSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "Comment must be at least 1 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 30 characters.",
    }),
});
export default function Post() {
  const { params } = useMatch({ from: PostIndex.id });
  const post = usePostStore((s) => s.post);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert("You submitted the following values:" + JSON.stringify(data));
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="flex justify-center">
      <div className="w-3/4 md:w-3/5 lg:w-2/5">
        <div className=" bg-neutral-950 sticky flex justify-between px-4 mb-8 items-center top-0">
          <div className="flex gap-2 items-center">
            <VoteForm post={post} sens="row" />
            <span className="text-center">{post?.titre}</span>
          </div>

          <ChevronLeft
            className="hover:cursor-pointer   text-xl"
            onClick={
              // @ts-ignore
              () => navigate({ to: "../../" })
            }
          />
        </div>
        <div className="flex  justify-start rounded-lg mb-3 ">
          <VoteForm post={post} sens="col" />
          <div className=" bg-black w-full  px-2 py-1 hover:cursor-pointer border-[1px]">
            <div>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={post?.account.picture} alt="@shadcn" />
                  <AvatarFallback className="font-bold self-center font-mono text-xl">
                    {post?.account.pseudo.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="font-bold self-center font-mono text-base ">
                  {post?.account.pseudo}
                </p>
              </div>

              <div className="p-1">
                <p className="font-bold text-base pb-2">{post?.titre}</p>
                <p className="text-sm">{post?.message}</p>
              </div>
            </div>
            {/* </Link> */}

            <div className="flex pt-1 mt-2 py-4 gap-1 ">
              <div className="flex gap-1 p-2">
                <MessageCircle size={21} />{" "}
                <p className="text-sm">
                  {post?.nbrComment} comment
                  {
                    // @ts-ignore
                    post?.nbrComment > 1 ? "s" : ""
                  }
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex gap-1 hover:cursor-pointer hover:bg-stone-900 p-2">
                    <Flag size={21} /> <p className="text-sm">report</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Report</DialogTitle>
                    <DialogDescription>
                      Make a report about this post
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex">
                    <Textarea
                      className="w-full hover:border-2"
                      placeholder="Report here  (Optional)"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Report
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="w-full  space-y-6 flex flex-col items-center justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full my-6"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Comment while {post?.account.pseudo}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="flex self-end my-4 ">
                    comment
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
