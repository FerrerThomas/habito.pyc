import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const { toggleCart, getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <React.Fragment>
            <nav className={`sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-300 ${isHome ? '' : 'border-border-subtle'}`}>
                <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 h-16 flex items-center justify-between relative">
                    {/* Mobile Menu Button - Left */}
                    <button
                        aria-label="Menu"
                        className="p-2 -ml-2 text-text-main dark:text-white lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    {/* Logo - Center (Mobile) / Left (Desktop) */}
                    <Link to="/" className="text-xl font-bold tracking-tight text-text-main dark:text-white absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:text-left lg:ml-4">
                        Habito
                    </Link>

                    {/* Desktop Links - Center */}
                    <div className="hidden lg:flex gap-6 text-sm font-medium text-text-main dark:text-gray-300">
                        <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
                        <Link to="/menu" className="hover:text-primary transition-colors">Menú</Link>
                        <a href="/#place" className="hover:text-primary transition-colors">El lugar</a>
                        <a href="/#contacto" className="hover:text-primary transition-colors">Contacto</a>
                    </div>

                    {/* Right Action - Cart or CTA */}
                    <div className="flex items-center gap-4">
                        <Link to="/menu" className={`flex items-center justify-end group ${isHome ? 'lg:hidden' : 'hidden'}`}>
                            <p className="text-primary text-xs font-bold leading-tight tracking-[0.015em] shrink-0 group-hover:text-primary/80 transition-colors text-center">
                                Ver<br />menú
                            </p>
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="relative p-2 -mr-2 text-text-main dark:text-white hover:text-primary transition-colors"
                            aria-label="Open cart"
                        >
                            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#1e1e1e]">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Full Screen Elegant Overlay */}
            <div className={`fixed inset-0 z-40 bg-background-light/70 dark:bg-background-dark/70 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden flex flex-col justify-center items-center ${isMobileMenuOpen ? 'opacity-100 visible clip-circle-in' : 'opacity-0 invisible clip-circle-out pointer-events-none'}`}>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="flex flex-col gap-8 text-center relative z-10">
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors">Inicio</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link
                        to="/menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors">Menú</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </Link>
                    <a
                        href="/#place"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors">El lugar</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </a>
                    <a
                        href="/#contacto"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors">Contacto</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </a>
                </div>

                {/* Social / Extra Info (Optional) */}
                <div className={`flex gap-6 mt-12 transition-all duration-700 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                    <a href="#" className="p-3 rounded-full bg-white/50 dark:bg-white/10 hover:scale-110 hover:bg-white dark:hover:bg-white/20 transition-all">
                        <span className="text-xl font-bold">IG</span>
                    </a>
                    <a href="#" className="p-3 rounded-full bg-white/50 dark:bg-white/10 hover:scale-110 hover:bg-white dark:hover:bg-white/20 transition-all">
                        <span className="text-xl font-bold">FB</span>
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
}
