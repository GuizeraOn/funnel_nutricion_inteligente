"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    Loader2,
    LogOut,
    Mail,
    Phone,
    Calendar,
    User as UserIcon,
    Ruler,
    Weight,
    Target,
    ChevronRight,
    CreditCard,
    Settings,
    HelpCircle,
    FileText
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserProfile {
    name?: string;
    email: string;
    phone?: string;
    createdAt: string;
    // Extended fields (optional for now)
    weight?: number;
    height?: number;
    goal?: string;
    planType?: 'Free' | 'Premium';
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!isMounted) return;

            if (!currentUser) {
                router.push("/login");
                return;
            }

            setUser(currentUser);

            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (isMounted) {
                    if (docSnap.exists()) {
                        setProfile(docSnap.data() as UserProfile);
                    } else {
                        const authProfile = {
                            email: currentUser.email || "",
                            name: currentUser.displayName || "",
                            createdAt: currentUser.metadata.creationTime || new Date().toISOString()
                        };
                        setProfile(authProfile);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                if (isMounted && currentUser) {
                    setProfile({
                        email: currentUser.email || "",
                        name: currentUser.displayName || "",
                        createdAt: currentUser.metadata.creationTime || new Date().toISOString()
                    });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Top Banner / Header */}
            <div className="bg-emerald-600 pb-24 pt-10 px-6 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="w-24 h-24 bg-white p-1 rounded-full shadow-2xl flex-shrink-0">
                        <div className="w-full h-full bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-4xl font-bold select-none">
                            {profile?.name ? profile.name.charAt(0).toUpperCase() : (user.email?.charAt(0).toUpperCase() || "U")}
                        </div>
                    </div>
                    <div className="text-center md:text-left text-white flex-1">
                        <h1 className="text-3xl font-bold mb-1">
                            Hola, {profile?.name || user.displayName || "NutriFriend"}! 👋
                        </h1>
                        <p className="text-emerald-100 text-lg opacity-90">
                            Tu viaje saludable continúa hoy.
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm transition-all flex items-center gap-2 text-sm font-medium border border-white/10"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-20 space-y-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center py-6">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-2">
                            <Weight className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {profile?.weight ? `${profile.weight}kg` : "--"}
                        </div>
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Peso</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center py-6">
                        <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-2">
                            <Ruler className="w-5 h-5" />
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {profile?.height ? `${profile.height}m` : "--"}
                        </div>
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Altura</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center py-6">
                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-2">
                            <Target className="w-5 h-5" />
                        </div>
                        <div className="text-sm font-bold text-slate-800 truncate w-full px-2" title={profile?.goal || "Sin definir"}>
                            {profile?.goal || "Sin definir"}
                        </div>
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Objetivo</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* My Plan Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-emerald-500" />
                                Mi Plan
                            </h2>
                            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {profile?.planType || "Gratuito"}
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 mb-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                <FileText className="w-8 h-8 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm">Aún no has generado tu dieta completa.</p>
                                <p className="text-slate-400 text-xs mt-1">Completa el formulario para empezar.</p>
                            </div>
                        </div>

                        <Link href="/planos" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-emerald-500/20 shadow-lg text-center">
                            Ver Planes Disponibles
                        </Link>
                    </div>

                    {/* Personal Info */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                            <UserIcon className="w-5 h-5 text-emerald-500" />
                            Datos Personales
                        </h2>

                        <div className="space-y-4">
                            <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs text-slate-400 font-medium uppercase">Email</p>
                                    <p className="text-slate-800 font-medium truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs text-slate-400 font-medium uppercase">Teléfono</p>
                                    <p className="text-slate-800 font-medium">{profile?.phone || "No registrado"}</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs text-slate-400 font-medium uppercase">Miembro desde</p>
                                    <p className="text-slate-800 font-medium">
                                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings / Menu List */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-slate-700">Configuración de Cuenta</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-slate-700">Ayuda y Soporte</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                </div>

            </main>
        </div>
    );
}
