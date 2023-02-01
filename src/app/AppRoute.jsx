import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


// HOC: high order component: nhận vào 1 component trả về 1 component khác
// Route Guard
// Comp là tên Component, viết hoa chữ cái đầu
const AppRoute = ({component: Comp, isPrivate, isAuth}) => {
  const token = localStorage.getItem("token");
  const profile = useSelector((state) => state.user.profile);

  if (isPrivate) {
    if (token) return <Comp />; return <Navigate to="/login" replace />;
  };


  // login, signup
  if (isAuth) {
    if (!profile) return <Comp />; return <Navigate to="/" replace />;
  };
}

export default AppRoute