import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Axios from 'axios';
import Cookies from 'js-cookie';

// create thunk
export const loginAsync = createAsyncThunk(
  'authenticate/login',
  async ({usernameOrEmail , password}, {rejectWithValue}) => {
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const url = `${apiUrl}user/login`;

      const response = await  Axios.post(url, {
      usernameOrEmail,
      password
      })
      
      const accessToken = response.data.accessToken
      const id = response.data.id

      Cookies.set("token",accessToken)
      Cookies.set("userID", id)

      return response.data
      
    }
    catch (err) {
      throw rejectWithValue(err.response.data)
    }
  }
)


//  create slice
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
    // login: (state, { payload }) => {
    //   console.log(payload)
    //   state.isAuthenticated = true
    //   state.user = {
    //     role: payload.role,
    //     userid : payload.id,
    //     accessToken : payload.accessToken
    //   } 
    // },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = {
        role: "",
        userid : "",
        accessToken : ""
      } 
    }
  },
  extraReducers:{
    [loginAsync.fulfilled]:  (state, {payload}) => {
      // Add user to the state array
      state.isAuthenticated = true;
      state.user = {
        role: payload.role,
        userid : payload.id,
        accessToken : payload.accessToken
      } 
    },
  }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer