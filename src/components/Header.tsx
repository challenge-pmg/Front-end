import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const roleLabels: Record<string, string> = {
  PACIENTE: 'Paciente',
  PROFISSIONAL: 'Profissional',
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
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Logo withText={true} className="w-10 h-10" />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right text-xs text-gray-500">
                  <p className="text-gray-900 font-semibold">{user.nome}</p>
                  <p>{roleLabels[user.role] || 'Usuário'}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Meu painel
                </Link>
                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                to="/login"
              >
                Entrar
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <>
                <button
                  className="rounded border border-blue-600 px-3 py-2 text-xs font-semibold text-blue-600"
                  onClick={() => navigate('/dashboard')}
                >
                  Painel
                </button>
                <button
                  className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                className="rounded border border-blue-600 px-3 py-2 text-xs font-semibold text-blue-600"
                to="/login"
              >
                Entrar
              </Link>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
