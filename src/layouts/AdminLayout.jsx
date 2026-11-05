import { useState } from "react";
import { Link, NavLink } from "react-router";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`layout-fixed sidebar-expand-lg bg-body-tertiary ${
        sidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <div className="app-wrapper">
        {/* Navbar */}
        <nav className="app-header navbar navbar-expand bg-body">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <i className="bi bi-list fs-4"></i>
                </button>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link">DonutSMP Lab</span>
              </li>
            </ul>
          </div>
        </nav>

        {/* Sidebar */}
        <aside className="app-sidebar bg-dark shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <Link to="/" className="brand-link">
              <span className="brand-text fw-light">🍩 DonutSMP Lab</span>
            </Link>
          </div>

          <div className="sidebar-wrapper">
            <nav className="mt-2">
              <ul className="nav sidebar-menu flex-column" role="menu">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    end
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="nav-icon bi bi-speedometer2"></i>
                    <p>Dashboard</p>
                  </NavLink>
                </li>

                <li className="nav-header">Lab</li>

                <li className="nav-item">
                  <NavLink
                    to="/buy"
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="nav-icon bi bi-cart-fill"></i>
                    <p>Buy</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/sell"
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="nav-icon bi bi-cash-coin"></i>
                    <p>Sell</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/bcs"
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="nav-icon bi bi-hammer"></i>
                    <p>BCS</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/history"
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="nav-icon bi bi-graph-up"></i>
                    <p>History</p>
                  </NavLink>
                </li>

                <li className="nav-header">Configuration</li>

                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className="nav-icon bi bi-key"></i>
                    <p>API Key</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Contenido */}
        <main className="app-main">
          <div className="app-content">
            <div className="container-fluid py-3">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
