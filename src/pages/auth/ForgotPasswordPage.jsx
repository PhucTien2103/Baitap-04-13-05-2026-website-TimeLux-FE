import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/common/FormInput";
import SubmitButton from "../../components/common/SubmitButton";
import {
  clearForgotPasswordMessage,
  resetForgotPasswordState,
  resetPassword,
  sendForgotPasswordOtp,
} from "../../store/slices/forgotPasswordSlice";

// ==========================================
// FORGOT PASSWORD PAGE (Pham Phuc Tien - 23110339)
// ==========================================

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, isOtpSent } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = async () => {
    dispatch(clearForgotPasswordMessage());
    await dispatch(sendForgotPasswordOtp(email));
  };

  const handleResetPassword = async () => {
    dispatch(clearForgotPasswordMessage());

    const result = await dispatch(resetPassword({ otp, newPassword }));
    if (resetPassword.fulfilled.match(result)) {
      setTimeout(() => {
        dispatch(resetForgotPasswordState());
        navigate("/login");
      }, 900);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-all duration-500">
      <div
        className={`w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-opacity duration-500 ${
          loading ? "opacity-70" : "opacity-100"
        }`}
      >
        <Link
          to="/"
          className="mb-4 inline-flex text-sm font-medium text-gray-500 hover:text-blue-600 hover:underline"
        >
          ← Trang chủ
        </Link>
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Quên mật khẩu
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            {isOtpSent ? "Nhập OTP và mật khẩu mới" : "Nhập email để nhận mã OTP"}
          </p>
        </header>

        <div className="space-y-4">
          {error && <Alert message={error} type="error" showIcon className="rounded-lg" />}
          {message && (
            <Alert message={message} type="success" showIcon className="rounded-lg" />
          )}

          {!isOtpSent ? (
            <>
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  dispatch(clearForgotPasswordMessage());
                }}
                placeholder="name@example.com"
              />
              <SubmitButton loading={loading} onClick={handleSendOtp}>
                Gửi mã OTP
              </SubmitButton>
            </>
          ) : (
            <>
              <FormInput
                label="OTP"
                name="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  dispatch(clearForgotPasswordMessage());
                }}
                placeholder="6 chữ số"
                maxLength={6}
              />
              <FormInput
                label="Mật khẩu mới"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  dispatch(clearForgotPasswordMessage());
                }}
                placeholder="Tối thiểu 6 ký tự"
              />
              <SubmitButton loading={loading} onClick={handleResetPassword}>
                Đổi mật khẩu
              </SubmitButton>
            </>
          )}
        </div>

        <Link
          to="/login"
          className="block mt-6 text-center text-gray-500 text-sm font-medium hover:text-blue-600 hover:underline"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
