import { APP_COPY } from "@/lib/constants";
import { User, Flame, Clock, Utensils } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CalculatorStepProps {
    // onNext removed
}

export function CalculatorStep({ }: CalculatorStepProps) {
    const [gender, setGender] = useState<"male" | "female" | null>(null);
    const { calculator } = APP_COPY.home;

    return (
        <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 1
                </span>
            </div>
            <div className="text-center space-y-2">
                {/* Title removed per request */}
                {/* <h2 className="text-2xl font-bold text-gray-900">{calculator.title}</h2> */}
                <h3 className="text-lg font-semibold text-emerald-600">{calculator.subtitle}</h3>
                <p className="text-gray-500 text-sm">{calculator.description}</p>
            </div>

            {/* Gender Selection */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setGender("male")}
                    className={cn(
                        "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                        gender === "male"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-emerald-200 text-gray-600"
                    )}
                >
                    <User className="w-8 h-8" />
                    <span className="font-medium">{calculator.inputs.gender.male}</span>
                </button>
                <button
                    onClick={() => setGender("female")}
                    className={cn(
                        "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                        gender === "female"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-emerald-200 text-gray-600"
                    )}
                >
                    <User className="w-8 h-8" />
                    <span className="font-medium">{calculator.inputs.gender.female}</span>
                </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.weight}</label>
                        <input type="number" placeholder="70" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center font-bold text-gray-900" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.height}</label>
                        <input type="number" placeholder="170" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center font-bold text-gray-900" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.age}</label>
                        <input type="number" placeholder="25" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center font-bold text-gray-900" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.goal}</label>
                    <select className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-medium text-gray-900 bg-white">
                        {calculator.options.goals.map(goal => (
                            <option key={goal} value={goal}>{goal}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* New Interactive Sections */}
            <div className="space-y-4 pt-2">

                {/* Calories */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-semibold">
                        <Flame className="w-5 h-5 fill-orange-100" />
                        {calculator.sections.calories}
                    </div>
                    <select className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 bg-white">
                        {calculator.options.calories.map(cal => (
                            <option key={cal} value={cal}>{cal}</option>
                        ))}
                    </select>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-600 font-semibold">
                        <Clock className="w-5 h-5 fill-purple-100" />
                        {calculator.sections.schedule}
                    </div>
                    <select className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 bg-white text-sm">
                        {calculator.options.schedules.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
}
