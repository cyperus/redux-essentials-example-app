import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React, { memo, ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostsStatus } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import { Spinner } from '@/components/Spinner'
interface PostExcerptProps {
  post: Post
}

const PostExcerpt = memo(({ post }: PostExcerptProps) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <ReactionButtons post={post} />
    </article>
  )
})

const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  let content: ReactNode
  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPost.map((post) => <PostExcerpt post={post} key={post.id} />)
  } else if (postStatus === 'rejected') {
    content = <div>{postsError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
