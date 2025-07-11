import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { login as loginService } from '@/services/auth';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginService(credentials);
      const decoded = jwtDecode(data.access_token);
      const roles = decoded?.realm_access?.roles || [];
      const allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];

      if (!roles.some((r) => allowedRoles.includes(r))) {
        return rejectWithValue('Access denied');
      }

      sessionStorage.setItem('jwt_token', data.access_token);
      return decoded;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Login failed'
      );
    }
  }
);

const token = sessionStorage.getItem('jwt_token');
let initialUser = null;
let isAuthenticated = false;

if (token) {
  try {
    const decoded = jwtDecode(token);
    const notExpired = decoded.exp * 1000 > Date.now();
    if (notExpired) {
      initialUser = decoded;
      isAuthenticated = true;
    } else {
      sessionStorage.removeItem('jwt_token');
    }
  } catch {
    sessionStorage.removeItem('jwt_token');
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isAuthenticated,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      sessionStorage.removeItem('jwt_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
