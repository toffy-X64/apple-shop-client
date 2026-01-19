import React, { useState } from 'react';
import styles from './Checkout.module.scss';
import { useForm } from 'react-hook-form';

import { productService } from '@api/services/products.service';
import { useCart } from '@providers/CartProvider';
import { BadgeRussianRuble } from 'lucide-react';
import toast from 'react-hot-toast';


const ContactForm = () => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const items = useCart().cart;

    const onSubmit = async (data) => {
        const formatedItems = items.map( e => {
            return {
                id: e.product.id,
                quantity: e.quantity
            }
        } );

        const dataToSubmit = {
            ...data,
            items: formatedItems
        };

        try {
            setIsLoading(true);
            const res = await productService.order(dataToSubmit);

            if (res.status === 201) {
                window.location.href = res.data.invoice_url;
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                return;
            }

            toast.error('Ошибка при создании заказа. Попробуйте еще раз.');
            return;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.section}>
                <h3>Контактные данные</h3>

                <div className={styles.field}>
                    <label>ФИО</label>
                    <input type='text' placeholder='ФИО' { ...register("fullname") } required  />
                </div>

                <div className={styles.field}>
                    <label>Почта</label>
                    <input type='email' placeholder='Почта' { ...register("email") } required  />
                </div>

                <div className={styles.field}>
                    <label>Номер телефона</label>
                    <input type='tel' placeholder='Номер телефона' { ...register("phone", {
                        required: "Введите номер",
                        minLength: {
                            value: 9,
                            message: "Минимум 9 цифр"
                        }
                    }) } />
                </div>

                <div className={styles.field}>
                    <label>Адрес доставки</label>
                    <textarea {...register("address", { required: "Введите адрес доставки" })} placeholder='Адрес доставки' ></textarea>
                </div>

                <div className={styles.field}>
                    <label>Тип оплаты</label>
                    <select { ...register("paymentType") } >
                        <option value = "FIAT">Банковская карта / QR Code</option>
                        <option value = "CRYPTO">Криптовалюта</option>
                    </select>
                </div>

                <button type='submit' disabled={isLoading}>
                    <BadgeRussianRuble />
                    Перейти к оплате
                </button>
            </div>
        </form>
    );
}

export default React.memo(ContactForm);