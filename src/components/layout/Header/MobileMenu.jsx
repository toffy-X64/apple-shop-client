import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.scss';

const MobileMenu = ({ isOpen, onToggle }) => {
    return (
        <>
            <button className={styles.menuToggle} onClick={onToggle} aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className={styles.mobileMenuOverlay} onClick={onToggle}>
                    <nav className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
                        <a href="/">Главная</a>
                        <a href="/contacts">Контакты</a>
                        <a href="/wholesale">Оптовая торговля</a>
                        <a href="/delivery">Доставка</a>
                    </nav>
                </div>
            )}
        </>
    );
}

export default MobileMenu;
