import React, { useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const sidebarRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isCartOpen) {
                toggleCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, toggleCart]);

    const handleWhatsAppOrder = () => {
        const phoneNumber = "5492355506234"; // Replace with real number
        let message = "Hola Habito! Quiero realizar el siguiente pedido:\n\n";

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})\n`;
        });

        message += `\n*Total: $${getCartTotal()}*`;

        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(url, '_blank');
        toggleCart(); // Optional: close cart after opening WA
    };

    return (
        <>
            {/* Backdrop */}
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}></div>

            {/* Sidebar */}
            <div ref={sidebarRef} className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#1e1e1e] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">Mi Pedido</h2>
                        <button onClick={toggleCart} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                                <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">shopping_bag</span>
                                <p className="text-lg font-medium">Tu carrito está vacío</p>
                                <button onClick={toggleCart} className="mt-4 text-primary font-bold text-sm hover:underline">Ver menú</button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 animate-fade-up">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 dark:border-gray-800">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                                            <p className="text-sm font-bold text-primary">${item.price}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-lg px-2 py-1">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary transition-colors disabled:opacity-50">
                                                    <span className="material-symbols-outlined text-base">remove</span>
                                                </button>
                                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-base">add</span>
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1">
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Total estimado</span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">${getCartTotal()}</span>
                            </div>
                            <button onClick={handleWhatsAppOrder} className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-200 dark:shadow-none transition-all duration-200 transform active:scale-[0.98]">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-6 h-6 invert brightness-0 pb-0.5" />
                                Enviar Pedido por WhatsApp
                            </button>
                            <button onClick={clearCart} className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 text-center">
                                Vaciar carrito
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
