import { useCart } from '@providers/CartProvider';
import styles from './Header.module.scss';
import { ShoppingCart } from 'lucide-react';

const HeaderCartButton = () => {
    const cart = useCart();

    return (
        <button onClick={e => cart.open()} className={styles.catalogButton} title="Корзина">
            <ShoppingCart size={20} />
            <span className={styles.buttonText}>Корзина</span>
        </button>
    );
}

export default HeaderCartButton;