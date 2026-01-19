"use client";

import { Header } from "@/components/layout/Header";
import { CalculatorStep } from "@/components/funnel/CalculatorStep";
import { MenuBuilderStep } from "@/components/funnel/MenuBuilderStep";
import { RoutineStep } from "@/components/funnel/RoutineStep";
import { OfferStep } from "@/components/funnel/OfferStep";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/planos");
  };

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
