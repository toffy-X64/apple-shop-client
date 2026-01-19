import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import HeaderCatalogButton from './HeaderCatalogButton';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderCartButton from './HeaderCartButton';
import MobileMenu from './MobileMenu';
import clsx from 'clsx';

const HeaderMain = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [fixed, setFixed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setFixed(window.scrollY > 53);
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={ clsx(
            styles['header-main'],
            {
                [styles.fixed]: fixed
            }
        ) }>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles['logo-sector']}>
                        <h1 className={styles.logo}>Яблоко</h1>
                        <div className={styles['buttons-group']}>
                            <HeaderCatalogButton />
                            <HeaderCartButton />
                        </div>
                    </div>

                    <div className={styles['action-sector']}>
                        <HeaderSearchBar />
                        <MobileMenu isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderMain;