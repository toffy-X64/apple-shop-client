import clsx from 'clsx';
import styles from './NotFound.module.scss';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className={styles.notFound}>
            <div className={clsx('container', styles.wrapper)}>
                <img className={styles.gif} src = '/gifs/404.gif' alt='not-found' />

                <div>
                    <h1>Упс, 404</h1>
                    <h3>Страница не найдена:(</h3>
                </div> 

                <NavLink to='/' className={styles.mainButton}>Главная страница</NavLink>

                <div>
                    <h2>Что-то пошло не так, но мы это исправим.</h2>
                </div>
            </div>
        </section>
    );
}

export default NotFound;