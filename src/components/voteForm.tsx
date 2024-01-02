import { typeArrayPosts } from '@/lib/api'
import { generatedArray } from '@/lib/utils'
import clsx from 'clsx'
import { MinusCircle, PlusCircle } from 'lucide-react'

export default function VoteForm({ post  , sens }: { post: typeArrayPosts[0] | null , sens : "col" | "row"}) {
    if (!post) return null
  return (
    <div className={`flex flex-${sens} items-center  gap-2 p-2`}>
    <PlusCircle
      className={clsx(
        "hover:cursor-pointer",
        post.hasVoted === 1 ? "text-green-300" : ""
      )}
    />
    <span
      className={clsx(
        "font-bold text-base py-1",
        post.hasVoted === 0
          ? ""
          : post.hasVoted === -1
            ? "text-red-400"
            : "text-green-300"
      )}
    >
      {post.nbrVote}
    </span>
    <MinusCircle
      className={clsx(
        "hover:cursor-pointer",
        post.hasVoted === -1 ? "text-red-400" : ""
      )}
    />
  </div>
  )
}
