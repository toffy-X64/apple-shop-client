import { NavLink } from 'react-router-dom';
import styles from './Checkout.module.scss';

const CheckoutSuccess = () => {
    return (
        <main className="page">
            <div className="container">
                <div className={styles.success}>
                    <div className={styles.icon}>✓</div>

                    <h1>Заказ успешно создан</h1>
                    <p>
                        Спасибо за покупку! Наш менеджер свяжется с вами в ближайшее время
                        для подтверждения деталей.
                    </p>

                    <div className={styles.actions}>
                        <NavLink to="/" className={styles.primary}>
                            Вернуться к каталогу
                        </NavLink>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutSuccess;