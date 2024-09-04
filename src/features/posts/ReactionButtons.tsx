import React from 'react'
import type { Post, ReactionName } from './postsSlice'
import { reactionAdded } from './postsSlice'
import { useAppDispatch } from '@/app/hooks'
const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}
interface ReactionButtonsProps {
  post: Post
}
const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([stringName, emoji]) => {
    // Ensure TS knows this is a specific string type
    const reaction = stringName as ReactionName
    return (
      <button
        key={reaction}
        type="button"
        className="muted-button reaction-button"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction }))}
      >
        {emoji}
        {post.reactions[reaction]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}

export default ReactionButtons
