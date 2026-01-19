import styles from './Home.module.scss';

import CategoryList from '@components/common/Home/CategoryList';
import RecommendationList from '@components/common/Home/RecommendationList';

const Home = () => {
    return (
        <section className={styles.home}>
            <div className="container">
                <CategoryList />
                <RecommendationList />
            </div>
        </section>
    );
}

export default Home;