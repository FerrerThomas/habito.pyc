import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const products = [
    {
        id: 1,
        // ... previous static array truncated to save lines ...
        name: "Croissant Almendra",
        desc: "Relleno de crema de almendras.",
        price: 55,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLTYkQtwwMN9ytLpPknalygyP-7LB3RBJc34TpyQgHdefps98L2n6DLgM2qkZqpD9QVY9VmFI2oNGzqRiB_oDUmYnRTsoXaFqBK6hIftrzgfmxBc_1q9qCv46k8B0q0YQ8B294f5h3u9uV2R83QJAau7iGA3tRgL78pq2I82Jy4ubdFtELOfbxUleo5LS42qI5m3bkFu3iOvPZc4wPiRgNF4cXDe7jHa2vc8gxV93nkIhse-lXtHDtTMBYwoH4ypJ_cBZR2dIzLg",
        alt: "Golden flaky almond croissant dusted with powdered sugar"
    }
];

export default function Home() {
    const [dbProducts, setDbProducts] = useState(products.slice(0, 4));

    useEffect(() => {
        async function fetchFavorites() {
            const { data } = await supabase.from('products').select('*').limit(4);
            if (data && data.length > 0) {
                setDbProducts(data);
            }
        }
        fetchFavorites();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="@container relative">
                <div className="@[480px]:p-4">
                    <div className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 relative overflow-hidden"
                        style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYLqQFAZ9hBbbFnlrcZwlH5KgrfqjlHl3ebq7LN9JiP-3ZO2tfJczhfFiRccYXn1UV2qyTVqY8pAsU9SrmoR_Mph5iJBVnQALy1m-5k5wKK6Wtego3-tgbY7kCLbmsFdfhG8mOyTndLBMS4FaHCViH3VD7CtQqjwNSGz-9yX8RC4gK9Nlg1PfZs4n_JV8LE-8kCxdcWpNktsoAeVaFW3RV30GuuH_n8JFooSqf0oSBmIt44pu04CJsSpym2P7z5bMsKndEbqaRqg")' }}>
                        <div className="flex flex-col gap-3 text-center z-10 max-w-[320px]">
                            <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] drop-shadow-sm animate-fade-up">
                                Habito
                            </h1>
                            <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] drop-shadow-sm animate-fade-up">
                                Panadería & Café
                            </h1>
                            <h2 className="text-white/90 text-sm font-medium leading-relaxed animate-fade-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
                                El arte del buen café y el pan recién horneado en un ambiente único.
                            </h2>
                        </div>
                        <Link to="/menu" className="z-10 flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary hover:bg-primary/90 transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transform active:scale-95 animate-fade-up delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <span className="truncate">Ver menú</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Spacer */}
            <div className="h-8"></div>

            {/* Section: El Lugar (The Place) */}
            <section id="place">
                <div className="flex items-center justify-between px-4 pb-2 pt-4">
                    <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Nuestro Espacio</h3>
                    <a href="#" className="text-xs font-bold text-primary tracking-wide uppercase">Galería</a>
                </div>
                <p className="text-text-main/70 dark:text-white/70 text-base font-normal leading-relaxed pb-6 pt-1 px-4">
                    Un rincón acogedor para tus mañanas, diseñado para disfrutar del aroma del café y la calidez del pan recién hecho.
                </p>

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-3 px-4">
                    <div className="col-span-2 aspect-[2/1] w-full overflow-hidden rounded-lg shadow-sm animate-reveal delay-100">
                        <div className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCCda3ZLarsdt9hOB7zmt1YphtmI7DNxNTBkwwzbFY2YdR-NCIa-T-5yze_Iq7pfCpzqe-cIz2Fos4w5PbQdJEGPAcF6JmslzoXngfa3gE-YOm6OhGZd9G-ArbrrbSeAn63y89c0aN6LbmymkaRuy_vUQxQkxA6ZURS-Hzas7L0e7z-j5edUKQKvAL4CQHCxv2K71mfcgfxmBK29fUGWTNpwbBmSwVJNnjgS5a4CVfY6LCtCraoaNUMghuYOiWDeNDkeAuATE05g")' }}>
                        </div>
                    </div>
                    <div className="aspect-square w-full overflow-hidden rounded-lg shadow-sm animate-reveal delay-200">
                        <div className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5pOejPIpJKdLybE0aM3G6qZnxKNOoHVnDwMZTvj3PeyE2TCRf0ICdiVIr0LWLtz0Ab5oEgvuHn6GZC-n27806Pic5sFJ3s5K8h-cvPJtz04K6f25u-DT20cqPXU6qcIBDkLjB3kx1aFV-Ad21EGNJLc0hSC7wbYVNwg74atlQSRpZSZiofbu6c5nhI123DG3VQ9MZ1U4RaI-IqYKJ61MNRQrUq7NTfiE3qYYHlI-FQhKy_kzzEq6IKizkdHvqt1L7J1ouW6ptgg")' }}>
                        </div>
                    </div>
                    <div className="aspect-square w-full overflow-hidden rounded-lg shadow-sm animate-reveal delay-300">
                        <div className="w-full h-full bg-center bg-cover hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSQiPGEIgiper_NanqB9ZF3_VUMtfQNelMtrOpKFQJgkqc7d9t8pEytSdIPlCdGEPfeoWTOGoLdJEv9F_f1FB_6_iZVm8ESkOhzeP7ioOIyRxz6-TZDFwK29UM_SP3n22kg1SrYdO_zNoElrgls-7CTbxZLTASa1f6HySjRY58cPeBsWtSKZ42WoWhAb38ig_JE-ILjqmUDi6EunOOIAWI7u4uNlxGSeIY_fY3PidssoL-DO2EffdhQ7YDNfOJcZbrMNqGDhIh9g")' }}>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer */}
            <div className="h-10"></div>

            {/* Section: Más Pedidos (Bestsellers) */}
            <section className="bg-white dark:bg-[#1e170e] py-8 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-black/5 dark:border-white/5" id="menu">
                <div className="flex items-center justify-between px-5 pb-6">
                    <div>
                        <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] animate-fade-up">Favoritos de la casa</h3>
                        <p className="text-text-main/50 dark:text-white/50 text-sm mt-1 animate-fade-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>Lo que todos aman</p>
                    </div>
                    <Link to="/menu" className="flex items-center justify-center size-10 rounded-full bg-background-light dark:bg-white/10 text-primary">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5">
                    {dbProducts.map((p, i) => (
                        <Link to={`/producto/${p.id}`} key={p.id} className="flex flex-col gap-3 group cursor-pointer animate-fade-up opacity-0" style={{ animationDelay: `${i * 50 + 200}ms`, animationFillMode: 'forwards' }}>
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                    style={{ backgroundImage: `url("${p.image}")` }}>
                                </div>
                                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-text-main dark:text-white shadow-sm">
                                    ${p.price}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-text-main dark:text-white font-bold text-sm leading-tight group-hover:text-primary transition-colors">{p.name}</h4>
                                <p className="text-text-main/60 dark:text-white/60 text-xs line-clamp-1">{p.description || p.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="px-5 mt-6">
                    <Link to="/menu" className="w-full h-12 rounded-lg border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                        Ver todo el menú
                    </Link>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacto" className="py-12 bg-background-light dark:bg-background-dark text-center">
                <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4 flex flex-col items-center gap-8 animate-fade-up">

                    <h3 className="text-2xl font-bold text-text-main dark:text-white font-display">Contáctanos</h3>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://instagram.com/habito.pyc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-border-subtle dark:border-white/10 text-text-main dark:text-white hover:border-primary hover:text-primary transition-all shadow-sm">
                            <span className="font-bold">Instagram</span>
                        </a>
                        <a href="https://wa.me/5492355506234" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-border-subtle dark:border-white/10 text-text-main dark:text-white hover:border-[#25D366] hover:text-[#25D366] transition-all shadow-sm">
                            <span className="font-bold">WhatsApp</span>
                        </a>
                    </div>

                    <div className="flex flex-col gap-1 text-text-main/80 dark:text-white/80">
                        <p className="font-medium">Calle 7 987 (entre 48 y 49)</p>
                        <p>La Plata, Buenos Aires</p>
                    </div>

                    {/* Google Map */}
                    <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204.4710971144848!2d-57.94580014412343!3d-34.91805305926701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e624b5dc6135%3A0x8fe607edd49a2d6d!2sOpen%20Peluqueros!5e0!3m2!1ses!2sar!4v1766975502034!5m2!1ses!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                        ></iframe>
                    </div>

                </div>
            </section>
        </div>
    );
}
