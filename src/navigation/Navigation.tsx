import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from '@/navigation/StackNavigation.tsx';
import {linking} from '@/navigation/linking.ts';

const Navigation: FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
