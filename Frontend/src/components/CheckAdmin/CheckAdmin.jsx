import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminWarning = () => {
    const user = useSelector(state => state.auth.userData);

    if (!user || user.data.role !== 'admin') {
        return (
            <Navigate to="/login" state={{ warning: true }} />
        );
    }
    return null;
};

export default AdminWarning;
