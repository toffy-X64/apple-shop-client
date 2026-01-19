import { useState } from 'react';
import styles from './Header.module.scss';
import { Search, X } from 'lucide-react';

const HeaderSearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`${styles.searchBarWrapper} ${isExpanded ? styles.expanded : ''}`}>
            <input 
                className={styles.searchBar} 
                placeholder='Я ищу...' 
                onFocus={() => setIsExpanded(true)}
                onBlur={() => setIsExpanded(false)}
            />
            <button className={styles.searchButton} aria-label="Search">
                <Search size={20} />
            </button>
        </div>
    );
}

export default HeaderSearchBar;