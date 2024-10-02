import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from "react-hot-toast";

// const ApiUrl = "http://localhost:3000";

export const signup = createAsyncThunk('auth/signup', async (userInfo) => {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: "include",
            body: JSON.stringify(userInfo)
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        localStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        toast.error(error.message)
    }
});

export const login = createAsyncThunk('auth/login', async (credentials) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: "include",
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        localStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        toast.error(error.message)
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        localStorage.removeItem('user');

        return data;
    } catch (error) {
        toast.error(error.message)
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
    },
});

export default authSlice.reducer;