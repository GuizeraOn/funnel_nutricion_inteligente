"use client";

import { APP_COPY } from "@/lib/constants";
import { LogOut, Menu, X } from "lucide-react"; // Added X for close icon
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const navItems = [
        { label: "Inicio", href: "/" },
        { label: "Dietas", href: "/planos" },
        { label: "Perfil", href: "/perfil" },
    ];

    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <Link href="/" className="font-bold text-xl tracking-tight">
                    <img
                        src={APP_COPY.header.logoVertical}
                        alt="Nutrición Inteligente"
                        className="h-8 max-w-[65vw] w-auto object-contain"
                    />
                </Link>
                <nav className="hidden sm:flex gap-4 text-sm font-medium text-gray-600">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="hover:text-green-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-500 hover:text-red-500 flex items-center gap-2 transition-colors"
                >
                    <span className="hidden sm:inline">{APP_COPY.header.logout}</span>
                    <LogOut className="w-4 h-4" />
                </button>

                <button
                    className="sm:hidden text-gray-600 hover:text-green-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 sm:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-gray-600 font-medium hover:text-green-600 transition-colors p-2 hover:bg-slate-50 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
