import styles from './Checkout.module.scss';

import { useCart } from '@providers/CartProvider';

import { NavLink } from 'react-router-dom';

import ContactForm from '@components/common/Checkout/ContactForm';
import OrderSummary from '@components/common/Checkout/OrderSummary';

const Checkout = () => {
    const { cart } = useCart();

    return (
        <section>
            <div className="container">
                {!cart || !cart.length && (
                    <div className={styles.empty}>
                        <h1>Корзина пустая, но никогда не поздно это исправить :)</h1>
                        <NavLink to='/' className={styles.mainButton}>Перейти в каталог</NavLink>
                    </div>
                )}

                {cart.length >= 1 && (
                    <div className={styles.wrapper}>
                        <ContactForm />
                        <OrderSummary />
                    </div>
                )}
            </div>
        </section>
    );
}

export default Checkout;