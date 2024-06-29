import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
    const userData = useSelector((state) => state.auth.userData);

    if (!userData || userData.data.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return <Element />;
};

export default ProtectedRoute;
