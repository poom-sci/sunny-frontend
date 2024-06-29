import { create } from "zustand";

interface UserState {
  user: {
    id: string;
    uid: string;
    email: string;
    userName: string;
    displayImage: string | null;
    token: string;
    expiresAt: number;
    isEmailVerified: boolean;
    color: string;
    gender: string;
    sunnyCategory: string;
    age: number;
  } | null;
  isLoading: boolean;

  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: {
    id: string;
    email: string;
    userName: string;
    displayImage: string | null;
    uid: string;
    token: string;
    isEmailVerified?: boolean;
    color: string;
    age: number;
    gender: string;
    sunnyCategory: string;
  }) => void;
  isTokenExpired: () => boolean;
  logout: () => void;
}

const userStore = create<UserState>()((set, get) => ({
  user: null,
  isLoading: false,

  setIsLoading: (isLoading) =>
    set(() => {
      return {
        isLoading
      };
    }),
  setUser: (user) =>
    set(() => {
      return {
        user: {
          ...user,
          expiresAt: Date.now() + 1000 * 60 * 60 * 24,
          isEmailVerified: user.isEmailVerified || false
        }
      };
    }),
  isTokenExpired: () => {
    const user = get().user;
    if (user) {
      return Date.now() > user.expiresAt;
    }
    return true;
  },
  logout: () =>
    set((state) => {
      return {
        user: null
      };
    })
}));

export default userStore;
