import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    userList: {
        data: [],
        meta: {},
        loading: false,
        error: null,
    },
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
    createUserData: {
        loading: false,
        error: null,
    },
    updateInfo: {
        loading: false,
        error: null,
    },
    deleteUserData: {
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

        // get user list
        getUserListRequest: (state) => {
            state.userList.loading = true;
            state.userList.error = null;
        },
        getUserListSuccess: (state, action) => {
            const { data, meta } = action.payload;
            state.userList.loading = false;
            state.userList.data = data;
            state.userList.meta = meta;
        },
        getUserListFail: (state, action) => {
            const { error } = action.payload;
            state.userList.error = error;
            state.userList.loading = false;
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

        // create user
        createUserRequest: (state) => {
            state.createUserData.loading = true;
            state.createUserData.error = null;
        },
        createUserSuccess: (state, action) => {
            state.createUserData.loading = false;
        },
        createUserFail: (state, action) => {
            const { error } = action.payload;
            state.createUserData.error = error;
            state.createUserData.loading = false;
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

        // delete user
        deleteUserRequest: (state, action) => {
            state.deleteUserData.loading = true;
            state.deleteUserData.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.deleteUserData.loading = false;
        },
        deleteUserFailure: (state, action) => {
            const { error } = action.payload;
            state.deleteUserData.loading = false;
            state.deleteUserData.error = error;
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
    getUserListRequest,
    getUserListSuccess,
    getUserListFail,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
    createUserRequest,
    createUserSuccess,
    createUserFail,
    updateUserInfoRequest,
    updateUserInfoSuccess,
    updateUserInfoFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
