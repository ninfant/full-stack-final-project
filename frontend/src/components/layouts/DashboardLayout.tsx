import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useMyDispatch } from "../../hooks";
import "../../styles/DashboardLayout.css";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode; // 👈 Aceptar children explícitamente
};

const DashboardLayout = ({ children }: Props) => {
  const dispatch = useMyDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <header className="navbar">
        <h2>Feature Flags App</h2>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/create">Create Flag</Link>
          <Link to="/dashboard/meta">Customers & Regions</Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="content-area">
        {/* Mostrar children si existen, sino usar <Outlet /> */}
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default DashboardLayout;
