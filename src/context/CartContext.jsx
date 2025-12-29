import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('habito_cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error reading cart from localStorage", error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('habito_cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to localStorage", error);
        }
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Item exists, update quantity
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                // New item
                return [...prevCart, { ...product, quantity }];
            }
        });
        setIsCartOpen(true); // Auto open cart when adding
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            toggleCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
