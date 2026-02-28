"use client";

import { APP_COPY } from "@/lib/constants";
import { User, Flame, Clock, Loader2, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";

interface CalculatorStepProps { }

export function CalculatorStep({ }: CalculatorStepProps) {
    const { calculator } = APP_COPY.home;
    const [gender, setGender] = useState<string | null>(null);
    const [goal, setGoal] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [calories, setCalories] = useState<string>("");
    const [schedule, setSchedule] = useState<string>("");

    const [userId, setUserId] = useState<string | null>(null);

    // Initialize state from Firestore if available
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.gender) setGender(data.gender);
                        if (data.goal) setGoal(data.goal);
                        if (data.weight) setWeight(data.weight);
                        if (data.height) setHeight(data.height);
                        if (data.age) setAge(data.age);
                        if (data.calories) setCalories(data.calories);
                        if (data.schedule) setSchedule(data.schedule);
                    }
                } catch (error) {
                    console.error("Error loading user data:", error);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const saveToFirestore = async (field: string, value: any) => {
        const uid = userId || auth.currentUser?.uid;
        if (!uid) {
            console.warn("CalculatorStep: No user ID provided for saving", field);
            return;
        }

        try {
            console.log(`CalculatorStep: Saving ${field} = ${value} for user ${uid}`);
            await setDoc(doc(db, "users", uid), {
                [field]: value
            }, { merge: true });
        } catch (error) {
            console.error(`Error saving ${field}:`, error);
        }
    };

    const handleGenderSelect = (selectedGender: string) => {
        setGender(selectedGender);
        saveToFirestore("gender", selectedGender);
    };

    const handleGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGoal(value);
        saveToFirestore("goal", value);
    };

    const handleInputChange = (setter: any, field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setter(value);
        saveToFirestore(field, value);
    };

    const validateAndContinue = () => {
        const errors = [];
        if (!gender) errors.push("Género");
        if (!weight) errors.push("Peso");
        if (!height) errors.push("Estatura");
        if (!age) errors.push("Edad");
        if (!goal) errors.push("Objetivo");
        if (!calories) errors.push("Calorías");
        if (!schedule) errors.push("Horario");

        if (errors.length > 0) {
            toast.error("¡Epa! Te faltan datos importantes.", {
                description: "Completa todos los campos para continuar."
            });
            // Focus on first empty field logic could go here, for now simpler scroll to top of this section if needed, 
            // but the inputs are all here.
            return;
        }

        // Success - Scroll to next section
        const nextSection = document.getElementById("menu");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
            toast.success("¡Perfecto!", { description: "Ahora armemos tu menú." });
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 1
                </span>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-emerald-600">{calculator.subtitle}</h3>
                <p className="text-gray-500 text-sm">{calculator.description}</p>
            </div>

            {/* Gender Selection */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => handleGenderSelect("male")}
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
                    onClick={() => handleGenderSelect("female")}
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
                        <input
                            type="number"
                            placeholder="70"
                            value={weight}
                            onChange={handleInputChange(setWeight, "weight")}
                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center font-bold text-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.height}</label>
                        <input
                            type="number"
                            placeholder="170"
                            value={height}
                            onChange={handleInputChange(setHeight, "height")}
                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center font-bold text-gray-900"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.age}</label>
                        <input
                            type="number"
                            placeholder="25"
                            value={age}
                            onChange={handleInputChange(setAge, "age")}
                            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center font-bold text-gray-900"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">{calculator.inputs.goal}</label>
                    <select
                        value={goal}
                        onChange={handleGoalChange}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-medium text-gray-900 bg-white"
                    >
                        <option value="" disabled>Selecciona un objetivo</option>
                        {calculator.options.goals.map(optionGoal => (
                            <option key={optionGoal} value={optionGoal}>{optionGoal}</option>
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
                    <select
                        value={calories}
                        onChange={handleInputChange(setCalories, "calories")}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 bg-white"
                    >
                        <option value="" disabled>Selecciona calorías</option>
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
                    <select
                        value={schedule}
                        onChange={handleInputChange(setSchedule, "schedule")}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 bg-white text-sm"
                    >
                        <option value="" disabled>Selecciona un horario</option>
                        {calculator.options.schedules.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="pt-4">
                <button
                    onClick={validateAndContinue}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    Siguiente Paso
                    <ArrowDown className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
