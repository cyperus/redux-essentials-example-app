import { RootState } from '@/app/store'
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'
import { createAppAsyncThunk } from '@/app/withTypes'
import { client } from '@/api/client'
import { selectAllPosts } from '../posts/postsSlice'
interface User {
  id: string
  name: string
}
const userAdapter = createEntityAdapter<User>()
export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})
const initialState = userAdapter.getInitialState()
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, userAdapter.setAll)
  },
})
export default usersSlice.reducer
export const { selectAll: selectAllUsers, selectById: selectUserById } = userAdapter.getSelectors(
  (state: RootState) => state.users,
)
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (!currentUsername) {
    return
  }
  return selectUserById(state, currentUsername!)
}
