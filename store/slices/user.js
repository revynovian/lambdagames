import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user : {
    role: "",
    userid : "",
    accessToken : ""
  }
}

export const authSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(payload)
      state.isAuthenticated = true
      state.user = {
        role: payload.role,
        userid : payload.id,
        accessToken : payload.accessToken
      } 
    },
    logout: (state) => {
      state.value -= 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer