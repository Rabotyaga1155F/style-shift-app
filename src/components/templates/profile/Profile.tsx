import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import {testUser} from '../../../test-data/user-test.ts';
import BagWhite from '@/assets/icons/bag/bag-white.svg';
import HeartWhite from '@/assets/icons/heart/heart-white.svg';
import OrderWhite from '@/assets/icons/order/oder-white.svg';
import SignOutWhite from '@/assets/icons/sign-out/sign-out.svg';
import SettingsWhite from '@/assets/icons/settings/settings.svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';

interface IProfileProps {
  user: any;
  navigation: any;
  removeUser: any;
}

const Profile: FC<IProfileProps> = ({user, navigation, removeUser}) => {
  return (
    <Layout className={'bg-matule-blue'}>
      <RalewayText
        weight={600}
        className={'text-lg text-center mt-10 text-white'}>
        Профиль
      </RalewayText>
      <View className={'flex-row items-center mt-8 mb-12'}>
        <Image
          className={'w-16 h-16'}
          source={require('../../../assets/images/avatar.png')}
        />
        <RalewayText className={'font-bold text-xl pl-4 text-white '}>
          {user?.username}
        </RalewayText>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('FavoritePage')}
        className={'flex-row items-center my-3'}>
        <HeartWhite width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />
        <RalewayText weight={500} className={'text-lg text-white pl-3'}>
          Избранное
        </RalewayText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderHistoryPage')}
        className={'flex-row items-center my-3'}>
        <OrderWhite width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />
        <RalewayText weight={500} className={'text-lg text-white pl-3'}>
          Заказы
        </RalewayText>
      </TouchableOpacity>
      {user?.verification && (
        <TouchableOpacity
          onPress={() => navigation.navigate('SellerProductsPage')}
          className={'flex-row items-center my-3'}>
          <OrderWhite width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />
          <RalewayText weight={500} className={'text-lg text-white pl-3'}>
            Мои товары
          </RalewayText>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('SalePage')}
        className={'flex-row items-center my-3'}>
        <SettingsWhite width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />
        <RalewayText weight={500} className={'text-lg text-white pl-3'}>
          Статус продавца
        </RalewayText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('SignIn');
          removeUser();
        }}
        className={'flex-row items-center my-3'}>
        <SignOutWhite width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />
        <RalewayText weight={500} className={'text-lg text-white pl-3'}>
          Выход
        </RalewayText>
      </TouchableOpacity>
    </Layout>
  );
};

export default Profile;
