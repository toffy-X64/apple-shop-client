import React, { useEffect, useState } from 'react'
import styles from './Category.module.scss'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import RecommendationList from '@components/common/Home/RecommendationList';

import { productService } from '@api/services/products.service';

const Category = () => {
    const categorySlug = useParams().slug;
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!categorySlug) return;

        const controller = new AbortController();

        const loadInfo = async () => {
            try {
                const res = await productService.getCategoryBySlug(categorySlug, controller.signal);
                setCategory(res.data);
            } catch(error) {
                navigate('/not-found');
            }
        };

        loadInfo();
    }, []);

    if (!categorySlug) {
        return <Navigate to="/not-found" />;
    }

    return (
        <section className={styles.category}>
            <div className="container">
                <h1 className={styles.title}>Категория: {category ? category.name : 'Loading...'}</h1>
                <RecommendationList categorySelected={categorySlug} />
            </div>
        </section>
    );
}

export default React.memo(Category);