import React from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/products';

export default function Menu() {
    const [activeCategory, setActiveCategory] = React.useState("Todo");
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredCategories = categories.map(cat => {
        // Get items for this category from the main products list
        const categoryItems = products.filter(p => p.category === cat.id);
        return {
            ...cat,
            items: categoryItems
        };
    }).filter(cat => {
        // Filter by active category tab
        if (activeCategory !== "Todo" && cat.id !== activeCategory) return false;
        return true;
    }).map(cat => {
        // Filter items by search term internally
        const matchingItems = cat.items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...cat, items: matchingItems };
    }).filter(cat => cat.items.length > 0);

    return (
        <div className="pb-20"> {/* pb-20 for bottom nav space */}
            {/* Search Bar Section 
            <div className="px-4 py-4 pt-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-secondary dark:text-gray-400">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border-none rounded-xl leading-5 bg-white dark:bg-white/10 text-text-main dark:text-white placeholder-secondary dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition duration-150 ease-in-out sm:text-sm"
                        placeholder="Buscar producto…"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>*/}

            {/* Category Filters */}
            <div className="w-full overflow-x-auto no-scrollbar pb-2 pl-4 px-4 py-4 pt-6">
                <div className="flex space-x-3 min-w-max pr-4">
                    <button
                        onClick={() => setActiveCategory("Todo")}
                        className={`flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold transition-transform active:scale-95 animate-fade-up ${activeCategory === "Todo" ? "bg-primary text-primary-content shadow-md shadow-primary/20" : "bg-white dark:bg-white/10 border border-border-subtle dark:border-white/10 text-text-main dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"}`}
                    >
                        Todo
                    </button>
                    {categories.map((cat, i) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium transition-colors animate-fade-up ${activeCategory === cat.id ? "bg-primary text-primary-content shadow-md shadow-primary/20" : "bg-white dark:bg-white/10 border border-border-subtle dark:border-white/10 text-text-main dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"}`}
                            style={{ animationDelay: `${(i + 1) * 50}ms`, animationFillMode: 'both' }}
                        >
                            {cat.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content: Category Cards */}
            <div className="flex flex-col gap-6 px-4 py-4">
                {filteredCategories.map((category, index) => (
                    <section key={category.id} className="bg-background-card dark:bg-white/5 rounded-2xl border border-border-subtle dark:border-white/10 overflow-hidden shadow-sm animate-fade-up opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                        <div className="relative h-32 w-full overflow-hidden">
                            <img alt={category.title} className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" src={category.image} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <h2 className="text-white text-xl font-bold tracking-wide animate-fade-up delay-100">{category.title}</h2>
                            </div>
                        </div>
                        <div className="divide-y divide-border-subtle dark:divide-white/10 md:divide-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:p-4">
                            {category.items.map((item, i) => (
                                <div key={i} className="p-4 md:p-4 md:rounded-xl md:bg-gray-50 md:dark:bg-white/5 flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 md:hover:bg-gray-100 md:dark:hover:bg-white/10 transition-colors animate-fade-up opacity-0" style={{ animationDelay: `${(i * 50) + 200}ms`, animationFillMode: 'forwards' }}>
                                    <div className="flex flex-col gap-1 pr-4">
                                        <h3 className="font-semibold text-text-main dark:text-gray-100 text-base">{item.name}</h3>
                                        <p className="text-xs text-secondary dark:text-gray-400 line-clamp-2">{item.description}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                        <span className="font-bold text-primary">${item.price}</span>
                                        <Link to={`/producto/${item.id}`} className="text-xs font-medium text-text-main/70 dark:text-gray-300 underline decoration-primary/50 underline-offset-2 hover:text-primary transition-colors">Ver</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {filteredCategories.length === 0 && (
                    <div className="text-center py-10 text-text-main/50">
                        No se encontraron productos en esta categoría.
                    </div>
                )}
            </div>
        </div>
    );
}
