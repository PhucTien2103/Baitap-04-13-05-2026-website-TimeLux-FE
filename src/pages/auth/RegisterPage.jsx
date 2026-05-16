import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../components/common/FormInput';
import SubmitButton from '../../components/common/SubmitButton';
import AuthShell from '../../components/common/AuthShell';
import StatusAlert from '../../components/common/StatusAlert';
import {
    clearError,
    clearRegisterFeedback,
    registerUser,
    resetRegistrationState,
    verifyOtp,
} from '../../redux/slices/authSlice';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { registerLoading, registerError, registerMessage, isOtpSent, user } = useSelector((state) => state.auth);

    const [countdown, setCountdown] = useState(300);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        otpCode: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(clearError());
        dispatch(clearRegisterFeedback());

        return () => {
            dispatch(resetRegistrationState());
        };
    }, [dispatch]);

    useEffect(() => {
        let timer;

        if (isOtpSent && countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        }

        return () => clearInterval(timer);
    }, [isOtpSent, countdown]);

    useEffect(() => {
        if (isOtpSent) {
            const otpInput = document.getElementsByName('otpCode')[0];
            if (otpInput) otpInput.focus();
        }
    }, [isOtpSent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleRegister = async () => {
        setErrors({});
        dispatch(clearRegisterFeedback());

        const result = await dispatch(
            registerUser({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            })
        );

        if (registerUser.fulfilled.match(result)) {
            setCountdown(300);
            return;
        }

        if (result.payload?.errors) {
            const serverErrors = {};
            result.payload.errors.forEach((item) => {
                serverErrors[item.path] = item.msg;
            });
            setErrors(serverErrors);
            return;
        }

        setErrors({ global: result.payload?.error || 'Có lỗi xảy ra' });
    };

    const handleVerifyOTP = async () => {
        setErrors({});
        dispatch(clearRegisterFeedback());

        const result = await dispatch(verifyOtp({ otp: formData.otpCode }));

        if (verifyOtp.fulfilled.match(result)) {
            const roleId = result.payload?.user?.roleId || user?.roleId;
            navigate(roleId === 'R1' ? '/admin/profile' : '/home');
            return;
        }

        if (result.payload?.errors) {
            const serverErrors = {};
            result.payload.errors.forEach((item) => {
                serverErrors[item.path] = item.msg;
            });
            setErrors(serverErrors);
            return;
        }

        setErrors({ otpCode: result.payload?.error || 'Mã OTP không hợp lệ' });
    };

    return (
        <AuthShell
            title={isOtpSent ? 'Xác thực OTP' : 'Tạo tài khoản'}
            subtitle={isOtpSent ? 'Nhập mã xác thực để hoàn tất đăng ký' : 'Gia nhập không gian thành viên TimeLux'}
            background={isOtpSent ? 'otp' : 'register'}
            icon={(
                <svg className="w-7 h-7 text-[#f2ca50]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92A2 2 0 0012 12h-1v-1a4 4 0 011.17-2.83l1.24-1.25a1.75 1.75 0 10-2.91-1.27H8.5a3.5 3.5 0 116.57 1.6z" />
                </svg>
            )}
        >
            {registerError && <StatusAlert variant="luxury">{registerError}</StatusAlert>}
            {registerMessage && <StatusAlert variant="luxury" type="success">{registerMessage}</StatusAlert>}
            {errors.global && <StatusAlert variant="luxury">{errors.global}</StatusAlert>}

            <div className="space-y-4">
                    {!isOtpSent ? (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput variant="luxury" label="Họ & đệm" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                                <FormInput variant="luxury" label="Tên" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
                            </div>
                            <FormInput variant="luxury" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                            <FormInput variant="luxury" label="Mật khẩu" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
                            <SubmitButton variant="luxury" loading={registerLoading} onClick={handleRegister}>Tiếp theo</SubmitButton>
                        </>
                    ) : (
                        <>
                            <div className="mb-4 border border-[#4d4635]/70 bg-[#121414]/70 p-4 text-center">
                                <div className="font-mono text-2xl font-bold text-[#f2ca50]">
                                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                                </div>
                                <p className="mt-1 text-xs text-[#d0c5af]">Mã OTP hết hạn sau 5 phút</p>
                            </div>
                            <FormInput variant="luxury" label="Nhập mã OTP" name="otpCode" value={formData.otpCode} onChange={handleChange} error={errors.otpCode} />
                            <SubmitButton variant="luxury" loading={registerLoading} onClick={handleVerifyOTP}>Hoàn tất</SubmitButton>
                        </>
                    )}
            </div>
        </AuthShell>
    );
};

export default RegisterPage;
