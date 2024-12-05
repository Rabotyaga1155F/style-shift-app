import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {IUser} from '@/types/user.types.ts';

interface IAuthTokenState {
  user: IUser | null;
  saveUser: (user: IUser) => void;
  removeUser: () => void;
}

export const useAuthUserStore = create<IAuthTokenState>()(
  persist(
    set => ({
      user: null,
      saveUser: user =>
        set({
          user: user,
        }),
      removeUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: 'auth-user-store',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
