import { APP_COPY } from "@/lib/constants";
import { Dumbbell, Info, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoutineStepProps {
    // onNext removed
}

export function RoutineStep({ }: RoutineStepProps) {
    const { routine } = APP_COPY.home;
    const { options } = routine;

    // State
    const [activityLevel, setActivityLevel] = useState<string>("Sedentario");
    const [training, setTraining] = useState<string>("");
    const [chocolate, setChocolate] = useState<string>("");

    return (
        <div className="flex flex-col gap-8 p-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-10">
            <div className="flex justify-center -mb-4">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 3
                </span>
            </div>
            <div className="text-center space-y-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{routine.title}</h2>
                <p className="text-gray-500">{routine.subtitle}</p>
            </div>

            {/* Activity Level */}
            <div className="space-y-4">
                <label className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                    <Info className="w-6 h-6 text-emerald-500" />
                    {routine.questions.activity}
                </label>
                <div className="grid grid-cols-1 gap-2">
                    {options.activity.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActivityLevel(item.id)}
                            className={cn(
                                "p-4 rounded-xl border-2 text-left transition-all hover:bg-emerald-50/50",
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
                </div>
            </div>

            {/* Want Training */}
            <div className="space-y-4">
                <label className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                    <Dumbbell className="w-6 h-6 text-emerald-500" />
                    {routine.questions.training}
                </label>
                <div className="grid grid-cols-1 gap-2">
                    {options.training.map((option) => (
                        <button
                            key={option}
                            onClick={() => setTraining(option)}
                            className={cn(
                                "p-4 rounded-xl border-2 font-medium transition-all text-left",
                                training === option
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                    : "border-gray-100 text-gray-600 hover:border-emerald-200"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Want Chocolate */}
            <div className="space-y-4">
                <label className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                    <Heart className="w-6 h-6 text-pink-500" />
                    {routine.questions.chocolate}
                </label>
                <div className="grid grid-cols-1 gap-2">
                    {options.chocolate.map((option) => (
                        <button
                            key={option}
                            onClick={() => setChocolate(option)}
                            className={cn(
                                "p-4 rounded-xl border-2 font-medium transition-all text-left",
                                chocolate === option
                                    ? "border-pink-500 bg-pink-50 text-pink-700"
                                    : "border-gray-100 text-gray-600 hover:border-pink-200"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
