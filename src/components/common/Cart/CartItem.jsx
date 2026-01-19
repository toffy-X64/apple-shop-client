import React from 'react';
import { useCart } from '@providers/CartProvider';
import styles from './Cart.module.scss';

const CartItem = ({ product, quantity }) => {
    const { id = 'none', image = 'no-image', title = 'no name', price = 0 } = product || {};
    const { addToCart, removeFromCart } = useCart();

    const onPlus = () => {
        addToCart(product);
    }

    const onMinus = () => {
        removeFromCart(id, quantity);
    }

    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <img src={image} alt={title} />
            </div>

            <div className={styles.info}>
                <p className={styles.name}>{title}</p>
                <p className={styles.unitPrice}>₽{price}</p>

                <div className={styles.controls}>
                    <button onClick={onMinus}>-</button>
                    <span>{quantity}</span>
                    <button onClick={onPlus}>+</button>
                </div>
            </div>

            <div className={styles.total}>
                ₽{price * quantity}
            </div>
        </div>
    );
};

export default React.memo(CartItem);