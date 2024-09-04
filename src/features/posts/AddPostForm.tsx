import React from 'react'
import { Post, postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectAllUsers } from '../users/usersSlice'
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}
const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const userId = elements.postAuthor.value
    dispatch(postAdded(title, content, userId))
    console.log({ title, content, userId }, 'values======')
    e.currentTarget.reset()
  }
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value={''}></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Posts</button>
      </form>
    </section>
  )
}

export default AddPostForm
