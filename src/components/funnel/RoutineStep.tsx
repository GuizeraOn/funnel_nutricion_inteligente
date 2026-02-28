"use client";

import { APP_COPY } from "@/lib/constants";
import { Dumbbell, Info, Heart, ArrowDown, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RoutineStepProps {
    // onNext removed
}

type AccordionKey = "activity" | "training" | "chocolate";

export function RoutineStep({ }: RoutineStepProps) {
    const { routine } = APP_COPY.home;
    const { options } = routine;

    // State
    const [activityLevel, setActivityLevel] = useState<string>("");
    const [training, setTraining] = useState<string>("");
    const [chocolate, setChocolate] = useState<string>("");
    const [openSection, setOpenSection] = useState<AccordionKey>("activity");

    const handleActivitySelect = (id: string) => {
        setActivityLevel(id);
        setTimeout(() => setOpenSection("training"), 300);
    };

    const handleTrainingSelect = (option: string) => {
        setTraining(option);
        setTimeout(() => setOpenSection("chocolate"), 300);
    };

    const handleChocolateSelect = (option: string) => {
        setChocolate(option);
    };

    const validateAndContinue = () => {
        const errors = [];
        if (!activityLevel) errors.push("Nivel de actividad");
        if (!training) errors.push("Entrenamiento");
        if (!chocolate) errors.push("Chocolate / Dulce");

        if (errors.length > 0) {
            toast.warning("¡Casi listo!", { description: "Responde todas las preguntas de rutina." });
            return;
        }

        // Success - Scroll to next section
        const nextSection = document.getElementById("offer");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
            toast.success("¡Todo listo!", { description: "Mira tu dieta personalizada." });
        }
    };

    const AccordionItem = ({
        id,
        icon,
        label,
        selectedLabel,
        isOpen,
        onToggle,
        children,
        accentColor = "emerald",
    }: {
        id: AccordionKey;
        icon: React.ReactNode;
        label: string;
        selectedLabel?: string;
        isOpen: boolean;
        onToggle: () => void;
        children: React.ReactNode;
        accentColor?: "emerald" | "pink";
    }) => {
        const isAnswered = !!selectedLabel;
        const colorMap = {
            emerald: {
                badge: "bg-emerald-50 border-emerald-300",
                badgeText: "text-emerald-700",
                checkBg: "bg-emerald-500",
                header: isOpen ? "border-emerald-400 bg-emerald-50/40" : isAnswered ? "border-emerald-200 bg-white" : "border-gray-200 bg-white",
            },
            pink: {
                badge: "bg-pink-50 border-pink-300",
                badgeText: "text-pink-700",
                checkBg: "bg-pink-500",
                header: isOpen ? "border-pink-400 bg-pink-50/40" : isAnswered ? "border-pink-200 bg-white" : "border-gray-200 bg-white",
            },
        };
        const colors = colorMap[accentColor];

        return (
            <div className={cn(
                "rounded-2xl border-2 overflow-hidden transition-all duration-300",
                colors.header
            )}>
                {/* Header */}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="shrink-0">{icon}</span>
                        <div className="flex flex-col min-w-0">
                            <span className={cn("font-semibold text-base leading-tight", isAnswered ? "text-gray-700" : "text-gray-800")}>
                                {label}
                            </span>
                            {isAnswered && !isOpen && (
                                <span className={cn(
                                    "text-xs font-medium mt-0.5 truncate",
                                    colors.badgeText
                                )}>
                                    {selectedLabel}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {isAnswered && (
                            <span className={cn("w-5 h-5 rounded-full flex items-center justify-center", colors.checkBg)}>
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </span>
                        )}
                        <ChevronDown
                            className={cn(
                                "w-5 h-5 text-gray-400 transition-transform duration-300",
                                isOpen && "rotate-180"
                            )}
                        />
                    </div>
                </button>

                {/* Body */}
                <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}>
                    <div className="overflow-hidden">
                        <div className="px-5 pb-5 pt-1 flex flex-col gap-2">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-5 p-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-0">
            <div className="flex justify-center -mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 3
                </span>
            </div>
            <div className="text-center space-y-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{routine.title}</h2>
                <p className="text-gray-500">{routine.subtitle}</p>
            </div>

            {/* Accordion: Activity Level */}
            <AccordionItem
                id="activity"
                icon={<Info className="w-6 h-6 text-emerald-500" />}
                label={routine.questions.activity}
                selectedLabel={options.activity.find(a => a.id === activityLevel)?.label}
                isOpen={openSection === "activity"}
                onToggle={() => setOpenSection(openSection === "activity" ? "training" : "activity")}
                accentColor="emerald"
            >
                {options.activity.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleActivitySelect(item.id)}
                        className={cn(
                            "p-4 rounded-xl border-2 text-left transition-all hover:bg-emerald-50/50 w-full",
                            activityLevel === item.id
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-100 bg-white hover:border-emerald-200"
                        )}
                    >
                        <div className={cn("font-bold text-base", activityLevel === item.id ? "text-emerald-700" : "text-gray-700")}>
                            {item.label}
                        </div>
                        <div className={cn("text-xs", activityLevel === item.id ? "text-emerald-600 font-medium" : "text-gray-400")}>
                            {item.sub}
                        </div>
                    </button>
                ))}
            </AccordionItem>

            {/* Accordion: Training */}
            <AccordionItem
                id="training"
                icon={<Dumbbell className="w-6 h-6 text-emerald-500" />}
                label={routine.questions.training}
                selectedLabel={training || undefined}
                isOpen={openSection === "training"}
                onToggle={() => setOpenSection(openSection === "training" ? "activity" : "training")}
                accentColor="emerald"
            >
                {options.training.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleTrainingSelect(option)}
                        className={cn(
                            "p-4 rounded-xl border-2 font-medium transition-all text-left w-full",
                            training === option
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-100 text-gray-600 hover:border-emerald-200 bg-white"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </AccordionItem>

            {/* Accordion: Chocolate */}
            <AccordionItem
                id="chocolate"
                icon={<Heart className="w-6 h-6 text-pink-500" />}
                label={routine.questions.chocolate}
                selectedLabel={chocolate || undefined}
                isOpen={openSection === "chocolate"}
                onToggle={() => setOpenSection(openSection === "chocolate" ? "activity" : "chocolate")}
                accentColor="pink"
            >
                {options.chocolate.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleChocolateSelect(option)}
                        className={cn(
                            "p-4 rounded-xl border-2 font-medium transition-all text-left w-full",
                            chocolate === option
                                ? "border-pink-500 bg-pink-50 text-pink-700"
                                : "border-gray-100 text-gray-600 hover:border-pink-200 bg-white"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </AccordionItem>

            <div className="pb-10 pt-4">
                <button
                    onClick={validateAndContinue}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    Ver Mi Plan
                    <ArrowDown className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
