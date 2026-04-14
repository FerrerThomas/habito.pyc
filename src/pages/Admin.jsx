import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { products as localProducts, categories as localCategories } from '../data/products';
import { Link } from 'react-router-dom';

export default function Admin() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Edit states
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form states
    const [catId, setCatId] = useState('');
    const [catTitle, setCatTitle] = useState('');
    const [catImage, setCatImage] = useState('');

    const [prodName, setProdName] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodCategory, setProdCategory] = useState('');
    const [prodTags, setProdTags] = useState('');
    const [prodImage, setProdImage] = useState('');

    const [isUploading, setIsUploading] = useState(false);
    const [catImageFile, setCatImageFile] = useState(null);
    const [prodImageFile, setProdImageFile] = useState(null);

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('images').getPublicUrl(fileName);
        return data.publicUrl;
    };

    const fetchData = async () => {
        setIsLoading(true);
        const { data: catData } = await supabase.from('categories').select('*');
        const { data: prodData } = await supabase.from('products').select('*').order('id', { ascending: false });
        if (catData) setCategories(catData);
        if (prodData) setProducts(prodData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMigrate = async () => {
        if (!confirm('¿Estás seguro de migrar los datos locales? Esto sobreescribirá si hay IDs duplicados en categorías.')) return;
        
        setIsLoading(true);
        // Migrate categories
        for (const cat of localCategories) {
            await supabase.from('categories').upsert({ id: cat.id, title: cat.title, image: cat.image });
        }
        
        // Migrate products
        for (const prod of localProducts) {
            await supabase.from('products').insert({
                name: prod.name,
                description: prod.description,
                price: prod.price,
                category: prod.category,
                image: prod.image,
                tags: prod.tags || []
            });
        }
        
        await fetchData();
        alert('Migración completada!');
    };

    // --- CATEGORIES ---
    const handleSaveCategory = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            let finalImageUrl = catImage;
            if (catImageFile) {
                finalImageUrl = await uploadImage(catImageFile);
            }
            if (editingCategory) {
                await supabase.from('categories').update({ title: catTitle, image: finalImageUrl }).eq('id', editingCategory.id);
            } else {
                await supabase.from('categories').insert([{ id: catId, title: catTitle, image: finalImageUrl }]);
            }
            resetCategoryForm();
            fetchData();
        } catch (error) {
            alert('Error al guardar categoría: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEditCategory = (c) => {
        setEditingCategory(c);
        setCatId(c.id);
        setCatTitle(c.title);
        setCatImage(c.image);
    };

    const handleDeleteCategory = async (id) => {
        if (confirm('¿Seguro? Si hay productos en esta categoría también se borrarán.')) {
            await supabase.from('categories').delete().eq('id', id);
            fetchData();
        }
    };

    const resetCategoryForm = () => {
        setEditingCategory(null);
        setCatId(''); setCatTitle(''); setCatImage(''); setCatImageFile(null);
    };

    // --- PRODUCTS ---
    const handleSaveProduct = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            let finalImageUrl = prodImage;
            if (prodImageFile) {
                finalImageUrl = await uploadImage(prodImageFile);
            }
            const productData = {
                name: prodName,
                description: prodDesc,
                price: parseFloat(prodPrice),
                category: prodCategory,
                image: finalImageUrl,
                tags: prodTags ? prodTags.split(',').map(t => t.trim()).filter(Boolean) : []
            };

            if (editingProduct) {
                await supabase.from('products').update(productData).eq('id', editingProduct.id);
            } else {
                await supabase.from('products').insert([productData]);
            }
            resetProductForm();
            fetchData();
        } catch(error) {
            alert('Error al guardar producto: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEditProduct = (p) => {
        setEditingProduct(p);
        setProdName(p.name);
        setProdDesc(p.description || '');
        setProdPrice(p.price);
        setProdCategory(p.category);
        setProdTags((p.tags || []).join(', '));
        setProdImage(p.image || '');
    };

    const handleDeleteProduct = async (id) => {
        if (confirm('¿Seguro quieres borrar este producto?')) {
            await supabase.from('products').delete().eq('id', id);
            fetchData();
        }
    };

    const resetProductForm = () => {
        setEditingProduct(null);
        setProdName(''); setProdDesc(''); setProdPrice(''); setProdCategory(''); setProdTags(''); setProdImage(''); setProdImageFile(null);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white pb-20 font-display">
            {/* Nav/Header */}
            <nav className="sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border-subtle dark:border-white/10">
                <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
                    <div className="flex flex-col">
                        <Link to="/" className="text-xl font-bold tracking-tight text-text-main dark:text-white">Habito</Link>
                        <span className="text-[10px] text-primary uppercase font-bold tracking-wider">Admin Panel</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleMigrate} className="text-xs font-bold text-white bg-secondary px-3 py-1.5 rounded-full hover:bg-secondary/90 transition-colors shadow-sm">
                            Migrar Datos
                        </button>
                        <Link to="/" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">home</span>
                            Volver
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-5 mt-8">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* --- CATEGORIAS --- */}
                        <div className="bg-white dark:bg-[#1e1e1e] p-6 md:p-8 rounded-3xl shadow-sm border border-border-subtle dark:border-white/5">
                            <h2 className="text-2xl font-bold mb-6 tracking-tight">Categorías</h2>
                            
                            <form onSubmit={handleSaveCategory} className="flex flex-col gap-4 mb-8 bg-background-light dark:bg-white/5 p-5 rounded-2xl border border-transparent dark:border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-sm tracking-wide">{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
                                    {editingCategory && (
                                        <button type="button" onClick={resetCategoryForm} className="text-xs text-secondary hover:text-primary transition-colors">Cancelar</button>
                                    )}
                                </div>
                                
                                <input placeholder="ID (ej: Panes) - Solo lectura si editas" value={catId} onChange={e=>setCatId(e.target.value)} disabled={!!editingCategory} required className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50" />
                                <input placeholder="Título visible (ej: Panes Artesanales)" value={catTitle} onChange={e=>setCatTitle(e.target.value)} required className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-text-main/70 dark:text-white/70 ml-1">Imagen de Categoría</label>
                                    <input type="file" accept="image/*" onChange={e=>setCatImageFile(e.target.files[0])} required={!catImage} className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
                                    {catImage && !catImageFile && <p className="text-xs text-primary/80 ml-1 mt-1">✓ Ya tiene una imagen guardada.</p>}
                                </div>
                                
                                <button type="submit" disabled={isUploading} className="mt-2 w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                                    {isUploading ? 'Gurdando datos...' : (editingCategory ? 'Guardar Cambios' : 'Agregar Categoría')}
                                </button>
                            </form>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                                {categories.map(c => (
                                    <div key={c.id} className="p-3 bg-background-light dark:bg-white/5 rounded-2xl flex justify-between items-center group transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                                                <img src={c.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-bold text-sm">{c.title}</p>
                                                <p className="text-[11px] text-text-main/50 dark:text-white/50 uppercase tracking-wider">{c.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditCategory(c)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-black/50 text-secondary hover:text-primary shadow-sm"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                                            <button onClick={() => handleDeleteCategory(c.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-black/50 text-red-500 hover:text-red-600 shadow-sm"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- PRODUCTOS --- */}
                        <div className="bg-white dark:bg-[#1e1e1e] p-6 md:p-8 rounded-3xl shadow-sm border border-border-subtle dark:border-white/5">
                            <h2 className="text-2xl font-bold mb-6 tracking-tight">Productos</h2>
                            
                            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4 mb-8 bg-background-light dark:bg-white/5 p-5 rounded-2xl border border-transparent dark:border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-sm tracking-wide">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                                    {editingProduct && (
                                        <button type="button" onClick={resetProductForm} className="text-xs text-secondary hover:text-primary transition-colors">Cancelar</button>
                                    )}
                                </div>

                                <input placeholder="Nombre del producto" value={prodName} onChange={e=>setProdName(e.target.value)} required className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                <textarea placeholder="Descripción breve" value={prodDesc} onChange={e=>setProdDesc(e.target.value)} required className="w-full min-h-[80px] rounded-xl bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                        <input type="number" placeholder="Precio" value={prodPrice} onChange={e=>setProdPrice(e.target.value)} required className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 pl-8 pr-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                    </div>
                                    <select value={prodCategory} onChange={e=>setProdCategory(e.target.value)} required className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer">
                                        <option value="" disabled>Seleccionar Categoría</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                </div>
                                <input placeholder="Tags (separados por coma, ej: Vegano, Sin TACC)" value={prodTags} onChange={e=>setProdTags(e.target.value)} className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-text-main/70 dark:text-white/70 ml-1">Imagen de Producto</label>
                                    <input type="file" accept="image/*" onChange={e=>setProdImageFile(e.target.files[0])} required={!prodImage} className="w-full bg-white dark:bg-black/20 border border-border-subtle dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
                                    {prodImage && !prodImageFile && <p className="text-xs text-primary/80 ml-1 mt-1">✓ Ya tiene una imagen guardada.</p>}
                                </div>
                                
                                <button type="submit" disabled={isUploading} className="mt-2 w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                                    {isUploading ? 'Guardando datos...' : (editingProduct ? 'Guardar Cambios' : 'Agregar Producto')}
                                </button>
                            </form>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 no-scrollbar border-t border-border-subtle dark:border-white/10 pt-4">
                                {products.map(p => (
                                    <div key={p.id} className="p-3 bg-background-light dark:bg-white/5 rounded-2xl flex justify-between items-center group transition-colors hover:bg-gray-100 dark:hover:bg-white/10 border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            {p.image ? (
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-gray-400">image</span>
                                                </div>
                                            )}
                                            <div className="flex flex-col min-w-0 pr-2">
                                                <p className="font-bold text-sm tracking-tight truncate">{p.name}</p>
                                                <p className="text-[12px] text-text-main/60 dark:text-white/60 truncate flex items-center gap-1">
                                                    <span className="font-bold text-primary">${p.price}</span>
                                                    <span className="mx-1 opacity-50">•</span>
                                                    {p.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditProduct(p)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-black/50 text-secondary hover:text-primary shadow-sm"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                                            <button onClick={() => handleDeleteProduct(p.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-black/50 text-red-500 hover:text-red-600 shadow-sm"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
