import { create } from 'zustand';
import Auth from './auth';

const useStore = create((set) => ({
  loggedIn: Auth.loggedIn(),
  login: () => set((state) => ({ loggedIn: true })),
  logout: () => set((state) => ({ loggedIn: false }))
}));

export { useStore };
