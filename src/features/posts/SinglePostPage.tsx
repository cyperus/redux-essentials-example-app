import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import { selectCurrentUsername } from '../auth/authSlice'

function SinglePostPage() {
  const { postId } = useParams()
  const post = useAppSelector((state) => selectPostById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)!
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }
  const canEdit = currentUsername === post.user
  return (
    <section>
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
    </section>
  )
}

export default SinglePostPage
