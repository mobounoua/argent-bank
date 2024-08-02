import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = 'http://localhost:3001/api/v1';


//appel API pour authentification//
const loginAPI = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();   
};

// ** CREATION DES ACTIONS ASYNCHRONES **//
export const login = createAsyncThunk(
  'auth/login',
   async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await loginAPI({ email, password });
        const token = response.body.token
        localStorage.setItem('token', token);
        return { token };       
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
      token: localStorage.getItem('token') || null,
      error: null,
    },
  reducers: {
    logout: (state) => {
        state.token = null;
        localStorage.removeItem('token');
        state.error = null;
    },
},
  extraReducers: (builder) => {   
    builder
        .addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
  },
})
export const { logout } = authSlice.actions;
export default authSlice.reducer
