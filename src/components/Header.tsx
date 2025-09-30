import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "FAQ", href: "/faq" },
    { name: "Integrantes", href: "/integrantes" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo + Nome */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Logo withText={true} className="w-10 h-10" />
          </Link>

          {/* Navigation Menu */}
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

          {/* Mobile menu button */}
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