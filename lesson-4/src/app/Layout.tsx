import { NavLink, Outlet } from 'react-router';
import styles from './Layout.module.css';

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export const Layout = () => {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink to="/" end className={getLinkClassName}>
          Регистрация
        </NavLink>
        <NavLink to="/subscribe" className={getLinkClassName}>
          Подписка
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};
