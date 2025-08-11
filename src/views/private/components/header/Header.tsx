import { JSX, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { Bell, HelpCircle, LogOut, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import logo from '/conecta_logo.png';

function Header(): JSX.Element {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Conecta Logo" className={styles.logo} />
        </Link>
      </div>

      <nav className={`${styles.navigation} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/gerenciar-clientes"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={handleLinkClick}
              end
            >
              Clientes
            </NavLink>
          </li>
          {user?.role === 'admin' && (
            <li>
              <NavLink
                to="/usuarios"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                onClick={handleLinkClick} 
              >
                Usuários
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={handleLinkClick}
            >
              Perfil
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.userActions}>
        <button className={styles.iconButton} aria-label="Ajuda">
          <HelpCircle size={22} />
        </button>
        <button className={styles.iconButton} aria-label="Notificações">
          <Bell size={22} />
        </button>
        <button
          className={styles.iconButton}
          aria-label="Sair"
          onClick={() => logout()}
        >
          <LogOut size={22} />
        </button>
      </div>

      <button
        className={styles.hamburgerButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </header>
  );
}

export default Header;
