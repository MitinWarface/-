'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useServerStore } from '@/lib/store';
import { Home, Settings, Box, Command } from 'lucide-react';

export default function Sidebar() {
  const { servers, fetchServers } = useServerStore();

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  return (
    <nav className="w-64 bg-zinc-900 border-r border-slate-800 flex flex-col p-4">
      <div className="mb-8 text-center">
        <div className="mx-auto h-10 w-10 bg-cyan-400 rounded-lg flex items-center justify-center text-zinc-900 font-bold">TB</div>
      </div>
      <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800">
        <Home className="h-5 w-5 text-cyan-400" />
        <span className="font-medium">Servers</span>
      </Link>
      <Link href="/dashboard/settings" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800">
        <Settings className="h-5 w-5 text-cyan-400" />
        <span className="font-medium">Settings</span>
      </Link>
      <Link href="/dashboard/modules" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800">
        <Box className="h-5 w-5 text-cyan-400" />
        <span className="font-medium">Modules</span>
      </Link>
      <Link href="/dashboard/commands" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800">
        <Command className="h-5 w-5 text-cyan-400" />
        <span className="font-medium">Commands</span>
      </Link>
    </nav>
  );
}