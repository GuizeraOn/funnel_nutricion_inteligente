"use client";

import { useState } from "react";
import { APP_COPY } from "@/lib/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const MEALS = [
    {
        id: "desayuno",
        icon: "☕",
        name: "Desayuno",
        time: "08:00",
        kcal: 506,
        options: [
            {
                label: "Opción 1",
                items: [
                    { name: "Pan de caja (integral)", qty: "4 rebanadas" },
                    { name: "Plátano guineo / maduro", qty: "1 unidad" },
                    { name: "Café", qty: "300 ml" },
                    { name: "Pollo desmenuzado", qty: "65g" },
                ],
            },
            {
                label: "Opción 2",
                items: [
                    { name: "Avena cocida", qty: "80g" },
                    { name: "Leche descremada", qty: "200 ml" },
                    { name: "Manzana", qty: "1 unidad" },
                    { name: "Huevos revueltos", qty: "2 unidades" },
                ],
            },
            {
                label: "Opción 3",
                items: [
                    { name: "Arepa de maíz", qty: "2 unidades" },
                    { name: "Queso blanco", qty: "40g" },
                    { name: "Café", qty: "300 ml" },
                    { name: "Aguacate", qty: "½ unidad" },
                ],
            },
        ],
    },
    {
        id: "merienda_manana",
        icon: "🍏",
        name: "Merienda de la mañana",
        time: "11:00",
        kcal: 110,
        options: [
            {
                label: "Opción 1",
                items: [{ name: "Naranja dulce", qty: "2 unidades" }],
            },
            {
                label: "Opción 2",
                items: [{ name: "Manzana verde", qty: "1 unidad" }],
            },
            {
                label: "Opción 3",
                items: [{ name: "Yogur natural sin azúcar", qty: "150g" }],
            },
        ],
    },
    {
        id: "almuerzo",
        icon: "🥗",
        name: "Almuerzo",
        time: "13:30",
        kcal: 594,
        tip: "¡Puedes descargarlo en PDF! ✨",
        options: [
            {
                label: "Opción 1",
                items: [
                    { name: "Carne de res (boliche o morcillo) asada", qty: "100g" },
                    { name: "Arepa de maíz o Cuscús de maíz", qty: "285g" },
                    { name: "Frijoles negros", qty: "100g" },
                ],
            },
            {
                label: "Opción 2",
                items: [
                    { name: "Pollo a la plancha", qty: "120g" },
                    { name: "Arroz blanco cocido", qty: "200g" },
                    { name: "Ensalada mixta", qty: "Al gusto" },
                ],
            },
            {
                label: "Opción 3",
                items: [
                    { name: "Pescado al horno", qty: "130g" },
                    { name: "Yuca cocida", qty: "200g" },
                    { name: "Vegetales salteados", qty: "Al gusto" },
                ],
            },
        ],
    },
    {
        id: "merienda_tarde",
        icon: "🍎",
        name: "Merienda de la tarde",
        time: "16:30",
        kcal: 440,
        options: [
            {
                label: "Opción 1",
                items: [
                    { name: "Pan de caja", qty: "2 rebanadas" },
                    { name: "Plátano guineo / maduro", qty: "1 unidad" },
                    { name: "Queso tipo Gouda o Edam", qty: "4 rebanadas" },
                    { name: "Café", qty: "300 ml" },
                ],
            },
            {
                label: "Opción 2",
                items: [
                    { name: "Galletas de arroz integrales", qty: "5 unidades" },
                    { name: "Mantequilla de maní", qty: "30g" },
                    { name: "Té sin azúcar", qty: "300 ml" },
                ],
            },
            {
                label: "Opción 3",
                items: [
                    { name: "Batido de proteína", qty: "1 scoop" },
                    { name: "Plátano maduro", qty: "1 unidad" },
                    { name: "Agua", qty: "300 ml" },
                ],
            },
        ],
    },
    {
        id: "cena",
        icon: "🍲",
        name: "Cena",
        time: "20:30",
        kcal: 551,
        defaultOption: 2, // Opción 3 selected
        options: [
            {
                label: "Opción 1",
                items: [
                    { name: "Pollo hervido desmenuzado", qty: "120g" },
                    { name: "Arroz integral", qty: "150g" },
                    { name: "Ensalada verde", qty: "Al gusto" },
                ],
            },
            {
                label: "Opción 2",
                items: [
                    { name: "Carne de res magra", qty: "100g" },
                    { name: "Papa cocida", qty: "200g" },
                    { name: "Vegetales al vapor", qty: "Al gusto" },
                ],
            },
            {
                label: "Opción 3",
                items: [
                    { name: "Camote (batata) cocido", qty: "275g" },
                    { name: "Yuca cocida", qty: "270g" },
                    { name: "Ensalada de vegetales", qty: "Al gusto (libre)" },
                ],
            },
        ],
    },
];

// ─── Meal Card ────────────────────────────────────────────────────────────────

