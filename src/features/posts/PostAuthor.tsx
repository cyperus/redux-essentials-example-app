import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { selectUserById } from '../users/usersSlice'
interface PostAuthorProps {
  userId: string
  showPrefix?: boolean
}
function PostAuthor({ userId, showPrefix = true }: PostAuthorProps) {
  const author = useAppSelector((state) => selectUserById(state, userId))
  return (
    <span>
      {showPrefix ? 'by' : ''} {author?.name ?? 'Unknown author'}
    </span>
  )
}

export default PostAuthor
