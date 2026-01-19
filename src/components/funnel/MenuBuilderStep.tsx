import { APP_COPY, BREAKFAST_ITEMS, LUNCH_ITEMS } from "@/lib/constants";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MenuBuilderStepProps {
    // onNext removed
}

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

    const MealSection = ({
        title,
        instruction,
        items,
        category,
        details
    }: {
        title: string,
        instruction: string,
        items: { id: string, name: string, emoji: string }[],
        category: string,
        details?: string
    }) => (
        <div className="space-y-4 mb-10">
            <div className="sticky top-[73px] bg-slate-50/95 backdrop-blur py-2 z-10 border-b border-gray-100">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                        {(selections[category] || []).length} {menuBuilder.selectionCount}
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
                                    ? "bg-emerald-50 border-emerald-500 shadow-sm"
                                    : "bg-white border-gray-100 hover:border-emerald-200"
                            )}
                        >
                            {isSelected && (
                                <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                                    <Check className="w-3 h-3" />
                                </div>
                            )}
                            <span className="text-[16px] mb-2 filter drop-shadow-sm leading-tight transition-transform transform group-hover:scale-110">
                                {item.emoji}
                            </span>
                            <span className={cn("text-[10px] font-medium leading-tight", isSelected ? "text-emerald-900" : "text-gray-600")}>
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="p-6 animate-in fade-in duration-500 pb-0">
            <div className="flex justify-center mb-6">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 2
                </span>
            </div>
            <MealSection
                title={menuBuilder.breakfast.title}
                instruction={menuBuilder.breakfast.instruction}
                items={BREAKFAST_ITEMS}
                category="breakfast"
            />

            <MealSection
                title={menuBuilder.lunch.title}
                instruction={menuBuilder.lunch.instruction}
                items={LUNCH_ITEMS}
                category="lunch"
            />

            <MealSection
                title={menuBuilder.snack.title}
                instruction={menuBuilder.snack.instruction}
                items={BREAKFAST_ITEMS}
                category="snack"
                details={menuBuilder.snack.details}
            />

            <MealSection
                title={menuBuilder.dinner.title}
                instruction={menuBuilder.dinner.instruction}
                items={LUNCH_ITEMS}
                category="dinner"
                details={menuBuilder.dinner.details}
            />
        </div>
    );
}
