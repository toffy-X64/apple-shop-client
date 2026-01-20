import styles from './Home.module.scss';

import CategoryList from '@components/common/Home/CategoryList';

const Home = () => {
    return (
        <section className={styles.home}>
            <div className="container">
                <CategoryList />
            </div>
        </section>
    );
}

export default Home;