import styles from './Home.module.scss';
import ProductCard from '@components/common/Home/ProductCard';
import { productService } from '@api/services/products.service.js';

import Loader from '@components/layout/Loader';

import { useCallback, useEffect, useRef, useState } from 'react';

const RecommendationList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('newest');

    const loaderRef = useRef(null);
    const loadingRef = useRef(false);
    const pageRef = useRef(1);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const res = await productService.getAll({
                page: pageRef.current, 
                sort: sort
            });

            setProducts(prev => {
                const ids = new Set(prev.map(p => p.id));
                const unique = res.data.items.filter(p => !ids.has(p.id));
                return [...prev, ...unique];
            });
            pageRef.current += 1;

            if (res.data.meta.page >= res.data.meta.pages) {
                setHasMore(false);
            }
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [sort, hasMore]);

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [loadMore]);

    useEffect(() => {
        const controller = new AbortController();

        const loadSort = async () => {
            loadingRef.current = true;
            setProducts([]);
            setLoading(true);

            try {
                const res = await productService.getAll({
                    page: 1,
                    sort: sort,
                    signal: controller.signal
                });

                setProducts(res.data.items);
                pageRef.current = 2;
                setHasMore(res.data.meta.pages > 1);
            } finally {
                loadingRef.current = false;
                setLoading(false);
            }
        };

        loadSort();

        return () => controller.abort();
    }, [sort]);

    return (
        <>
            <div className={styles.sortWrapper}>
                <h4>
                    Сортовать:: 
                    <select className={styles.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="newest">Стандартно</option>
                        <option value="price_asc">От дешевых</option>
                        <option value="price_desc">От дорогих</option>
                    </select>
                </h4>
            </div>

            <div className={styles.recommendationList}> 
                {!loading && ( !products || products.length == 0 ) && (
                    <h3>Ошибка сервера, попробуйте позже</h3>
                )}

                {products.map(item => (
                    <ProductCard key={item.id} product={item} />
                ))}

                {hasMore && (
                    <div ref={loaderRef} style={{ height: 1 }}></div>
                )}
            </div>
            {loading && <Loader />}
        </>
    );
};

export default RecommendationList;