import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import CartSync from '@components/common/Cart/CartSync';
import CartModal from '@components/common/Cart/CartModal';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const addToCart = useCallback( (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.product?.id == product.id);

            if (existing) {
                return prev.map(item => {
                    if (item.product.id == product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }

                    return item;
                });
            }

            return [
                ...prev,
                {
                    product,
                    quantity: 1
                }
            ];
        })
    }, []);

    const removeFromCart = useCallback( (productId) => {
        setCart(prev => {
            const item = prev.find(i => i.product.id === productId);
            if (!item) return prev;

            if (item.quantity > 1) {
                return prev.map(item => {
                    if (item.product.id == productId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }

                    return item;
                });
            }

            return prev.filter(i => i.product.id !== productId);
        });
    }, []);

    const clearCart = useCallback( () => {
        setCart([]);
    }, []);

    const loadCart = useCallback( (items) => {
        setCart([...items]);
    }, []);

    const total = useMemo( () => {        
        if (!cart.length)
            return 0;

        return cart.reduce( (sum, item) => {
            if (!item || !item.product || !item.product.price )
                return sum;

            return sum + item.product.price * item.quantity;
        }, 0 );
    }, [cart]);

    const value = useMemo( () => ({
        addToCart,
        removeFromCart,
        clearCart,
        open,
        close,
        isOpen,
        cart,
        total,
        loadCart
    }), [
        addToCart,
        removeFromCart,
        clearCart,
        open,
        close,
        isOpen,
        cart,
        total,
        loadCart
    ]);

    return (
        <CartContext.Provider value={value}>
            <CartSync />
            <CartModal />
            { children }
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        return;

    return context;
};