"use client";

import { APP_COPY } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Check, Edit2, Star, Flame, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlansPage() {
    const { plans } = APP_COPY;

    const PlanIcon = ({ id }: { id: string }) => {
        switch (id) {
            case 'basic': return <span className="text-2xl">🌱</span>;
            case 'bestseller': return <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
            case 'recommended': return <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />;
            case 'premium': return <Crown className="w-6 h-6 text-purple-500 fill-purple-500" />;
            default: return null;
        }
    };

    return (
        <>
            <Header />
            <main className="flex-1 bg-slate-50 p-6 pb-20">

                {/* Page Header */}
                <div className="text-center mb-8 space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">{plans.header}</h1>
                    <p className="text-gray-500">{plans.subHeader}</p>
                </div>

                {/* Mock Context */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-8">
                    <span className="font-medium text-gray-700 text-sm">{plans.featuresMock.goal}</span>
                    <button className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                        <Edit2 className="w-3 h-3" />
                        {plans.featuresMock.changeGoal}
                    </button>
                </div>

                {/* Plans Grid */}
                <div className="space-y-6">
                    {plans.items.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "relative bg-white rounded-2xl p-6 transition-all border-2",
                                plan.highlight
                                    ? "border-emerald-500 shadow-xl shadow-emerald-100 scale-[1.02]"
                                    : "border-gray-100 shadow-sm"
                            )}
                        >
                            {/* Badge if exists */}
                            {plan.label && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    {plan.label}
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">{plan.name}</div>
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{plan.title}</h3>
                                    {plan.subtitle && <p className="text-sm text-purple-600 font-medium mt-1">{plan.subtitle}</p>}
                                </div>
                                <div className="bg-gray-50 p-2 rounded-full">
                                    <PlanIcon id={plan.id} />
                                </div>
                            </div>

                            <div className="mb-6">
                                <span className="text-3xl font-bold text-gray-900">{plan.currency}{plan.price}</span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                                        <span className="text-sm text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={cn(
                                "w-full py-3 rounded-xl font-bold transition-all active:scale-95",
                                plan.highlight
                                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            )}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
