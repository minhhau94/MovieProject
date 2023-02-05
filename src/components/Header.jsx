import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const profile = useSelector((state) => state.user.profile);
  // Link không CSS được, Navlink có sẵng CSS, công dụng giống nhau
  return (
    <header className="bg-slate-900 h-20">
      <div className="container h-full mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl text-white">
          <img className="w-24" src="https://img.freepik.com/free-vector/retro-cinema-background_52683-1701.jpg" alt=""/>
        </Link>
        {profile ? (
        <span className="text-xl text-white">{""}Xin Chào, {profile.hoTen}{""}</span>
        ) : (
        <nav>
          <NavLink to="/login" className={({ isActive }) => {
            if (isActive) return "text-yellow-200 text-lg";
            return "text-white text-lg"
          }}>
            <UserOutlined /> Đăng nhập
          </NavLink>
          <span className="text-white text-xl"> | </span>
          <NavLink to="/signup" className={({ isActive }) => {
            if (isActive) return "text-yellow-200 text-lg";
            return "text-white text-lg"
          }}>
            <UserOutlined /> Đăng ký
          </NavLink>
        </nav>)}
      </div>
    </header>
  );
};

export default Header;
