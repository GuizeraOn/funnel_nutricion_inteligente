"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { CalculatorStep } from "@/components/funnel/CalculatorStep";
import { MenuBuilderStep } from "@/components/funnel/MenuBuilderStep";
import { RoutineStep } from "@/components/funnel/RoutineStep";
import { OfferStep } from "@/components/funnel/OfferStep";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleCheckout = () => {
    router.push("/planos");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) return null; // Prevent flash of content before redirect completes

  return (
    <>
      <Header />
      <main className="flex-1 bg-white flex flex-col gap-0 pb-10">
        <section id="calculator">
          <CalculatorStep />
        </section>

        <div className="w-full h-2 bg-slate-50 border-y border-slate-100" />

        <section id="menu">
          <MenuBuilderStep />
        </section>

        <div className="w-full h-2 bg-slate-50 border-y border-slate-100" />

        <section id="routine">
          <RoutineStep />
        </section>

        <div className="w-full h-2 bg-slate-50 border-y border-slate-100" />

        <section id="offer">
          <OfferStep onNext={handleCheckout} />
        </section>
      </main>
    </>
  );
}
