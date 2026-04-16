import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import {
  apiLogin,
  apiRegister,
  apiGetMe,
  type LoginPayload,
  type RegisterPayload,
  type AuthUser,
  type AuthData,
} from '@/lib/authApi'
import { apiUpdateProfile, type UpdateProfilePayload } from '@/lib/authApi'

/* ─── State ──────────────────────────────────────────────── */
interface AuthState {
  user: AuthUser | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  initialized: boolean // true sau khi auth init hoàn tất (dù thành công hay thất bại)
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  initialized: false,
}

/** BE trả { user, accessToken }; type AuthData là dạng phẳng — chuẩn hoá về AuthUser */
function userFromAuthPayload(data: AuthData | { user: AuthUser; accessToken: string }): AuthUser {
  if (data && typeof data === 'object' && 'user' in data && data.user) {
    return data.user
  }
  const { accessToken: _, ...user } = data as AuthData
  return user
}

/* ─── Thunks ─────────────────────────────────────────────── */
export const register = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await apiRegister(payload)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await apiLogin(payload)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const initAuth = createAsyncThunk(
  'auth/init',
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetMe()
    } catch {
      return rejectWithValue(null)
    }
  },
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      return await apiUpdateProfile(payload)
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

/* ─── Slice ──────────────────────────────────────────────── */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.status = 'idle'
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.initialized = true
    },
  },
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.user = userFromAuthPayload(action.payload.data)
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })

    /* Init (restore session from cookie) */
    builder
      .addCase(initAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.initialized = true
      })
      .addCase(initAuth.rejected, (state) => {
        state.initialized = true
      })

    /* Login */
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.initialized = true
        state.user = userFromAuthPayload(action.payload.data)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })

    /* Update Profile */
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (state.user) {
          // Ghi đè thông tin mới ngay lập tức vào state Redux
          state.user = { ...state.user, ...action.payload.data }
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })

  },
})

export const { logout, clearError, setUser } = authSlice.actions

/* ─── Selectors ──────────────────────────────────────────── */
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.user !== null
export const selectAuthInitialized = (state: { auth: AuthState }) => state.auth.initialized

export const authReducer = authSlice.reducer
