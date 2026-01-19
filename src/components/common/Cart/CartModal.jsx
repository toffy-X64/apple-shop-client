import React, { useRef } from 'react';
import styles from './Cart.module.scss';

import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@providers/CartProvider';

import { X } from 'lucide-react';

const CartModal = () => {
    const { isOpen, close, total, clearCart, cart: items } = useCart();
    
    const modalRef = useRef();

    const navigate = useNavigate();

    const handleOnAreaClick = (e) => {
        if (e.target == modalRef.current) {
            close();
        }
    };

    const onCheckoutClick = (e) => {
        navigate('/checkout');
        close();
    }

    const onClear = () => {
        clearCart();
    };

    if (!isOpen)
        return null;

    return (
        <div className={styles.modal} onClick={handleOnAreaClick} ref={modalRef}>
            <div className={styles.cart}>
                <div className={styles.header}>
                    <h2>Корзина</h2>

                    <a className={styles.closeBtn} onClick={e => close()}>
                        <X size={20} />
                    </a>
                </div>

                { !items || items.length <= 0 && (
                    <div className={styles.empty}>
                        <h3>Корзина пустая, но никогда не поздно это исправить :)</h3>
                    </div>
                ) }

                { items.length > 0 && (
                    <div className={styles.items}>
                        {items.map(e => (
                            <CartItem
                                key={e.product?.id}
                                product={e.product}
                                quantity={e.quantity}
                            />
                        ))}
                    </div>
                ) }

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>Итого:</span>
                        <strong>₽{total}</strong>
                    </div>

                    <button
                        className={styles.checkout}
                        disabled={items.length === 0}
                        onClick={onCheckoutClick}
                    >
                        Перейти к заказу
                    </button>

                    <button
                        className={styles.clear}
                        disabled={items.length === 0}
                        onClick={onClear}
                    >
                        Очистить корзину
                    </button>
                </div>

            </div>
        </div>
    );
}

export default React.memo(CartModal);