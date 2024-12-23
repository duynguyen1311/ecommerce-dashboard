import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info) => {
        try {
            console.log(info);
            const {data} = await api.post('/admin-login', info, {withCredentials: true});
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    }
)

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: ''
    },
    reducers: {

    }
})

export default authReducer.reducer;