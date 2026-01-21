import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const MobileMenu = ({ isOpen, onToggle }) => {
    return (
        <>
            <button className={styles.menuToggle} onClick={onToggle} aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className={styles.mobileMenuOverlay} onClick={onToggle}>
                    <nav className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/categoty/iphone">iPhones</NavLink>
                    </nav>
                </div>
            )}
        </>
    );
}

export default MobileMenu;
