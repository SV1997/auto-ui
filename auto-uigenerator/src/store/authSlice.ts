import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:{}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login:(state,action)=>{
            state.userData=action.payload,
            state.status=true
        }
    }
})

export const {login}= authSlice.actions;
export default authSlice.reducer