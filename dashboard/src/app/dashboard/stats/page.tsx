'use client';

import { useEffect, useState } from 'react';
import { useServerStore } from '@/lib/store';
import { fetchServerStats } from '@/lib/api';
import { Card, CardHeader as ShadcnCardHeader, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader } from '@/components/ui/loader';
import { useParams } from 'next/navigation';

type StatsData = {
  date: string;
  members: number;
  messages: number;
  commands: number;
};

export default function StatsPage() {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<StatsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      // Real API call would replace this mock data
      const mockStats: StatsData[] = [
        { date: '2024-01-01', members: 150, messages: 1200, commands: 45 },
        { date: '2024-01-02', members: 155, messages: 1350, commands: 52 },
        { date: '2024-01-03', members: 160, messages: 1400, commands: 58 },
        { date: '2024-01-04', members: 165, messages: 1500, commands: 60 },
        { date: '2024-01-05', members: 170, messages: 1600, commands: 65 },
        { date: '2024-01-06', members: 175, messages: 1700, commands: 70 },
        { date: '2024-01-07', members: 180, messages: 1800, commands: 75 },
      ];
      
      setStats(mockStats);
      setLoading(false);
    };
    
    loadStats();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <Card className="min-h-full">
        <ShadcnCardHeader>Statistics Dashboard</ShadcnCardHeader>
        <CardContent className="p-4">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-xl font-medium mb-2">Server Statistics</h1>
              <p className="text-slate-400">Detailed metrics and analytics</p>
            </div>
            
            {stats.length > 0 ? (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="members" fill="#06b6d4" />
                    <Bar dataKey="messages" fill="#8b5cf6" />
                    <Bar dataKey="commands" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 rounded-lg bg-zinc-800">
                <Loader />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}