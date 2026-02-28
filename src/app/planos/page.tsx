"use client";

import { APP_COPY } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Check, Edit2, Star, Flame, Crown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function PlansPage() {
    const { plans } = APP_COPY;
    const [userGoal, setUserGoal] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("PlansPage: User authenticated, listening for goal updates...", user.uid);
                const docRef = doc(db, "users", user.uid);

                // Use onSnapshot for real-time updates
                const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("PlansPage: Real-time update received", data);
                        if (data.goal) {
                            setUserGoal(data.goal);
                        }
                    } else {
                        console.log("PlansPage: No profile found in Firestore");
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("PlansPage: Error listening to doc:", error);
                    setLoading(false);
                });

                return () => unsubscribeSnapshot();
            } else {
                console.log("PlansPage: No user authenticated");
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);



    // Removed blocking loading return to improve perceived performance

    return (
        <>
            <Header />
            <main className="flex-1 bg-slate-50 p-6 pb-20 animate-in fade-in duration-500">

                {/* Page Header */}
                <div className="text-center mb-8 space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">{plans.header}</h1>
                    <p className="text-gray-500">{plans.subHeader}</p>
                </div>

                {/* Mock Context - Now Dynamic with Skeleton */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-8">
                    <span className="font-medium text-gray-700 text-sm flex items-center gap-2">
                        Objetivo:
                        {loading ? (
                            <span className="h-4 w-24 bg-slate-100 animate-pulse rounded block" />
                        ) : (
                            <span className="text-green-600 font-bold animate-in fade-in">{userGoal || "No seleccionado"}</span>
                        )}
                    </span>
                    <Link href="/#calculator" className="text-green-600 text-sm font-bold flex items-center gap-1 hover:underline">
                        <Edit2 className="w-3 h-3" />
                        {plans.featuresMock.changeGoal}
                    </Link>
                </div>

                {/* Plans Grid */}
                <div className="space-y-8 mt-4">
                    {plans.items.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "relative bg-white rounded-2xl transition-all border-2",
                                plan.highlight
                                    ? "border-green-500 shadow-xl shadow-green-100 scale-[1.02]"
                                    : "border-gray-100 shadow-sm"
                            )}
                        >
                            {/* Badge if exists - absolutely positioned outside the logo container */}
                            {plan.label && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-20 whitespace-nowrap uppercase tracking-wider">
                                    {plan.label}
                                </div>
                            )}

                            <div className="w-full bg-slate-50 border-b border-gray-100 rounded-t-2xl py-6 flex items-center justify-center">
                                <img
                                    src={plan.image}
                                    alt={plan.name}
                                    className="w-auto h-auto max-w-[70%] max-h-16 object-contain"
                                />
                            </div>

                            <div className="p-6">


                                <div className="mb-4">
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">{plan.name}</div>
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{plan.title}</h3>
                                </div>

                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-gray-900">{plan.currency}{plan.price}</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={plan.checkoutUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "w-full py-3 rounded-xl font-bold transition-all active:scale-95 block text-center",
                                        plan.highlight
                                            ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200"
                                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                    )}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main >
        </>
    );
}
