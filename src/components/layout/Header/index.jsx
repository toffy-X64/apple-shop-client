import styles from './Header.module.scss';

import HeaderMain from './HeaderMain';
import HeaderTop from './HeaderTop';

const Header = () => {
    return (
        <header className={styles.header}>
            <HeaderTop />
            <HeaderMain />
        </header>
    );
}

export default Header;