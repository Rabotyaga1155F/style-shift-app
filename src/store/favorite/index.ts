import {IProduct} from '@/types/product.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface IFavoriteState {
  products: IProduct[];
  toggleProduct: (id: IProduct) => void;
  clearFavorite: () => void;
}

export const useFavoriteStore = create<IFavoriteState>()(
  persist(
    set => ({
      products: [],
      toggleProduct: product =>
        set(state => {
          const hasProduct = state.products.some(
            item => item.id === product.id,
          );
          if (hasProduct) {
            return {
              products: [
                ...state.products.filter(item => item.id !== product.id),
              ],
            };
          }

          return {
            products: [...state.products, product],
          };
        }),
      clearFavorite: () =>
        set({
          products: [],
        }),
    }),
    {
      name: 'favorite-store',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
