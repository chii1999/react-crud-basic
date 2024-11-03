import React from 'react'
import { Navigate } from "react-router-dom"

function PublicRoute({ children }) {
    // ດຶງ token ຈາກ localStorage ມາເພື່ອດັກເງື່ອນໄຂໃນການໃຊ້ງານ
    const isAuthenticated = !!localStorage.getItem('authToken')

    return isAuthenticated ? <Navigate to="dashboard" /> : children;
}

export default PublicRoute;