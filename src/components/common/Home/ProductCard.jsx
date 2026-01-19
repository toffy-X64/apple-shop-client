import React from 'react';
import styles from './ProductCard.module.scss';

import { useCart } from '@providers/CartProvider';

const ProductCard = React.memo( ({ product }) => {
    const { addToCart } = useCart();

    const onAddToCartClick = () => {
        addToCart(product);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={product.image || '/placeholder.png'}
                    alt={product.title}
                />
            </div>

            <div className={styles.rating}>
                {'★'.repeat(product.stars)} <span>({product.reviews})</span>
            </div>

            <h3 className={styles.title}>{product.title}</h3>

            <div className={styles.bottom}>
                <button className={styles.buyBtn} onClick={onAddToCartClick}>В корзину</button>
                <div className={styles.price}>
                    {product.price.toLocaleString('ru-RU')} ₽
                </div>
            </div>
        </div>
    );
} );

export default ProductCard;