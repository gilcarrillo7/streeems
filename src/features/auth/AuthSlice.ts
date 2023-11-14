import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  IActivationPayload,
  IUserInfoResponse,
  ILoginResponse,
  ISignUpResponse,
  ISignupPayload,
} from "../../interfaces";
import {
  AUTH,
  BASE_URL,
  USERS,
  ACTIVATION,
  TOKEN,
  LOGIN,
  ME,
  LOGOUT,
  GOOGLE,
  REGISTER_LOGIN,
  CREATE_USER,
} from "../../constants";
import { FetchError } from "../../types";

// Define a type for the slice state
export interface AuthState {
  status: "loading" | "idle";
  statusActivation: "loading" | "idle";
  error: string[];
  confirmMail: boolean;
  loginModal: boolean;
  logged: boolean;
  token: string;
  userInfo: IUserInfoResponse | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  status: "idle",
  statusActivation: "loading",
  confirmMail: false,
  error: [],
  loginModal: false,
  logged: false,
  token: (typeof window !== "undefined" && localStorage.getItem("token")) || "",
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginModal: (state, { payload }) => {
      state.loginModal = payload;
    },
    setLogged: (state, { payload }) => {
      state.logged = payload;
      state.loginModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
      state.error = [];
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      if (payload.detail) {
        state.logged = false;
        state.loginModal = false;
      } else {
        state.userInfo = payload;
        state.logged = true;
        state.loginModal = false;
      }
      state.status = "idle";
    });
    builder.addCase(fetchUserInfo.rejected, (state, { payload }) => {
      if (payload) state.error.push(payload.message);
      state.logged = false;
      state.loginModal = false;
      state.status = "idle";
    });
    builder.addCase(doLogin.pending, (state) => {
      state.status = "loading";
      state.error = [];
    });
    builder.addCase(doLogin.fulfilled, (state, { payload }) => {
      if (payload.non_field_errors) {
        state.error = payload.non_field_errors;
      } else if (payload.auth_token) {
        state.token = payload.auth_token;
      }
      state.status = "idle";
    });
    builder.addCase(doLogin.rejected, (state, { payload }) => {
      if (payload) state.error.push(payload.message);
      state.status = "idle";
    });
    builder.addCase(doLogout.pending, (state) => {
      state.status = "loading";
      state.error = [];
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = "";
      state.logged = false;
      state.status = "idle";
    });
    builder.addCase(doLogout.rejected, (state) => {
      state.token = "";
      state.logged = false;
      state.status = "idle";
    });
    builder.addCase(doSignUp.pending, (state) => {
      state.status = "loading";
      state.error = [];
    });
    builder.addCase(doSignUp.fulfilled, (state, { payload }) => {
      state.confirmMail = false;
      state.error = [];
      if (payload.password) {
        state.error = payload.password;
      } else if (payload.non_field_errors) {
        state.error = payload.non_field_errors;
      } else {
        state.confirmMail = true;
      }
      state.status = "idle";
    });
    builder.addCase(doSignUp.rejected, (state, { payload }) => {
      if (payload) state.error.push(payload.message);
      state.status = "idle";
    });
    builder.addCase(doActivation.pending, (state) => {
      state.statusActivation = "loading";
      state.error = [];
    });
    builder.addCase(doActivation.fulfilled, (state, { payload }) => {
      state.confirmMail = false;
      if (payload.token) {
        state.error = payload.token;
      } else if (payload.uid) {
        state.error = payload.uid;
      } else {
        state.logged = true;
        state.token = payload.auth_token;
        state.error = [];
      }
      state.statusActivation = "idle";
    });
    builder.addCase(doActivation.rejected, (state, { payload }) => {
      if (payload) state.error.push(payload.message);
      state.statusActivation = "idle";
    });
    builder.addCase(googleAuth.pending, (state) => {
      state.statusActivation = "loading";
      state.error = [];
    });
    builder.addCase(googleAuth.fulfilled, (state, { payload }) => {
      state.confirmMail = false;
      console.log(payload);
      state.statusActivation = "idle";
    });
    builder.addCase(googleAuth.rejected, (state, { payload }) => {
      if (payload) state.error.push(payload.message);
      state.statusActivation = "idle";
    });
  },
});

export const fetchUserInfo = createAsyncThunk<
  IUserInfoResponse,
  string,
  { rejectValue: FetchError }
>("fetchUserInfo", async (token: string) => {
  const response = await fetch(`${BASE_URL}/${AUTH}/${USERS}/${ME}/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const doLogin = createAsyncThunk<
  ILoginResponse,
  ISignupPayload,
  { rejectValue: FetchError }
>("doLogin", async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/${LOGIN}`, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `password=${password}&email=${email}`,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });
  const data = await response.json();
  return data;
});

export const doLogout = createAsyncThunk<
  void,
  string,
  { rejectValue: FetchError }
>("doLogout", async (token) => {
  const response = await fetch(`${BASE_URL}/${AUTH}/${TOKEN}/${LOGOUT}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const doSignUp = createAsyncThunk<
  ISignUpResponse,
  ISignupPayload,
  { rejectValue: FetchError }
>("doSignup", async ({ email, password, re_password }) => {
  const response = await fetch(`${BASE_URL}/${CREATE_USER}`, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `email=${email}&password=${password}&re_password=${re_password}`,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });
  const data = await response.json();
  return data;
});

export const doActivation = createAsyncThunk<
  IUserInfoResponse,
  IActivationPayload,
  { rejectValue: FetchError }
>("doActivation", async ({ token, uid }) => {
  const response = await fetch(`${BASE_URL}/${AUTH}/${USERS}/${ACTIVATION}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      uid,
    }),
  });
  const data = await response.json();
  return data;
});

export const googleAuth = createAsyncThunk<
  void,
  string,
  { rejectValue: FetchError }
>("googleAuth", async (id_token) => {
  const response = await fetch(
    `${BASE_URL}/${AUTH}/${GOOGLE}/${REGISTER_LOGIN}/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_token,
      }),
    }
  );
  const data = await response.json();
  return data;
});

export const { setLoginModal, setLogged } = authSlice.actions;

export const selectStatus = (state: RootState) => state.auth.status;
export const selectStatusActivation = (state: RootState) =>
  state.auth.statusActivation;
export const selectLogged = (state: RootState) => state.auth.logged;
export const selectLoginModal = (state: RootState) => state.auth.loginModal;
export const selectError = (state: RootState) => state.auth.error;
export const selectConfirmMail = (state: RootState) => state.auth.confirmMail;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
