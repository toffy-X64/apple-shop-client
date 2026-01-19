import React, { useEffect, useRef } from "react";

import { useCart } from '@providers/CartProvider';

const syncWithLocal = (cartItems) => {
    localStorage.setItem('cart-items', JSON.stringify(cartItems || '[]'));
};

const CartSync = () => {
    const didHybrated = useRef(false);
    const { isOpen, cart: items, clearCart, loadCart } = useCart();

    useEffect(() => {
        const saved = localStorage.getItem('cart-items');
        if (saved && saved != 'undefined') {
            loadCart( JSON.parse(saved) );
        } else {
            clearCart();
        }
        didHybrated.current = true;
    }, []);

    useEffect(() => {
        if (didHybrated.current) {
            didHybrated.current = false;
            return;
        }

        syncWithLocal(items);
    }, [items])

    useEffect(() => {
        document.body.classList.toggle('locked', isOpen);

        return () => {
            document.body.classList.remove('locked');
        }
    }, [isOpen]);

    return null;
}

export default React.memo(CartSync);