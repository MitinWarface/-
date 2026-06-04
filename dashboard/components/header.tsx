'use client';

import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";

export default function Header() {
  const { user, loading, fetchUser } = useUserStore();
  
  // In real app, this would be called automatically or on auth
  // useEffect(() => { fetchUser(); }, [fetchUser]);

  return (
    <header className="flex items-center justify-between border-b border-slate-800 px-6 py-3 bg-zinc-900">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/dashboard" className="text-slate-400 hover:text-cyan-400 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-600" />
        <span className="text-cyan-400 font-medium">Overview</span>
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-slate-400">API Connected</span>
        </div>

        <div className="h-6 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-200">
            {user?.initials || "U"}
          </div>
          <button className="p-2 hover:bg-slate-800 rounded transition-colors" title="Logout">
            <LogOut className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}