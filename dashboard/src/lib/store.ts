import { create } from "zustand";

interface ServerState {
   servers: Server[];
   loading: boolean;
   error: string | null;
   fetchServers: () => Promise<void>;
   fetchServersComplete: () => void;
}

interface Server {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  botOnline: boolean;
}

interface UserState {
  user: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  } | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

export const useServerStore = create<ServerState>((set) => ({
  servers: [],
  loading: false,
  error: null,
  fetchServers: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call to your bot's backend
      // const response = await fetch('/api/servers');
      // const data = await response.json();
      
      // Mock data for now
      const mockData: Server[] = [
        { 
          id: "1", 
          name: "Community Hub", 
          icon: "/server1.png", 
          memberCount: 254, 
          botOnline: true 
        },
        { 
          id: "2", 
          name: "Gaming Clan", 
          icon: "/server2.png", 
          memberCount: 89, 
          botOnline: false 
        },
        { 
          id: "3", 
          name: "Dev Squad", 
          icon: "/server3.png", 
          memberCount: 42, 
          botOnline: true 
        }
      ];
      
      set({ servers: mockData, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch servers", loading: false });
      console.error(err);
    }
  },
  fetchServersComplete: () => {}
}));

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would fetch user data after OAuth
      // const response = await fetch('/api/user');
      // const data = await response.json();
      
      // Mock data for now
      const mockUser = {
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "/avatar.jpg",
        initials: "AJ"
      };
      
      set({ user: mockUser, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch user", loading: false });
      console.error(err);
    }
  }
}));