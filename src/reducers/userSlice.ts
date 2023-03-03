import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../api/user";
import { IUser, IUserProfile } from "../intefaces";

interface IInitialState {
  user: IUser | null,
  loading: boolean,
  error: string | unknown
}

const initialState: IInitialState = {
  user: null,
  loading: false,
  error: ""
}


export const addUserProfile = createAsyncThunk("addUserProfile", async (profile: IUserProfile, { fulfillWithValue, rejectWithValue, getState }) => {
  // @ts-ignore
  const { user } = getState().userSlice;
  const result = await userApi.addUserProfile(user.id, profile);
  if (result.status === "success") {
    return fulfillWithValue(result.data)
  } else {
    rejectWithValue(result.errorMessage)
  }
})

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(addUserProfile.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(addUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (state.user) {
        state.user = {
          ...state.user,
          profile: {
            ...action.payload
          }
        }
      }
    })
    builder.addCase(addUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
})

export const { login } = userSlice.actions
export default userSlice.reducer