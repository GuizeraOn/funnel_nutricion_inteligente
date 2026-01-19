import { APP_COPY } from "@/lib/constants";
import { LogOut, Menu } from "lucide-react";

export function Header() {
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <div className="font-bold text-xl text-emerald-600 tracking-tight">
                    {APP_COPY.header.logo}
                </div>
                <nav className="hidden sm:flex gap-4 text-sm font-medium text-gray-600">
                    {APP_COPY.header.menu.map((item) => (
                        <a key={item} href="#" className="hover:text-emerald-600 transition-colors">
                            {item}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-gray-500 hover:text-red-500 flex items-center gap-2">
                    <span className="hidden sm:inline">{APP_COPY.header.logout}</span>
                    <LogOut className="w-4 h-4" />
                </button>

                {/* Mobile Menu Trigger - visual only since no specific mobile menu requirement in copy */}
                <button className="sm:hidden text-gray-600">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
