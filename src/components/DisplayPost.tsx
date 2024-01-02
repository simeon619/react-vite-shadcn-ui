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
import { Textarea } from "@/components/ui/textarea";
import { getPosts } from "@/lib/api";
import { usePostStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Flag, MessageCircle } from "lucide-react";
import VoteForm from "./voteForm";
import { SkeletonDemo } from "./loaderPost";

export const DisplayPost = () => {
  const { setPost } = usePostStore();
  const navigate = useNavigate();

  const {
    data: newPosts,
    isLoading,
    isError,
    refetch,

    error
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const posts = newPosts || [];
  //        ^?

  if (isError) {
    return (
      <div className=" flex justify-between mt-2 place-items-start">
       <span className="text-red-500 "> Error{JSON.stringify(error.message)}</span>
        <span
          className="hover:cursor-pointer border-[1px]   border-white rounded-full text-white px-1"
          onClick={() => refetch()}
        >refresh</span>
      </div>
    );
  }


  // const route = new Router()
  return (
    <div className="rounded-lg  bg-neutral-950">

      {isLoading && <SkeletonDemo/>}
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex justify-start rounded-lg hover:border-1 hover:border-neutral-500 mb-3 "
        >
          <VoteForm post={post} sens="col" />
          <div className=" bg-black w-full  px-2 py-1 hover:cursor-pointer border-[1px] hover:border-[1px] hover:border-neutral-100">
            <div
              onClick={() => {
                setPost(post);
                //@ts-ignore
                navigate({ to: `/post/${post.id}` });
              }}
              className="flex flex-col gap-2 "
            >
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={post.account.picture} alt="@shadcn" />
                  <AvatarFallback className="font-bold self-center font-mono text-xl">
                    {post.account.pseudo.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="font-bold self-center font-mono text-base ">
                  {post.account.pseudo}
                </p>
              </div>

              <div className="p-1">
                <p className="font-bold text-base pb-2">{post.titre}</p>
                <p className="text-sm">{post.message}</p>
              </div>
            </div>
            {/* </Link> */}

            <div className="flex pt-1 mt-2 pb-2 gap-1 border-t-[1px] border-slate-900 hover:cursor-auto">
              <div className="flex gap-1 hover:cursor-pointer hover:bg-stone-900 p-2">
                <MessageCircle size={21} />{" "}
                <p className="text-sm">
                  {post.nbrComment} comment{post.nbrComment > 1 ? "s" : ""}
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
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
