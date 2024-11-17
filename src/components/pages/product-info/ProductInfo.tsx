import React, {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import Layout from '@/components/layout/Layout.tsx';
import HeartTransparent from '@/assets/icons/heart/heart-transparent.svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';
import BagWhite from '@/assets/icons/bag/bag-white.svg';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

const ProductInfo: FC = () => {
  const route = useTypedRoute<'ProductInfo'>();
  const navigation = useTypedNavigation();

  const product = route.params.product;

  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        StyleShift
      </RalewayText>
      <RalewayText className={'font-bold text-xl pt-8'}>
        {product.title}
      </RalewayText>
      <RalewayText className={'text-base pt-2'}>{product.category}</RalewayText>
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
          className={
            'bg-gray-300 rounded-full w-14 h-14 justify-center items-center'
          }>
          <HeartTransparent
            height={DEFAULT_ICON_SIZE}
            width={DEFAULT_ICON_SIZE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateOrderPage', {product})}
          className={
            'bg-matule-blue  rounded-md flex-row justify-center  items-center w-52'
          }>
          <BagWhite />
          <RalewayText weight={600} className={'text-white text-sm pl-3'}>
            Создать заказ
          </RalewayText>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default ProductInfo;
