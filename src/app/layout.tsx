import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nutrición Inteligente - Digital Nutritionist",
  description: "Tu dieta personalizada automatizada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "min-h-screen bg-slate-50 text-slate-900 antialiased")}>
        <main className="mx-auto max-w-md bg-white min-h-screen shadow-2xl overflow-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
