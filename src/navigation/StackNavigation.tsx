import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TypeRootStackParamList} from '@/navigation/navigation.types.ts';
import TabNavigation from '@/navigation/TabNavigation.tsx';
import {routes} from '@/navigation/routes.ts';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator<TypeRootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{headerShown: false}}>
      {routes.map(item => (
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
      <Stack.Screen name={'TabNavigation'} component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
