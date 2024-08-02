import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = 'http://localhost:3001/api/v1';

// Récupère le Profil Utilisateur
const userProfileAPI= async (token) => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.json();   
  }
  

//appel API pour modification de username
const usernameAPI = async ({ token, userName }) => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
};



export const userProfile = createAsyncThunk(
    'auth/userProfile',
    async (token, { rejectWithValue }) => {
      try {
          const response = await userProfileAPI(token);
          return response.body;        
      } catch (error) {
          return rejectWithValue(error.message);
      }
  });

export const updateUsername = createAsyncThunk(
    'auth/updateUsername',
    async ({ userName }, { getState, rejectWithValue }) => {
      const state = getState();
      const token = state.auth.token;
      try {
          const response = await usernameAPI({ token, userName });
          return response.body;
      } catch (error) {
          return rejectWithValue(error.message);
      }
  });

// Slice pour les données utilisateur
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userName: '',
        firstName: '',
        lastName: '',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userProfile.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.userName = action.payload.userName;
                state.error = null;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateUsername.fulfilled, (state, action) => {
                state.userName = action.payload.userName;
            })
            .addCase(updateUsername.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;


