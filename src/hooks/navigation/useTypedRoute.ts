import {TypeRootStackParamList} from '@/navigation/navigation.types.ts';
import {RouteProp, useRoute} from '@react-navigation/native';

export const useTypedRoute = <T extends keyof TypeRootStackParamList>() => {
  return useRoute<RouteProp<TypeRootStackParamList, T>>();
};
