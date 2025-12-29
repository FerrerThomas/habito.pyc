import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const { addToCart, toggleCart } = useCart();

    // Fetch product
    const product = getProductById(id);

    // If product not found
    if (!product) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-main dark:text-white">
                <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
                <button onClick={() => navigate('/menu')} className="text-primary font-bold hover:underline">Volver al menú</button>
            </div>
        );
    }

    // For demo purposes, we are using 4 generic images plus the product image if we wanted, 
    // but the user requested "the same 4 generic images for all". 
    const images = [
        product.image,
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfUmx4fLBj6NkvXtaWQ2kq_hzRJgaBK3QFPXEkuvjt8ODaU-hwASGnNyt_-RbwcYvosXBGij4vPKzMh2goRaT7ItQEPHK5s5r0ry7MUzqZoycdW2q9PRp-BKsNRIdnml4kbb4V20q9eD5yiyDXxdOaekCZoOFRum_mWlJcaY-BPItuMJl1xtmqYBZ3uygpwEbGIsUxo4hRYU5T__U8NoQTmEFek_rVaTsuayEeXbcNCnCBlDegu7roN6cNKApZv33b9ADYo89sNmg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDqUYc5X9RNW4IysaBV2zK5jGMyd71COBZUR1HFqx0lq-6nVseLSDEoiWxGc8Wz2W2VfmdLNNxABrbM0GYFhNloPk0-nvL0iSCTHiUrEjV65NQnxFPtgGlE8cZpJJFTJP5kUWH7CjLBUK0MIkj6rrLOQIro4PMHTCkwo07Pvjo3wxi0LLjYmbVhpstCANw-rm5s7cD-GW5PPMnGr9ZD1goxWUWqqGwqu3Y55bkyy3hw-4mwbe7TwBHcg9yHSdMJ_8nzO-Ble7PKlw",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhQwIO6AB11-16vxq6qM4PxKHgb7rHwoyE6hpKNCjVYaPi_jFLV-I3qS5T-sqC0YCwYJPxZFu9kkjKB4ucS3TT3owD7IwlZfOgRZwTM1bkhMEUhDoB-Lt23y8kCwh0wI6WGZgDRzwfL7ism-OJnac9obPJ6CsKqxR6ijAe_f5tOi-T70Uplf7AYcQdzT6eeUxshlR-ZU9UaV1pAWrtOJOshVVMah4jiQYVx_uB3jM-NBc0r499oDQLHyfyQV6Xyo6399Gzj08yvg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBuzEhe1SgD0ZmQfgVAKrCCSeOTPlSl6x7L3nQj7FM0t8vNDolyC5QevZHgGSit_lpoJvCZqYuMz-pOeGoj2AT4PObxA9KzXBq7ATuaL4U1T5P0U_QEk6vgpBiL_xU-0uGz56fOLrcyzF8jhjcMfBj9EtWOp3LULHeM9V_-aEadY2Pv_PGRYVXh0NTuhlV2alSFcAjzQAc1hfgH-jL0LLBNcbj08IcNc_sjOKdzmQ7qP3WZrQgmdC0iYSUFRTnNp4zwMpRvgVXDtw"
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate(-1);
    };

    const incrementQuantity = () => setQuantity(q => q + 1);
    const decrementQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1);

    return (
        <div className="relative h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display text-[#1b160d]">

            {/* Background Content (Simulating the underlying screen) */}
            <div className="absolute inset-0 z-0 flex flex-col p-4 opacity-30 pointer-events-none filter blur-[2px]">
                <div className="flex items-center justify-between pb-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-48 w-full bg-gray-200 rounded-xl mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                </div>
            </div>

            {/* Modal Overlay */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm fade-in">
                {/* Modal Card */}
                <div className="relative w-full max-w-[360px] md:max-w-4xl max-h-[90vh] flex flex-col md:flex-row bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl scale-up overflow-hidden ring-1 ring-black/5">
                    {/* Close Button */}
                    <button onClick={handleBack} aria-label="Close modal" className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-800 dark:text-white transition-colors backdrop-blur-md shadow-sm">
                        <span className="material-symbols-outlined text-[20px] font-bold">close</span>
                    </button>

                    {/* Left Column (Desktop): Images */}
                    <div className="w-full aspect-[4/3] md:w-1/2 md:aspect-auto md:h-full relative bg-gray-100 dark:bg-gray-800">
                        {/* Main Hero Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <div className="w-full h-full bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url('${images[selectedImage]}')` }}>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Desktop): Scrollable Content */}
                    <div className="flex-1 flex flex-col md:w-1/2 md:max-h-[90vh] overflow-hidden">

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto modal-scroll relative">

                            <div className="px-5 pt-6 pb-6 md:p-8">

                                {/* Title & Price */}
                                <div className="flex flex-col gap-1 mb-4">
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white" id="modal-title">{product.name}</h2>
                                    <div className="flex items-center justify-between md:justify-start md:gap-4">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.category}</span>
                                        <div className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary font-bold text-lg">
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4">
                                    <p className="text-[15px] md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                                        {product.description}
                                    </p>

                                    {/* Extra details (Tags) */}
                                    {product.tags && product.tags.length > 0 && (
                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Detalles</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {product.tags.map((tag, i) => (
                                                    <span key={i} className="inline-flex items-center px-2 py-1 rounded bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                                                        <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-5 pt-3 md:p-6 md:pt-4 bg-white dark:bg-[#1e1e1e] border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-20 flex gap-3">
                            <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-xl px-2 h-[52px]">
                                <button onClick={decrementQuantity} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors text-xl font-bold">-</button>
                                <span className="w-8 text-center font-bold text-lg text-gray-900 dark:text-white">{quantity}</span>
                                <button onClick={incrementQuantity} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors text-xl font-bold">+</button>
                            </div>
                            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all duration-200 transform active:scale-[0.98]">
                                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
