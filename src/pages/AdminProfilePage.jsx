import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminProfile, logoutUser } from '../redux/slices/authSlice';
import ProfileCard from '../components/common/ProfileCard';

const AdminProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, profileLoading, profileError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchAdminProfile());
    }, [dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <ProfileCard
            title="Admin Profile"
            roleLabel="Admin (R1)"
            roleAccentClass="bg-gradient-to-br from-amber-500 to-orange-500"
            loading={profileLoading}
            error={profileError}
            email={user?.email}
            footerText="Trang này sẽ được phát triển bởi thành viên khác."
            onLogout={handleLogout}
            icon={(
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            )}
        />
    );
};

export default AdminProfilePage;