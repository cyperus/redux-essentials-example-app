import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts/postsSlice'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    // Declare that `state.counter` will be updated by the `counterReducer` function
    posts: postsReducer,
  },
})
export type AppStore = typeof store
export type AppDipatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
