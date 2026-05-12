import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import forgotPasswordService from "../../services/forgotPassword.service";

// ==========================================
// FORGOT PASSWORD SLICE (Pham Phuc Tien - 23110339)
// ==========================================

const getErrorMessage = (payload) => {
  if (payload?.errors?.length > 0) return payload.errors[0].msg;
  if (payload?.error) return payload.error;
  if (payload?.message) return payload.message;
  return "Có lỗi xảy ra, vui lòng thử lại";
};

export const sendForgotPasswordOtp = createAsyncThunk(
  "forgotPassword/sendForgotPasswordOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await forgotPasswordService.sendOtp(email);
      if (res?.tempToken) {
        localStorage.setItem("resetPasswordTempToken", res.tempToken);
        return res;
      }
      return rejectWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "forgotPassword/resetPassword",
  async ({ otp, newPassword }, { rejectWithValue }) => {
    try {
      const tempToken = localStorage.getItem("resetPasswordTempToken");
      const res = await forgotPasswordService.resetPassword({
        otp,
        newPassword,
        tempToken,
      });

      if (res?.message) {
        localStorage.removeItem("resetPasswordTempToken");
        return res;
      }
      return rejectWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: "",
    tempToken: localStorage.getItem("resetPasswordTempToken") || "",
    isOtpSent: !!localStorage.getItem("resetPasswordTempToken"),
    isResetSuccess: false,
  },
  reducers: {
    clearForgotPasswordMessage: (state) => {
      state.error = null;
      state.message = "";
    },
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.tempToken = "";
      state.isOtpSent = false;
      state.isResetSuccess = false;
      localStorage.removeItem("resetPasswordTempToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendForgotPasswordOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(sendForgotPasswordOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.tempToken = action.payload.tempToken;
        state.isOtpSent = true;
      })
      .addCase(sendForgotPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.tempToken = "";
        state.isOtpSent = false;
        state.isResetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      });
  },
});

export const { clearForgotPasswordMessage, resetForgotPasswordState } =
  forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
