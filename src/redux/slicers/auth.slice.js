import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    userInfo: {
        data: {},
        loading: false,
        error: null,
    },
    registerData: {
        loading: false,
        error: null,
    },
    loginData: {
        loading: false,
        error: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // register
        registerRequest: (state) => {
            state.registerData.loading = true;
            state.registerData.error = null;
        },
        registerSuccess: (state, action) => {
            state.registerData.loading = false;
        },
        registerFail: (state, action) => {
            const { error } = action.payload;
            state.registerData.error = error;
            state.registerData.loading = false;
        },

        // login
        loginRequest: (state) => {
            state.loginData.loading = true;
            state.loginData.error = null;
        },
        loginSuccess: (state, action) => {
            const { data } = action.payload;
            state.loginData.loading = false;
            state.userInfo.data = data;
        },
        loginFail: (state, action) => {
            const { error } = action.payload;
            state.loginData.error = error;
            state.loginData.loading = false;
        },

        // logout
        logoutRequest: (state) => {
            state.userInfo.data = {};
            localStorage.removeItem("accessToken");
        },

        // get user info
        getUserInfoRequest: (state) => {
            state.userInfo.loading = true;
            state.userInfo.error = null;
        },
        getUserInfoSuccess: (state, action) => {
            const { data } = action.payload;
            state.userInfo.loading = false;
            state.userInfo.data = data;
        },
        getUserInfoFail: (state, action) => {
            const { error } = action.payload;
            state.userInfo.error = error;
            state.userInfo.loading = false;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    logoutRequest,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
} = authSlice.actions;

export default authSlice.reducer;
