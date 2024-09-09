import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React, { memo, ReactNode, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchPosts,
  Post,
  selectAllPosts,
  selectPostById,
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import { Spinner } from '@/components/Spinner'
import { useSelector } from 'react-redux'
import { useGetPostsQuery } from '../api/apiSlice'
import classNames from 'classnames'
interface PostExcerptProps {
  // postId: string
  post: Post
}

const PostExcerpt = memo(({ post }: PostExcerptProps) => {
  // const post = useAppSelector((state) => selectPostById(state, postId))
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
  const { data: posts = [], isLoading, isFetching, isSuccess, isError, error, refetch } = useGetPostsQuery()
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])
  let content: ReactNode
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => <PostExcerpt post={post} key={post.id} />)
    const containerClassname = classNames('posts-container', {
      disabled: isFetching,
    })
    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  )
}

export default PostsList
