"use client";

import { APP_COPY, BREAKFAST_ITEMS, LUNCH_ITEMS, MORNING_SNACK_ITEMS } from "@/lib/constants";
import { Check, ArrowDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MenuBuilderStepProps {
    // onNext removed
}

const MealSection = ({
    title,
    instruction,
    items,
    category,
    details,
    selections,
    toggleSelection
}: {
    title: string,
    instruction: string,
    items: { id: string, name: string, emoji: string }[],
    category: string,
    details?: string,
    selections: Record<string, string[]>,
    toggleSelection: (category: string, itemId: string) => void
}) => (
    <div id={`section-${category}`} className="space-y-4 mb-10 scroll-mt-24">
        <div className="sticky top-[73px] bg-slate-50/95 backdrop-blur py-2 z-10 border-b border-gray-100">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full transition-colors",
                    (selections[category] || []).length >= 3 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                )}>
                    {(selections[category] || []).length}/3 {APP_COPY.home.menuBuilder.selectionCount}
                </span>
            </div>
            <p className="text-sm text-gray-500">{instruction}</p>
            {details && <p className="text-xs text-gray-400 italic">{details}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
            {items.map((item) => {
                const isSelected = (selections[category] || []).includes(item.id);
                return (
                    <div
                        key={item.id}
                        onClick={() => toggleSelection(category, item.id)}
                        className={cn(
                            "p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all aspect-square text-center relative overflow-hidden",
                            isSelected
                                ? "bg-green-50 border-green-500 shadow-sm"
                                : "bg-white border-gray-100 hover:border-green-200"
                        )}
                    >
                        {isSelected && (
                            <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                        <span className="text-[16px] mb-2 filter drop-shadow-sm leading-tight transition-transform transform group-hover:scale-110">
                            {item.emoji}
                        </span>
                        <span className={cn("text-[10px] font-medium leading-tight", isSelected ? "text-green-900" : "text-gray-600")}>
                            {item.name}
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
);

const AccordionMealSection = ({
    title,
    instruction,
    items,
    category,
    details,
    optional,
    selections,
    toggleSelection,
    onSkip,
    skipText
}: {
    title: string,
    instruction: string,
    items: { id: string, name: string, emoji: string }[],
    category: string,
    details?: string,
    optional?: boolean,
    selections: Record<string, string[]>,
    toggleSelection: (category: string, itemId: string) => void,
    onSkip?: () => void,
    skipText?: string
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const count = (selections[category] || []).length;

    return (
        <div id={`section-${category}`} className="space-y-4 mb-10 scroll-mt-24 border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <h3 className="text-[17px] font-bold text-gray-800 leading-tight">{title}</h3>
                    {optional && (
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                            Opcional
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors whitespace-nowrap",
                        count > 0 ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    )}>
                        {count} {APP_COPY.home.menuBuilder.selectionCount}
                    </span>
                    <ArrowDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")} />
                </div>
            </button>

            {isOpen && (
                <div className="p-4 pt-2 border-t border-gray-100 bg-white animate-in slide-in-from-top-2">
                    <p className="text-sm text-gray-500 mb-4">{instruction}</p>
                    {details && <p className="text-xs text-gray-400 italic mb-4">{details}</p>}

                    <div className="grid grid-cols-3 gap-3">
                        {items.map((item) => {
                            const isSelected = (selections[category] || []).includes(item.id);
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => toggleSelection(category, item.id)}
                                    className={cn(
                                        "p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all aspect-square text-center relative overflow-hidden",
                                        isSelected
                                            ? "bg-green-50 border-green-500 shadow-sm"
                                            : "bg-white border-gray-100 hover:border-green-200"
                                    )}
                                >
                                    {isSelected && (
                                        <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                    <span className="text-[16px] mb-2 filter drop-shadow-sm leading-tight transition-transform transform group-hover:scale-110">
                                        {item.emoji}
                                    </span>
                                    <span className={cn("text-[10px] font-medium leading-tight", isSelected ? "text-green-900" : "text-gray-600")}>
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    {skipText && onSkip && (
                        <div className="mt-6 text-center">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onSkip();
                                }}
                                className="text-sm font-medium text-gray-400 hover:text-gray-600 underline underline-offset-4 transition-colors p-2"
                            >
                                {skipText}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export function MenuBuilderStep({ }: MenuBuilderStepProps) {
    const { menuBuilder } = APP_COPY.home;

    // State for selections 
    const [selections, setSelections] = useState<Record<string, string[]>>({});

    const toggleSelection = (category: string, itemId: string) => {
        setSelections(prev => {
            const current = prev[category] || [];
            if (current.includes(itemId)) {
                return { ...prev, [category]: current.filter(id => id !== itemId) };
            }
            return { ...prev, [category]: [...current, itemId] };
        });
    };

    const validateAndContinue = () => {
        const categories = [
            { id: "breakfast", label: "Desayuno" },
            { id: "lunch", label: "Almuerzo" },
            { id: "snack", label: "Merienda" }, // Enforcing for all as "3 de cada" is requested
            { id: "dinner", label: "Cena" }
        ];

        for (const cat of categories) {
            const count = (selections[cat.id] || []).length;
            if (count < 3) {
                const diff = 3 - count;
                toast.warning(`¡Oye! Te falta comida en el ${cat.label}.`, {
                    description: `Selecciona al menos ${diff} más para tener variedad.`
                });

                // Scroll to the specific section
                const element = document.getElementById(`section-${cat.id}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
                return;
            }
        }

        // Success - Scroll to next section
        const nextSection = document.getElementById("routine");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
            toast.success("¡Qué rico menú!", { description: "Ya casi terminamos." });
        }
    };

    return (
        <div className="p-6 animate-in fade-in duration-500 pb-0">
            <div className="flex justify-center mb-6">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 2
                </span>
            </div>
            <MealSection
                title={menuBuilder.breakfast.title}
                instruction={menuBuilder.breakfast.instruction}
                items={BREAKFAST_ITEMS}
                category="breakfast"
                selections={selections}
                toggleSelection={toggleSelection}
            />

            <MealSection
                title={menuBuilder.lunch.title}
                instruction={menuBuilder.lunch.instruction}
                items={LUNCH_ITEMS}
                category="lunch"
                selections={selections}
                toggleSelection={toggleSelection}
            />

            <MealSection
                title={menuBuilder.snack.title}
                instruction={menuBuilder.snack.instruction}
                items={BREAKFAST_ITEMS}
                category="snack"
                details={menuBuilder.snack.details}
                selections={selections}
                toggleSelection={toggleSelection}
            />

            <MealSection
                title={menuBuilder.dinner.title}
                instruction={menuBuilder.dinner.instruction}
                items={LUNCH_ITEMS}
                category="dinner"
                details={menuBuilder.dinner.details}
                selections={selections}
                toggleSelection={toggleSelection}
            />

            <AccordionMealSection
                title={menuBuilder.morningSnack.title}
                instruction={menuBuilder.morningSnack.instruction}
                items={MORNING_SNACK_ITEMS}
                category="morningSnack"
                optional={menuBuilder.morningSnack.optional}
                selections={selections}
                toggleSelection={toggleSelection}
                skipText="No quiero snack de la mañana"
                onSkip={validateAndContinue}
            />

            <div className="pb-10">
                <button
                    onClick={validateAndContinue}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    Siguiente Paso
                    <ArrowDown className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
