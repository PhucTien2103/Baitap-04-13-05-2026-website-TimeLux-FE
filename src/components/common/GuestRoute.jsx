import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return children;
    }

    return user?.roleId === 'R1' ? <Navigate to="/admin/profile" /> : <Navigate to="/user/profile" />;
};

export default GuestRoute;
