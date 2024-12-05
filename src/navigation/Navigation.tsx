import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from '@/navigation/StackNavigation.tsx';

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
