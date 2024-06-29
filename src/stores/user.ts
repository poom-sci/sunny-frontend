import { create } from "zustand";

interface User {
  id: string;
  uid: string;
  email: string;
  userName: string;
  displayImage: string | null;
  token: string;
  // expiresAt: number;
  isEmailVerified: boolean;
  color?: string;
  gender?: string;
  sunnyCategory?: string;
  age?: number;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  // isTokenExpired: () => boolean;
  logout: () => void;
}

const userStore = create<UserState>((set, get) => ({
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
          ...user
          // expiresAt: Date.now() + 1000 * 60 * 60 * 24,
          // isEmailVerified: user.isEmailVerified || false
        }
      };
    }),

  // isTokenExpired: () => {
  //   //   const user = get().user;
  //   //   if (user) {
  //   //     return Date.now() > user.expiresAt;
  //   //   }
  //   return true;
  // },

  logout: () =>
    set(() => {
      return {
        user: null
      };
    })
}));

export default userStore;
