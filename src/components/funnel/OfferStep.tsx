import { APP_COPY } from "@/lib/constants";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";

interface OfferStepProps {
    onNext: () => void;
}

export function OfferStep({ onNext }: OfferStepProps) {
    const { offer } = APP_COPY.home;

    return (
        <div className="flex flex-col gap-6 p-6 animate-in zoom-in-95 duration-500 pb-10">


            <div className="flex justify-center -mb-4">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Fase 4
                </span>
            </div>

            <div className="text-center space-y-2 mt-2">
                <h2 className="text-3xl font-extrabold text-emerald-800 tracking-tight">{offer.title}</h2>
                <p className="text-lg text-gray-600 font-medium">{offer.subtitle}</p>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100 border border-emerald-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    OFERTA
                </div>

                <div className="text-center mb-6">
                    <p className="text-gray-500 text-sm mb-1">{offer.priceSub}</p>
                    <div className="text-2xl font-bold text-gray-900">
                        {/* Keep text exactly but format visually - assuming user wants the exact text string as per instructions */}
                        {offer.priceText.replace("[Moneda Local]", "$2")}
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <h3 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wider border-b pb-2 border-gray-100">Recibirás:</h3>
                    {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onNext}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                    {offer.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs font-medium">
                    <Lock className="w-3 h-3" />
                    {offer.secure}
                </div>
            </div>
        </div>
    );
}
