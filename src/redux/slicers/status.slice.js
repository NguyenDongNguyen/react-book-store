import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    statusList: {
        data: [],
        loading: false,
        error: null,
    },
    updateStatus: {
        loading: false,
        error: null,
    },
};

export const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        // getStatusList
        getStatusListRequest: (state, action) => {
            state.statusList.loading = true;
            state.statusList.error = null;
        },
        getStatusListSuccess: (state, action) => {
            const { data } = action.payload;
            state.statusList.data = data;
            state.statusList.loading = false;
        },
        getStatusListFailure: (state, action) => {
            const { error } = action.payload;
            state.statusList.loading = false;
            state.statusList.error = error;
        },

        // updateStatusList
        updateStatusListRequest: (state, action) => {
            state.updateStatus.loading = true;
            state.updateStatus.error = null;
        },
        updateStatusListSuccess: (state, action) => {
            state.updateStatus.loading = false;
        },
        updateStatusListFailure: (state, action) => {
            const { error } = action.payload;
            state.updateStatus.loading = false;
            state.updateStatus.error = error;
        },
    },
});

export const {
    getStatusListRequest,
    getStatusListSuccess,
    getStatusListFailure,
    updateStatusListRequest,
    updateStatusListSuccess,
    updateStatusListFailure,
} = statusSlice.actions;

export default statusSlice.reducer;
