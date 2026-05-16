import { Link } from 'react-router-dom';
import loginBackground from '../../assets/stitch_timelux_watch_store_ui/background_for_login_page/screen.png';
import registerBackground from '../../assets/stitch_timelux_watch_store_ui/background_for_registration_page/screen.png';
import otpBackground from '../../assets/stitch_timelux_watch_store_ui/background_for_otp_resetpassword_page/screen.png';

const backgrounds = {
    login: loginBackground,
    register: registerBackground,
    otp: otpBackground,
};

const AuthShell = ({ title, subtitle, icon, children, footer, background = 'login' }) => {
    const backgroundImage = backgrounds[background] || loginBackground;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121414] px-4 py-10 text-[#e2e2e2]">
            <img
                src={backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-[#121414]/85 to-[#121414]/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,202,80,0.16),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_30%)]" />

            <div className="relative z-10 w-full max-w-[460px]">
                <Link to="/" className="mb-5 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#d0c5af] transition-colors hover:text-[#f2ca50]">
                    ← Trang chủ
                </Link>
                <div className="border border-[#4d4635]/70 bg-[#1a1c1c]/88 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-10">
                    <div className="mb-8 text-center">
                        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center border border-[#f2ca50]/70 bg-[#121414]/80 text-[#f2ca50] shadow-[0_0_28px_rgba(242,202,80,0.18)]">
                            {icon}
                        </div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#f2ca50]">TimeLux</p>
                        <h2 className="mb-2 text-3xl font-semibold text-[#e2e2e2]">{title}</h2>
                        <p className="text-sm text-[#d0c5af]">{subtitle}</p>
                    </div>

                    {children}
                    {footer}
                </div>
            </div>
        </div>
    );
};

export default AuthShell;
