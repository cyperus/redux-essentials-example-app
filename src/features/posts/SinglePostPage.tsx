import { useAppSelector } from '@/app/hooks'
import React, { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import { selectCurrentUsername } from '../auth/authSlice'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '@/components/Spinner'

function SinglePostPage() {
  const { postId } = useParams()
  const currentUsername = useAppSelector(selectCurrentUsername)!
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!)
  let content: ReactNode
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }
  const canEdit = currentUsername === post.user
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <p className="post-content"> {post.content}</p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    )
  }
  return <section>{content}</section>
}

export default SinglePostPage
