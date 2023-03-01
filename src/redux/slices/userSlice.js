import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: {},
    isAuth: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuth = true;
        },

        logout: (state) => {
            state.currentUser = {};
            state.isAuth = false;
            localStorage.removeItem("token")
        }
    }
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer