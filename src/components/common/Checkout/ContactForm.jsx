import styles from './Checkout.module.scss';
import { useForm } from 'react-hook-form';

import { productService } from '@api/services/products.service';
import { useCart } from '@providers/CartProvider';

import { BadgeRussianRuble } from 'lucide-react';
import { useState } from 'react';



const ContactForm = () => {
    const { register, handleSubmit } = useForm();
    const items = useCart().cart;
    const openPayTypeModal = useCart().openTypeModal;

    const onSubmit = async (data) => {
        // const formatedItems = items.map( e => {
        //     return {
        //         id: e.product.id,
        //         quantity: e.quantity
        //     }
        // } );

        // const dataToSubmit = {
        //     ...data,
        //     items: formatedItems
        // };

        // await productService.order(dataToSubmit);

        openPayTypeModal(data);
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
                    <textarea {...register("address")} placeholder='Адрес доставки' ></textarea>
                </div>

                <div className={styles.field}>
                    <label>Тип оплаты</label>
                    <select { ...register("paymentType") } >
                        <option type = "FIAT">Банковская карта / QR Code</option>
                        <option type = "CRYPTO">Криптовалюта</option>
                    </select>
                </div>

                <button type='submit'>
                    <BadgeRussianRuble />
                    Перейти к оплате
                </button>
            </div>
        </form>
    );
}

export default ContactForm;