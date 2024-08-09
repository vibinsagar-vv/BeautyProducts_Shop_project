import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetials : (state,action)=>{
        state.user=action.payload
    }
  },
})

export const { setUserDetials} = userSlice.actions

export default userSlice.reducer