function MealCard({ meal }: { meal: (typeof MEALS)[0] }) {
    const [selected, setSelected] = useState(meal.defaultOption ?? 0);
    const currentItems = meal.options[selected].items;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                    <span className="text-3xl leading-none">{meal.icon}</span>
                    <div>
                        <p className="font-bold text-gray-900 text-base">{meal.name}</p>
                        <p className="text-xs text-gray-400">{meal.time}</p>
                    </div>
                </div>
                <span className="font-extrabold text-gray-900 text-lg tabular-nums">
                    {meal.kcal} <span className="text-sm font-medium text-gray-400">kcal</span>
                </span>
            </div>

            {/* Tip banner */}
            {meal.tip && (
                <div className="mx-4 mb-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-3 py-2 rounded-lg">
                    {meal.tip}
                </div>
            )}

            {/* Option tabs */}
            <div className="mx-4 mb-4 bg-gray-100 rounded-xl p-1 grid grid-cols-3 gap-1">
                {meal.options.map((opt, i) => (
                    <button
                        key={opt.label}
                        onClick={() => setSelected(i)}
                        className={cn(
                            "text-xs font-semibold py-2 rounded-lg transition-all",
                            selected === i
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Items */}
            <div className="px-4 pb-5 space-y-0 divide-y divide-gray-50">
                {currentItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            {/* Green check circle */}
                            <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l2.5 2.5L9 1" />
                                </svg>
                            </span>
                            <span className="text-sm text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm text-gray-400 font-medium ml-3 text-right flex-shrink-0">{item.qty}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestPage() {
    const [activeTab, setActiveTab] = useState<"dieta" | "entrenamiento">("dieta");
    const [isBmiOpen, setIsBmiOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-5 pt-5 pb-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                <img
                    src={APP_COPY.header.logoVertical}
                    alt="Nutrición Inteligente"
                    className="h-7 w-auto object-contain"
                />
                <button className="p-1 text-gray-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            <main className="flex-1 px-4 py-5 space-y-5 pb-12">

                {/* BMI Banner */}
                <button
                    onClick={() => setIsBmiOpen(!isBmiOpen)}
                    className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm px-4 py-3.5 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                        </svg>
                        Estado Actual
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            IMC 61.7
                            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                            Obesidad
                        </span>
                        <svg
                            className={cn("w-4 h-4 text-gray-400 transition-transform", isBmiOpen && "rotate-180")}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {/* BMI Detail Panel */}
                {isBmiOpen && (
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4 space-y-3 -mt-2 animate-in">
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Tu IMC actual es <strong className="text-orange-500">61.7</strong>, clasificado como <strong>Obesidad Grado III</strong>. Tu plan está diseñado específicamente para reducir grasa de forma saludable y sostenible.
                        </p>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                                style={{ width: "100%" }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-400 rounded-full shadow"
                                style={{ left: "calc(95% - 8px)" }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                            <span>Normal (18.5)</span>
                            <span>Sobrepeso (25)</span>
                            <span>Obesidad (30+)</span>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                    <button
                        onClick={() => setActiveTab("dieta")}
                        className={cn(
                            "flex-1 py-2.5 rounded-full text-sm font-semibold transition-all",
                            activeTab === "dieta"
                                ? "bg-gray-900 text-white shadow"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Dieta
                    </button>
                    <button
                        onClick={() => setActiveTab("entrenamiento")}
                        className={cn(
                            "flex-1 py-2.5 rounded-full text-sm font-semibold transition-all",
                            activeTab === "entrenamiento"
                                ? "bg-gray-900 text-white shadow"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Entrenamiento
                    </button>
                </div>

                {activeTab === "dieta" && (
                    <>
                        {/* Total kcal row */}
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-xl">🔥</span>
                            <span className="text-gray-500 text-sm font-medium">Total:</span>
                            <span className="font-extrabold text-gray-900 text-lg">2200</span>
                            <span className="text-gray-400 text-sm">kcal</span>
                            <button className="ml-1 text-gray-300 hover:text-gray-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        {/* Meal cards */}
                        <div className="space-y-4">
                            {MEALS.map((meal) => (
                                <MealCard key={meal.id} meal={meal} />
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "entrenamiento" && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-4 text-center">
                        <span className="text-5xl">💪</span>
                        <h2 className="font-bold text-gray-900 text-lg">Tu Plan de Entrenamiento</h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Rutina adaptada a tu nivel y objetivo. Diseñada para maximizar la pérdida de grasa conservando la masa muscular.
                        </p>
                        <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 text-left">
                            {[
                                { day: "Lunes", focus: "Cardio moderado", duration: "40 min" },
                                { day: "Martes", focus: "Tren superior", duration: "35 min" },
                                { day: "Miércoles", focus: "Descanso activo", duration: "20 min" },
                                { day: "Jueves", focus: "Tren inferior", duration: "35 min" },
                                { day: "Viernes", focus: "Cardio HIIT", duration: "30 min" },
                            ].map((d) => (
                                <div key={d.day} className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-gray-900">{d.day}</span>
                                        <span className="text-xs text-gray-400 ml-2">{d.focus}</span>
                                    </div>
                                    <span className="text-xs text-emerald-600 font-semibold">{d.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
