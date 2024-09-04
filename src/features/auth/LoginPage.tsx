import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React, { FormEvent } from 'react'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn } from './authSlice'
interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}
interface LoginPageElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}
const LoginPage = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<LoginPageElements>) => {
    e.preventDefault()
    const username = e.currentTarget.elements.username.value
    dispatch(userLoggedIn(username))
    navigate('/posts')
  }
  return (
    <section>
      <h2>Welcome to Tweeter</h2>
      <h3>Please log in:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User:</label>
        <select id="username" required name="username">
          <option value={''}></option>
        </select>
        <button>Log In</button>
      </form>
    </section>
  )
}

export default LoginPage
