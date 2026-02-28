"use client";

import { useState, useEffect } from "react";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import { APP_COPY } from "@/lib/constants";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import PhoneInput, { type Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { cn } from "@/lib/utils";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(""); // Feedback visual do progresso
    const [error, setError] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [detectedCountry, setDetectedCountry] = useState<Country>("CL");

    useEffect(() => {
        fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => {
                if (data?.country_code) {
                    setDetectedCountry(data.country_code as Country);
                }
            })
            .catch(() => { /* fallback to CL */ });
    }, []);

    const handleGoogleSignup = async () => {
        if (!termsAccepted) {
            setError("Debes aceptar los Términos y Condiciones y las Políticas de Privacidad.");
            return;
        }
        try {
            setLoading(true);
            setError("");
            setStatus("Conectando com Google...");
            const result = await signInWithPopup(auth, googleProvider);

            setStatus("Criando perfil...");
            // Create user profile in Firestore if it doesn't exist
            await setDoc(doc(db, "users", result.user.uid), {
                email: result.user.email,
                name: result.user.displayName,
                createdAt: new Date().toISOString(),
            }, { merge: true });

            router.push("/");
        } catch (err: any) {
            setError("Error al registrarse con Google.");
            console.error(err);
        } finally {
            setLoading(false);
            setStatus("");
        }
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!termsAccepted) {
            setError("Debes aceptar los Términos y Condiciones y las Políticas de Privacidad.");
            return;
        }

        if (!name.trim()) {
            setError("Por favor ingresa tu nombre.");
            return;
        }

        if (email !== confirmEmail) {
            setError("Los correos electrónicos no coinciden.");
            return;
        }

        if (!phone) {
            setError("Por favor ingresa un número de teléfono.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setStatus("Registrando usuario...");

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            setStatus("Guardando datos...");

            // Save user profile with phone and name
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                email: email,
                phone: phone,
                createdAt: new Date().toISOString(),
            }, { merge: true });

            setStatus("¡Listo!");
            router.push("/");
        } catch (err: any) {
            console.error("Signup Error:", err);

            if (err.code === 'auth/email-already-in-use') {
                setError("El email ya está registrado.");
            } else if (err.code === 'auth/weak-password') {
                setError("La contraseña es muy débil (mínimo 6 caracteres).");
            } else if (err.code === 'auth/operation-not-allowed') {
                setError("El registro por correo no está habilitado en Firebase.");
            } else {
                setError("Error: " + err.message);
            }
        } finally {
            setLoading(false);
            setStatus("");
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
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Crear Cuenta</h1>
                </div>

                <div className="space-y-4">
                    {/* Status Message */}
                    {loading && status && (
                        <div className="text-green-600 text-sm text-center font-medium animate-pulse">
                            {status}
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                            {error}
                        </div>
                    )}
                    <button
                        onClick={handleGoogleSignup}
                        disabled={loading}
                        className="w-full bg-white border-2 border-slate-100 hover:bg-slate-50 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && status.includes("Google") ? (
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
                        <span>Registrarse con Google</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">O con email</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignup} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                {/* User icon for Name input */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-3 h-5 w-5 text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Confirmar Email"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="phone-input-container">
                                <PhoneInput
                                    placeholder="Teléfono (Whatsapp)"
                                    value={phone}
                                    onChange={setPhone}
                                    defaultCountry={detectedCountry}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 focus-within:bg-white transition-all"
                                    numberInputProps={{
                                        className: "bg-transparent border-none focus:outline-none w-full text-gray-900 placeholder:text-gray-400 ml-2"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-2 px-1">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 transition-colors cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                Acepto los <Link href="#" className="flex-inline text-green-600 hover:text-green-700 underline">Términos y Condiciones</Link> y las <Link href="#" className="flex-inline text-green-600 hover:text-green-700 underline whitespace-nowrap">Políticas de Privacidad</Link>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Crear Cuenta
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
            <style jsx global>{`
        .PhoneInputCountry {
            margin-right: 0.5rem;
        }
        .PhoneInputCountrySelect {
             background-color: transparent;
        }
      `}</style>
        </div>
    );
}
