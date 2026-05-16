import { Link } from "react-router-dom";
import loginBackground from "../../assets/stitch_timelux_watch_store_ui/background_for_login_page/screen.png";

const AuthHomePage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121414] px-4 py-10 text-[#e2e2e2]">
      <img
        src={loginBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-[#121414]/85 to-[#121414]/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,202,80,0.16),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative z-10 w-full max-w-md border border-[#4d4635]/70 bg-[#1a1c1c]/88 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f2ca50]">
          Member Access
        </p>
        <h1 className="text-4xl font-semibold tracking-[0.16em] text-[#f2ca50]">
          TIMELUX
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#d0c5af]">
          Không gian thành viên dành cho bộ sưu tập đồng hồ cao cấp.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            to="/login"
            className="block w-full border border-[#f2ca50] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#f2ca50] transition-all hover:bg-[#f2ca50] hover:text-[#241a00] active:scale-[0.98]"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="block w-full border border-[#4d4635] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#d0c5af] transition-all hover:border-[#f2ca50] hover:text-[#f2ca50] active:scale-[0.98]"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHomePage;
