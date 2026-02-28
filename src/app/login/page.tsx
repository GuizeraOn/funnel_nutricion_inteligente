"use client";

import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { APP_COPY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            await signInWithPopup(auth, googleProvider);
            router.push("/"); // Redirect to home or dashboard
        } catch (err: any) {
            setError("Error al iniciar sesión con Google.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (err: any) {
            setError("Email o contraseña inválidos.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-2 flex flex-col items-center">
                    <img
                        src={APP_COPY.header.logo}
                        alt="Logo"
                        className="h-24 w-auto mb-4 object-contain"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
                    <p className="text-gray-500">Ingresa a tu cuenta de Nutrición Inteligente</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white border-2 border-slate-100 hover:bg-slate-50 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                        ) : (
                            // Google Icon SVG
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        )}
                        <span>Continuar con Google</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">O con email</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Iniciar Sesión
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link href="/signup" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
