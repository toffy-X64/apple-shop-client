import styles from './Checkout.module.scss';
import { useForm } from 'react-hook-form';

import { BadgeRussianRuble } from 'lucide-react';

const ContactForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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

                <button type='submit'>
                    <BadgeRussianRuble />
                    Перейти к оплате
                </button>
            </div>
        </form>
    );
}

export default ContactForm;