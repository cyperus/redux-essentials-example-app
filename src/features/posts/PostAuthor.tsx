import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { selectUserById } from '../users/usersSlice'
interface PostAuthorProps {
  userId: string
}
function PostAuthor({ userId }: PostAuthorProps) {
  const author = useAppSelector((state) => selectUserById(state, userId))
  return <span>by {author?.name ?? 'Unknown author'}</span>
}

export default PostAuthor
