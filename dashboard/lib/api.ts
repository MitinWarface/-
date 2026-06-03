import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001/api';

export const botApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchServerStats = (serverId: string) => 
  botApi.get(`/servers/${serverId}/stats`);

export const fetchServerLogs = (serverId: string) => 
  botApi.get(`/servers/${serverId}/logs`);

export const fetchServerActivity = (serverId: string) => 
  botApi.get(`/servers/${serverId}/activity`);

export const fetchModules = (serverId: string) => 
  botApi.get(`/servers/${serverId}/modules`);

export const updateModule = (serverId: string, moduleId: string, enabled: boolean) => 
  botApi.patch(`/servers/${serverId}/modules/${moduleId}`, { enabled });

export const fetchSettings = (serverId: string) => 
  botApi.get(`/servers/${serverId}/settings`);

export const updateSettings = (serverId: string, settings: any) => 
  botApi.patch(`/servers/${serverId}/settings`, settings);

export const fetchCommands = (serverId: string) => 
  botApi.get(`/servers/${serverId}/commands`);

export const createCommand = (serverId: string, command: any) => 
  botApi.post(`/servers/${serverId}/commands`, command);