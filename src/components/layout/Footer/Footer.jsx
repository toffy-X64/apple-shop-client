import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p>ООО 'ТехЯблоко' &copy; 2026</p>
            </div>
        </footer>
    );
}

export default Footer;