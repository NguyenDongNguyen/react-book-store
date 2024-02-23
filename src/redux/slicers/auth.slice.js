import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    userInfo: {
        data: {},
        loading: true,
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
    updateInfo: {
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
            state.userInfo.loading = false;
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

        // update user info
        updateUserInfoRequest: (state) => {
            state.updateInfo.loading = true;
            state.updateInfo.error = null;
        },
        updateUserInfoSuccess: (state, action) => {
            const { data } = action.payload;
            state.updateInfo.loading = false;
            state.userInfo.data = data;
        },
        updateUserInfoFail: (state, action) => {
            const { error } = action.payload;
            state.updateInfo.error = error;
            state.updateInfo.loading = false;
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
    updateUserInfoRequest,
    updateUserInfoSuccess,
    updateUserInfoFail,
} = authSlice.actions;

export default authSlice.reducer;
