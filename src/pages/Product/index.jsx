import React, { useCallback, useEffect, useState } from 'react';
import styles from './Product.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '@api/services/products.service.js';
import Loader from '@components/layout/Loader';

import { useCart } from '@providers/CartProvider';

const Product = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await productService.getBySlug(slug);
                
                if (response.status === 200 && response.data) {
                    setProduct(response.data);
                } else {
                    setError(true);
                    navigate('/not-found');
                }
            } catch (err) {
                setError(true);
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug, navigate]);

    const onClickHandler = useCallback( () => {
        addToCart(product);
    }, [product]);

    if (loading) {
        return <Loader />;
    }

    if (error || !product) {
        return null;
    }

    const discountedPrice = product.discount ? product.price - (product.price * product.discount / 100) : product.price;
    const rating = product.reviews > 0 ? (product.stars / product.reviews).toFixed(1) : product.stars;

    return (
        <section className={styles.product}>
            <div className="container">
                <div className={styles.productWrapper}>
                    {/* Product Image */}
                    <div className={styles.imageSection}>
                        <img 
                            src={product.image} 
                            alt={product.title}
                            className={styles.productImage}
                        />
                        {product.discount && (
                            <span className={styles.discountBadge}>-{product.discount}%</span>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className={styles.infoSection}>
                        <h1 className={styles.title}>{product.title}</h1>

                        {/* Rating */}
                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                {'★'.repeat(Math.round(rating))}
                                {'☆'.repeat(5 - Math.round(rating))}
                            </div>
                            <span className={styles.ratingText}>
                                {rating} из 5 ({product.reviews} отзывов)
                            </span>
                        </div>

                        {/* Price */}
                        <div className={styles.priceSection}>
                            {product.discount ? (
                                <>
                                    <span className={styles.originalPrice}>₽{product.price.toFixed(2)}</span>
                                    <span className={styles.discountedPrice}>₽{discountedPrice.toFixed(2)}</span>
                                </>
                            ) : (
                                <span className={styles.price}>₽{product.price.toFixed(2)}</span>
                            )}
                        </div>

                        {/* Category */}
                        <div className={styles.category}>
                            <span className={styles.categoryLabel}>Категория:</span>
                            <span className={styles.categoryValue}>{product.category?.name || 'Нет категории'}</span>
                        </div>

                        {/* Stock Status */}
                        <div className={styles.stock}>
                            {product.stockQuantity > 0 ? (
                                <span className={styles.inStock}>
                                    ✓ В наличии ({product.stockQuantity} шт.)
                                </span>
                            ) : (
                                <span className={styles.outOfStock}>
                                    ✗ Нет в наличии
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            className={styles.addToCartBtn}
                            disabled={product.stockQuantity === 0}
                            onClick={() => onClickHandler()}
                        >
                            {product.stockQuantity > 0 ? 'Добавить в корзину' : 'Недоступно'}
                        </button>

                        {/* Description */}
                        {product.description && (
                            <div className={styles.description}>
                                <h3>Описание</h3>
                                <p>{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default React.memo(Product);
