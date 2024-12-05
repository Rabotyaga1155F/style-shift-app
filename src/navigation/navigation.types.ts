import {ComponentType} from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {IProduct} from '@/types/product.types.ts';

export type TypeRootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  HomePage: undefined;
  FavoritePage: undefined;
  ChatPage: undefined;
  ProfilePage: undefined;
  TabNavigation: undefined;
  ProductInfo: {product: IProduct};
  SalePage: undefined;
  OrderHistoryPage: undefined;
  CreateOrderPage: {product: IProduct};
  AddProductPage: undefined;
  EditProductPage: {product: IProduct};
  SellerProductsPage: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
  options?: NativeStackNavigationOptions;
}
