import { useAppSelector } from '@/app/hooks'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'

function SinglePostPage() {
  const { postId } = useParams()
  const post = useAppSelector((state) => selectPostById(state, postId!))
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <p className="post-content"> {post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
