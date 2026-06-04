'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchServerStats, fetchServerLogs, fetchServerActivity, fetchModules } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader as ShadcnCardHeader } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useServerStore } from '@/lib/store';
import { get as redisGet, setex as redisSet } from '@/lib/postgresCache';

type Stat = { label: string; value: string };
type Action = { name: string; time: string };
type Module = { id: string; name: string; enabled: boolean; description: string };
type LogEntry = { action: string; timestamp: string };

export default async function Overview() {
  const { id } = useParams<{ id: string }>();
  const [serverId] = useState(id);
  const { servers, fetchServersComplete } = useServerStore();

  const loadServerData = async () => {
    const [statsRes, logsRes, activityRes, modulesRes] = await Promise.all([
      fetchServerStats(serverId),
      fetchServerLogs(serverId),
      fetchServerActivity(serverId),
      fetchModules(serverId)
    ]);
    
    const stats = statsRes.data;
    const logs = logsRes.data;
    const activity = activityRes.data;
    const modules = modulesRes.data;

    // Cache to Redis
    const cacheKey = `server:${serverId}:all`;
     await redisSet(cacheKey, 600, { stats, logs, activity, modules });
  };

  useEffect(() => {
    if (serverId) {
      loadServerData();
      fetchServersComplete();
    }
  }, [serverId, fetchServersComplete]);

  if (!serverId) return <div>Loading...</div>;

  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  const [modules, setModules] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCached = async () => {
       const cached = await redisGet<any>(`server:${serverId}:all`);
      if (cached) {
        setStats(cached.stats);
        setLogs(cached.logs);
        setActivity(cached.activity);
        setModules(cached.modules);
        setLoading(false);
      }
    };
    loadCached();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[stats?.members, stats?.messagesToday, stats?.ping, stats?.uptime].map((value, i) => (
          <KeyedCard key={i} value={value} label={[ 'Members', 'Messages Today', 'Bot Ping', 'Uptime' ][i] || 'N/A' } />
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => console.log('Reload config')}>Reload Config</Button>
        <Button variant="destructive" onClick={() => console.log('Disable bot')}>Disable Bot</Button>
      </div>

      {/* Recent actions table */}
      <Card className="bg-zinc-800 border-slate-800">
        <ShadcnCardHeader>Recent Actions</ShadcnCardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[logs || []].slice(0, 5).map((log: LogEntry) => (
                <TableRow key={log.action}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-right text-slate-400">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modules grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {[modules || []].map((module: Module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Skeleton className="w-16 h-8 mb-2" />
      <Skeleton className="w-8 h-8 mb-2" />
      <Skeleton className="w-8 h-8" />
      <div className="text-slate-300">Loading server data...</div>
    </div>
  );
}

function KeyedCard(props: { value: string; label: string }) {
  return (
    <Card className="bg-zinc-800 border-slate-800">
      <CardContent className="flex flex-col items-center py-6">
        <span className="text-2xl font-medium text-cyan-400">{props.value}</span>
        <span className="text-sm text-slate-400 mt-1">{props.label}</span>
      </CardContent>
    </Card>
  );
}

function KernelCard(props: { module: Module }) {
  return (
    <Card className="bg-zinc-800 border-slate-800">
      <CardContent className="p-4">
        <strong className="text-slate-300 block mb-1">{props.module.name}</strong>
        <span className={`${props.module.enabled ? 'text-green-400' : 'text-red-400'} font-medium`}>
          {props.module.enabled ? 'Active' : 'Disabled'}
        </span>
        <div className="flex items-center justify-between mt-2">
           <span className="text-xs text-slate-400">{props.module.description}</span>
           <Switch checked={props.module.enabled} onChange={(e) => handleToggle(props.module.id)} />
        </div>
      </CardContent>
    </Card>
  );
}

function ModuleCard(props: { module: Module }) {
  return (
    <KernelCard {...props} />
  );
}

function handleToggle(moduleId: string) {
  // Implementation would call updateModule API
  console.log('Toggle module', moduleId);
}