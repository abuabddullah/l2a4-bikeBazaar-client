import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { IApiResType, IUser, IUserResDataType } from "../../types/res.types";
import { RootState } from "../store";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  token?: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IApiResType<IUserResDataType>>) => {
      state.user = action.payload.data.user;
      state.isAuthenticated = true;
      state.token = action.payload.data.token;
      toast.success(`${action.payload.message}`, { id: "login" });
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = undefined;
      toast.success("Logged out successfully", { id: "logout" });
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth?.user;
export const selectUserToken = (state: RootState) => state.auth?.token;
export default authSlice.reducer;
