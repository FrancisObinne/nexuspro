import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

export interface AuthState {
  user: User | null
  status: 'idle' | 'loading'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.status = 'idle'
      state.error = null
    },
    setLoading: (state) => {
      state.status = 'loading'
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'idle'
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, setLoading, setError, clearError } = authSlice.actions
export default authSlice.reducer