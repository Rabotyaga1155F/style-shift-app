import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TypeRootStackParamList} from '@/navigation/navigation.types.ts';
import TabNavigation from '@/navigation/TabNavigation.tsx';
import {routes} from '@/navigation/routes.ts';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator<TypeRootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'TabNavigation'} component={TabNavigation} />

      {routes.map(item => (
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigation;
