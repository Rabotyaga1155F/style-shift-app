import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface IAuthTokenState {
  token: string;
  saveToken: (accessToken: string) => void;
  removeToken: () => void;
}

export const useAuthTokenStore = create<IAuthTokenState>()(
  persist(
    set => ({
      token: '',
      saveToken: accessToken =>
        set({
          token: accessToken,
        }),
      removeToken: () =>
        set({
          token: '',
        }),
    }),
    {
      name: 'auth-token-store',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
