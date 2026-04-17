import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError) {
            setError('Credenciales incorrectas. Verificá tu email y contraseña.');
        } else {
            onLogin();
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white flex flex-col font-display">
            {/* Header minimalista */}
            <nav className="w-full px-8 h-16 flex items-center border-b border-border-subtle dark:border-white/10">
                <Link to="/" className="flex flex-col leading-none">
                    <span className="text-xl font-bold tracking-tight">Habito</span>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">Admin Panel</span>
                </Link>
            </nav>

            {/* Login Card */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                            <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Acceso Administrativo</h1>
                        <p className="text-sm text-text-main/60 dark:text-white/50 mt-1">Ingresá tus credenciales para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold tracking-wide text-text-main/70 dark:text-white/60 ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoFocus
                                placeholder="admin@habito.com"
                                className="w-full bg-white dark:bg-white/5 border border-border-subtle dark:border-white/10 px-4 py-3.5 rounded-2xl text-sm focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold tracking-wide text-text-main/70 dark:text-white/60 ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white dark:bg-white/5 border border-border-subtle dark:border-white/10 px-4 py-3.5 pr-12 rounded-2xl text-sm focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-wait text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                    Ingresar
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-text-main/40 dark:text-white/30 mt-8">
                        Área restringida · Solo personal autorizado
                    </p>
                </div>
            </div>
        </div>
    );
}
