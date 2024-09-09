import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectAllUsers } from '../users/usersSlice'
import { selectCurrentUsername } from '../auth/authSlice'
import { useAddNewPostMutation } from '../api/apiSlice'
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}
const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)!
  const users = useAppSelector(selectAllUsers)
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const form = e.currentTarget
    try {
      setAddRequestStatus('pending')
      await addNewPost({ title, content, user: userId }).unwrap()
      form.reset()
    } catch (error) {
      console.error('Failed to save the post:', error)
    } finally {
      setAddRequestStatus('idle')
    }
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
        <button disabled={isLoading}>Save Posts</button>
      </form>
    </section>
  )
}

export default AddPostForm
