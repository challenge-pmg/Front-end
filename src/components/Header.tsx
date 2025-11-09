import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const roleLabels: Record<string, string> = {
  PACIENTE: "Paciente",
  PROFISSIONAL: "Profissional",
};

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "FAQ", href: "/faq" },
    { name: "Integrantes", href: "/integrantes" },
    { name: "Contato", href: "/contato" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Logo withText={true} className="w-10 h-10" />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Área do Usuário (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right text-xs text-gray-500">
                  <p className="text-gray-900 font-semibold">{user.nome}</p>
                  <p>{roleLabels[user.role] || "Usuário"}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-blue-50 transition"
                >
                  Meu painel
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-blue-50 transition"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="rounded border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-blue-50 transition"
                >
                  Painel
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-secondary transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-blue-50 transition"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Ícone do menu hamburguer (somente visual) */}
          <button
            aria-label="Abrir menu"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;