import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { Boxes } from 'lucide-react';

const HeaderCatalogButton = () => {
    const navigate = useNavigate();


    return (
        <button className={styles.catalogButton} title="Каталог" onClick={e => navigate('/')}>
            <Boxes size={20} />
            <span className={styles.buttonText}>Каталог</span>
        </button>
    );
}

export default HeaderCatalogButton;