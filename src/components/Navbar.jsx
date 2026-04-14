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
                    <Link to="/" className="text-xl font-bold tracking-tight text-text-main dark:text-white absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:text-left lg:ml-4 font-playfair">
                        Habito
                    </Link>

                    {/* Desktop Links - Center */}
                    <div className="hidden lg:flex gap-6 text-sm font-medium text-text-main dark:text-gray-300 font-playfair">
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
                        <span className="relative z-10 group-hover:text-primary transition-colors font-playfair">Inicio</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link
                        to="/menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors font-playfair">Menú</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </Link>
                    <a
                        href="/#place"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors font-playfair">El lugar</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </a>
                    <a
                        href="/#contacto"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative text-5xl font-display font-bold text-text-main dark:text-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <span className="relative z-10 group-hover:text-primary transition-colors font-playfair">Contacto</span>
                        <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-primary rounded-full -translate-x-1/2 group-hover:w-1/2 transition-all duration-300 ease-out"></span>
                    </a>
                </div>

                {/* Social / Extra Info (Optional) */}
                <div className={`flex gap-6 mt-12 transition-all duration-700 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                    <a href="https://instagram.com/habito.pyc" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/50 dark:bg-white/10 hover:scale-110 hover:bg-white dark:hover:bg-white/20 transition-all text-text-main dark:text-white">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                    </a>
                    <a href="https://wa.me/5492355506234" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/50 dark:bg-white/10 hover:scale-110 hover:bg-white dark:hover:bg-white/20 transition-all text-text-main dark:text-white">
                        <span className="sr-only">WhatsApp</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
}
