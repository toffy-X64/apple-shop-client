import styles from './Home.module.scss';

import React, { useEffect, useState } from 'react';
import { productService } from '@api/services/products.service';
import { useNavigate } from 'react-router-dom';

import Loader from '@components/layout/Loader';
import CategoryCard from './CategoryCard';

const CategoryList = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const loadCategories = async () => {
            try {
                setLoading(true);

                const res = await productService.getCategories();
                setCategories(res.data);
            } catch (error) {
                console.log(error);
                
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };
        loadCategories();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className={styles.categoryListWrapper}>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.categoryList}>
                    {categories.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default React.memo(CategoryList);