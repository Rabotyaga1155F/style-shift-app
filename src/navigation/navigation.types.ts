import {ComponentType} from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {IProduct} from '@/types/product.types.ts';

export type TypeRootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  HomePage: undefined;
  FavoritePage: undefined;
  SupportPage: undefined;
  ProfilePage: undefined;
  TabNavigation: undefined;
  ProductInfo: {product: IProduct};
  SalePage: undefined;
  OrderHistoryPage: undefined;
  OrderHistoryInfoPage: {order: any};
  CreateOrderPage: {product: IProduct; quantity: number; size: string};
  AddProductPage: undefined;
  EditProductPage: {product: IProduct};
  SellerProductsPage: undefined;
  StyleSelectionPage: undefined;
  ForgotPasswordPage: undefined;
  NewPasswordPage: {email: string; code: string};
  ForgotPasswordCode: {email: string};
  SaleStatsPage: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
  options?: NativeStackNavigationOptions;
}
