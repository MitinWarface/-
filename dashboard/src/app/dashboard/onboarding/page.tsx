'use client';

import { Card, CardHeader as ShadcnCardHeader, CardContent } from '@/components/ui/card';
import { Button, UseFormSetError } from '@/components/ui/button';
import { Link } from 'next/link';
import { Loader } from '@/components/ui/loader';

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-slate-300 flex-col items-center justify-start p-6">
      <Card className="bg-zinc-800 border-slate-800 w-full max-w-2xl p-8">
        <ShadcnCardHeader>Bot Panel Onboarding</ShadcnCardHeader>
        <CardContent>
          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-xs text-cyan-400">TB</div>
              <h1 className="text-2xl font-bold text-cyan-400">Welcome to Bot Panel</h1>
              <p className="text-slate-400 text-lg max-w-md">
                Discover the full power of your Discord bot management interface.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 bg-cyan-400 rounded hover:bg-cyan-500 transition-colors">
                <span className="text-sm">Dashboard</span>
                <span className="animate-pulse text-xs">·</span>
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 px-6 py-3 rounded hover:bg-cyan-500 transition-colors">
                <span className="text-sm">Settings</span>
              </Link>
            </div>
            
            <div className="mt-10 flex flex-col gap-3">
              <h2 className="text-lg font-medium">Features</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-400">
                <li>Server Management</li>
                <li>Real-time Statistics</li>
                <li>Module Control</li>
                <li>Command Management</li>
                <li>Detailed Logging</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}