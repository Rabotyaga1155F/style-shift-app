import React, {FC, SVGProps} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TypeRootStackParamList} from '@/navigation/navigation.types.ts';
import {View} from 'react-native';
import HomePage from '@/components/pages/home/Home.tsx';
import FavoritePage from '@/components/pages/favorite/Favorite.tsx';
import ChatPage from '@/components/pages/chat/Chat.tsx';
import ProfilePage from '@/components/pages/profile/Profile.tsx';
import HomeActiveIcon from '@/assets/icons/home/home-blue.svg';
import HomeDisableIcon from '@/assets/icons/home/home-gray.svg';
import FavoriteActiveIcon from '@/assets/icons/favorite/favorite-blue.svg';
import FavoriteDisableIcon from '@/assets/icons/favorite/favorite-gray.svg';
import ChatActiveIcon from '@/assets/icons/message/message-blue.svg';
import ChatDisableIcon from '@/assets/icons/message/message-gray.svg';
import ProfileActiveIcon from '@/assets/icons/profile/profile-blue.svg';
import ProfileDisableIcon from '@/assets/icons/profile/profile-gray.svg';

import {SvgProps} from 'react-native-svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';

const TabNavigation: FC = () => {
  const Tab = createBottomTabNavigator<TypeRootStackParamList>();

  const renderItem = (
    focused: boolean,
    ActiveIcon: FC<SvgProps>,
    DisableIcon: FC<SvgProps>,
  ) =>
    focused ? (
      <ActiveIcon height={DEFAULT_ICON_SIZE} width={DEFAULT_ICON_SIZE} />
    ) : (
      <DisableIcon height={DEFAULT_ICON_SIZE} width={DEFAULT_ICON_SIZE} />
    );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          options={{
            title: '',
            tabBarIcon: ({focused}) =>
              renderItem(focused, HomeActiveIcon, HomeDisableIcon),
            tabBarIconStyle: {marginTop: 5},
          }}
          name={'HomePage'}
          component={HomePage}
        />
        <Tab.Screen
          options={{
            title: '',
            tabBarIcon: ({focused}) =>
              renderItem(focused, FavoriteActiveIcon, FavoriteDisableIcon),
            tabBarIconStyle: {marginTop: 5},
          }}
          name={'FavoritePage'}
          component={FavoritePage}
        />
        <Tab.Screen
          options={{
            title: '',
            tabBarIcon: ({focused}) =>
              renderItem(focused, ChatActiveIcon, ChatDisableIcon),
            tabBarIconStyle: {marginTop: 5},
          }}
          name={'ChatPage'}
          component={ChatPage}
        />
        <Tab.Screen
          options={{
            title: '',
            tabBarIcon: ({focused}) =>
              renderItem(focused, ProfileActiveIcon, ProfileDisableIcon),
            tabBarIconStyle: {marginTop: 5},
          }}
          name={'ProfilePage'}
          component={ProfilePage}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigation;
