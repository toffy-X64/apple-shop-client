import styles from './Header.module.scss';

const HeaderTop = () => {
    return (
        <div className={styles['header-top']}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles['start-sector']}>
                        <p>г.Москва</p>
                    </div>

                    <div className={styles.phone}>
                        <a href="tel:9837734455">+7 983 773 44 55</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;