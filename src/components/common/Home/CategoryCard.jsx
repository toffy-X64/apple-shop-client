import React from 'react'
import styles from './Home.module.scss';
import { NavLink } from 'react-router-dom';

const PLACEHOLDER_IMAGE = 'https://placehold.co/100x100';

const CategoryCard = ({ category }) => {
    const imageUrl = category.image || PLACEHOLDER_IMAGE;

    return (
        <NavLink to={`/category/${category.slug}`} className={styles.categoryCard}>
            <div className={styles.categoryCardImage}>
                <img src={imageUrl} alt={category.name} />
            </div>
            <h3 className={styles.categoryCardName}>{category.name}</h3>
        </NavLink>
    );
}

export default React.memo(CategoryCard);