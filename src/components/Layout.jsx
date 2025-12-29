import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation, Link } from 'react-router-dom';

import CartSidebar from './CartSidebar';

export default function Layout({ children }) {
    const location = useLocation();
    const isMenu = location.pathname.startsWith('/menu');

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-main">
            <Navbar />
            <CartSidebar />

            {/* Main Content Wrapper */}
            <main className="flex flex-col w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex-1">
                {children}
            </main>

            <Footer />


        </div>
    );
}
