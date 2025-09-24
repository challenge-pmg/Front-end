import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/integrantes", label: "Integrantes" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
  { to: "/solucao", label: "Solução" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={isShrunk ? "shrink" : ""}>
      <div className="container">
        <button
          className="hamburger"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <div className="logo">TeleSaúde HC</div>
        <nav className={isMenuOpen ? "active" : ""}>
          <ul id="main-menu" role="menu">
            {NAV_ITEMS.map((item) => (
              <li key={item.to} role="none">
                <NavLink to={item.to} role="menuitem" onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={`nav-overlay${isMenuOpen ? " active" : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
    </header>
  );
};

export default Header;
