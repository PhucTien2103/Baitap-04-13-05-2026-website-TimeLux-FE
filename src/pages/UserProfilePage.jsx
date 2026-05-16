import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, logoutUser } from '../redux/slices/authSlice';
import profileHeroImage from '../assets/stitch_timelux_watch_store_ui/hero-watch/screen.png';
import TimeLuxIcon from '../components/common/TimeLuxIcon';

const getFullName = (user) => {
    if (!user) return 'Thành viên TimeLux';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Thành viên TimeLux';
};

const getGenderLabel = (gender) => {
    if (gender === true) return 'Nam';
    if (gender === false) return 'Nữ';
    return 'Chưa cập nhật';
};

const ProfileField = ({ label, value, wide = false }) => (
    <div className={`border border-[#4d4635]/70 bg-[#282a2b] p-5 ${wide ? 'md:col-span-2' : ''}`}>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#d0c5af]">{label}</p>
        <p className="break-words text-lg font-semibold leading-7 text-[#f4f4f4]">
            {value || 'Chưa cập nhật'}
        </p>
    </div>
);

const MembershipRow = ({ label, value, highlight = false }) => (
    <div className="flex items-start justify-between gap-5 border-b border-[#4d4635]/40 pb-4">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#d0c5af]">{label}</span>
        <span className={`text-right text-sm font-semibold ${highlight ? 'text-[#f2ca50]' : 'text-[#f4f4f4]'}`}>{value}</span>
    </div>
);

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, profileLoading, profileError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#121414] text-[#e2e2e2]">
            <nav className="fixed top-0 z-50 w-full border-b border-[#4d4635] bg-[#121414]/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
                    <div className="flex items-center gap-10">
                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            className="text-2xl font-semibold uppercase tracking-[0.22em] text-[#f2ca50]"
                        >
                            TIMELUX
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            className="hidden items-center gap-2 border-b border-[#f2ca50] pb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#f2ca50] transition-opacity hover:opacity-80 md:inline-flex"
                        >
                            <TimeLuxIcon name="back" size={16} />
                            Back to Store
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d0c5af] transition-colors hover:text-[#f2ca50]"
                    >
                        <TimeLuxIcon name="logout" size={17} />
                        Logout
                    </button>
                </div>
            </nav>

            <main className="pt-20">
                <section className="relative flex min-h-[360px] items-end overflow-hidden md:min-h-[420px]">
                    <div className="absolute inset-0">
                        <img src={profileHeroImage} alt="" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12">
                        <div className="flex flex-col items-center gap-8 md:flex-row md:items-end">
                            <div className="flex h-28 w-28 shrink-0 items-center justify-center border border-[#f2ca50]/45 bg-[#1a1c1c] md:h-36 md:w-36">
                                {user?.image ? (
                                    <img src={user.image} alt={getFullName(user)} className="h-full w-full object-cover" />
                                ) : (
                                    <TimeLuxIcon name="user" size={72} className="text-[#99907c]" />
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="mb-4 flex flex-wrap justify-center gap-3 md:justify-start">
                                    <span className="border border-[#f2ca50] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ca50]">
                                        Role: {user?.roleId || 'R2'}
                                    </span>
                                    <span className="border border-[#f2ca50] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ca50]">
                                        Status: Active
                                    </span>
                                </div>
                                <h1 className="mb-2 text-4xl font-semibold leading-tight text-[#e2e2e2] md:text-6xl">
                                    {getFullName(user)}
                                </h1>
                                <p className="text-lg italic text-[#d0c5af]">{user?.email || 'Chưa cập nhật'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-5 py-14">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                        <div className="border border-[#4d4635] bg-[#1a1c1c] p-6 md:p-9">
                            <div className="mb-8 border-b border-[#4d4635] pb-5">
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f2ca50]">Account Registry</p>
                                <h2 className="text-3xl font-semibold text-[#f4f4f4]">Personal Information</h2>
                                <p className="mt-2 text-sm text-[#d0c5af]">Thông tin thành viên được lấy từ tài khoản đang đăng nhập.</p>
                            </div>

                            {profileLoading && (
                                <div className="border border-[#4d4635] p-5 text-[#d0c5af]">Đang tải hồ sơ...</div>
                            )}

                            {profileError && (
                                <div className="border border-red-400/40 bg-red-500/10 p-5 text-red-200">{profileError}</div>
                            )}

                            {!profileLoading && !profileError && (
                                <>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <ProfileField label="First Name" value={user?.firstName} />
                                        <ProfileField label="Last Name" value={user?.lastName} />
                                        <ProfileField label="Email Address" value={user?.email} wide />
                                        <ProfileField label="Phone Number" value={user?.phoneNumber} />
                                        <ProfileField label="Gender" value={getGenderLabel(user?.gender)} />
                                        <ProfileField label="Residential Address" value={user?.address} wide />
                                        <ProfileField label="Role Identifier" value={user?.roleId || 'R2'} />
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 border border-[#f2ca50] px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#f2ca50] transition-colors hover:bg-[#f2ca50] hover:text-[#121414]"
                                        >
                                            <TimeLuxIcon name="edit" size={16} />
                                            Request Modification
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <aside className="flex flex-col gap-6">
                            <section className="border border-[#4d4635] bg-[#1e2020] p-6">
                                <h3 className="mb-6 text-2xl font-semibold text-[#f4f4f4]">Membership Details</h3>
                                <div className="space-y-6">
                                    <MembershipRow label="Member Role" value={user?.roleId || 'R2'} highlight />
                                    <MembershipRow label="Account Status" value="Active" highlight />
                                    <MembershipRow label="Member Type" value="TimeLux Collector" />
                                    <MembershipRow label="Member Since" value="2026" />
                                </div>
                            </section>

                            <section className="relative overflow-hidden border border-[#4d4635] bg-[#1a1c1c] p-6">
                                <TimeLuxIcon name="shield" size={100} className="absolute -bottom-8 -right-8 text-[#f2ca50]/7" />
                                <h3 className="mb-5 text-2xl font-semibold text-[#f4f4f4]">The Heritage Pledge</h3>
                                <p className="relative leading-7 text-[#d0c5af]">
                                    Với vai trò TimeLux Collector, bạn được truy cập vào các bộ sưu tập đồng hồ cao cấp và những quyền lợi riêng cho thành viên.
                                </p>
                                <div className="relative mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f2ca50]">
                                    <span className="h-px w-8 bg-[#f2ca50]" />
                                    Certified Timekeeper
                                </div>
                            </section>

                            <section className="flex flex-col items-center gap-4 border border-[#f2ca50]/35 bg-[#1a1c1c] p-6 text-center">
                                <TimeLuxIcon name="bag" size={38} className="text-[#f2ca50]" />
                                <h4 className="text-2xl font-semibold text-[#f4f4f4]">Private Reserve</h4>
                                <p className="text-[#d0c5af]">Xem các mẫu đồng hồ dành riêng cho cấp thành viên của bạn.</p>
                                <button
                                    type="button"
                                    onClick={() => navigate('/home')}
                                    className="w-full border border-[#99907c] py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#e2e2e2] transition-colors hover:border-[#f2ca50] hover:text-[#f2ca50]"
                                >
                                    Access Vault
                                </button>
                            </section>
                        </aside>
                    </div>
                </section>
            </main>

            <footer className="border-t border-[#4d4635] bg-[#0c0f0f]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 py-16 md:flex-row">
                    <div className="text-center md:text-left">
                        <span className="mb-4 block text-2xl font-semibold tracking-[0.2em] text-[#e2e2e2]">TIMELUX</span>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d0c5af]">
                            © 2026 TimeLux Heritage. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-[0.14em] text-[#d0c5af]">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookie Policy</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserProfilePage;
