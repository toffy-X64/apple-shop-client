import React, { useMemo } from 'react';
import styles from './Checkout.module.scss';

import { useCart } from '@providers/CartProvider';

const OrderSummary = () => {
    const items = useCart().cart;
    const total = useCart().total;

    const itemsList = useMemo(() => {
        return items
            ?.filter(item => item?.product && item?.product.id != 'none')
            .map(({ product, quantity }) => ({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity,
                totalPrice: product.price * quantity
            }));
    }, [items]);

    return (
        <div className={styles.summary}>
            <h2>Ваш заказ</h2>

            <div className={styles.items}>
                {itemsList?.map( item => (
                    <div className={styles.item} key={item.id}>
                        <div className={styles.image}>
                            <img src={item.image} alt={item.title} />
                        </div>

                        <div className={styles.info}>
                            <p className={styles.name}>{item.title}</p>
                            <p className={styles.unitPrice}>₽ {item.price} х {item.quantity}</p>
                        </div>

                        <div className={styles.total}>
                            ₽ {item.totalPrice}
                        </div>
                    </div>
                ) )}
            </div>

            <div className={styles.summaryTotal}>
                <h3>Итого:</h3>
                <span>₽ {total}</span>
            </div>

        </div>
    );
}

export default React.memo(OrderSummary);