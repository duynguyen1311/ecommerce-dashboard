import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info, { rejectWithValue, fulfillWithValue }) => {  // Changed from rejectedWithValue
        try {
            console.log(info);
            const { data } = await api.post('/admin-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);  // Changed from rejectedWithValue
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
        messageClear : (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(admin_login.pending, (state) => {  // Removed unused payload parameter
                state.loader = true;
                state.successMessage = '';  // Reset message when pending
            })
            .addCase(admin_login.rejected, (state, action) => {  // Changed payload to action
                state.loader = false;
                state.errorMessage = action.payload.error;  // Access error through action.payload
            })
            .addCase(admin_login.fulfilled, (state, action) => {  // Added fulfilled case
                state.loader = false;
                state.successMessage = action.payload.message;
                state.userInfo = action.payload;
            });
    }
});

export const {messageClear} = authReducer.actions;
export default authReducer.reducer;