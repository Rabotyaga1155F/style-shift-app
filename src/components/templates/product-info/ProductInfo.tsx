import React, {FC, useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, Alert} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import Layout from '@/components/layout/Layout.tsx';
import HeartTransparent from '@/assets/icons/heart/heart-transparent.svg';
import HeartRed from '@/assets/icons/heart/heart-red.svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';
import BagWhite from '@/assets/icons/bag/bag-white.svg';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

interface IProductInfoProps {
  product: any;
  toggleFavorite: any;
  isFavorite: any;
  user: any;
  navigation: any;
}

const ProductInfo: FC<IProductInfoProps> = ({
  product,
  user,
  navigation,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        StyleShift
      </RalewayText>
      <RalewayText className={'font-bold text-xl pt-8'}>
        {product.title}
      </RalewayText>
      <RalewayText className={'text-base pt-2'}>
        {product.categoryName}
      </RalewayText>
      <RalewayText className={'font-bold text-2xl pt-2'}>
        ₽{product.price}
      </RalewayText>
      <Image
        className={'mt-4'}
        height={200}
        source={{
          uri: product.imageUrl,
        }}
      />
      <RalewayText className={'pt-4 leading-5'}>
        {product.description}
      </RalewayText>
      <RalewayText className={'text-lg font-bold mt-6'}>
        ПРОДАВЕЦ: {product.sellerName}
      </RalewayText>
      <View className={'flex-row justify-around mt-32'}>
        <TouchableOpacity
          onPress={toggleFavorite}
          className={
            'bg-gray-300 rounded-full w-14 h-14 justify-center items-center'
          }>
          {isFavorite ? (
            <HeartRed height={DEFAULT_ICON_SIZE} width={DEFAULT_ICON_SIZE} />
          ) : (
            <HeartTransparent
              height={DEFAULT_ICON_SIZE}
              width={DEFAULT_ICON_SIZE}
            />
          )}
        </TouchableOpacity>
        {user?.userID !== product.sellerID ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateOrderPage', {product})}
            className={
              'bg-matule-blue rounded-md flex-row justify-center items-center w-52'
            }>
            <BagWhite />
            <RalewayText weight={600} className={'text-white text-sm pl-3'}>
              Создать заказ
            </RalewayText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProductPage', {product})}
            className={
              'bg-gray-700 rounded-md justify-center items-center w-52'
            }>
            <RalewayText weight={600} className={'text-white text-sm pl-3'}>
              Изменить
            </RalewayText>
          </TouchableOpacity>
        )}
      </View>
    </Layout>
  );
};

export default ProductInfo;
