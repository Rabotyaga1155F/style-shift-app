import {ComponentType} from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export type TypeRootStackParamList = {
  HomePage: undefined;
  FavoritePage: undefined;
  ChatPage: undefined;
  ProfilePage: undefined;
  TabNavigation: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
  options?: NativeStackNavigationOptions;
}
