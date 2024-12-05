import React, {FC, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import HeartTransparent from '@/assets/icons/heart/heart-transparent.svg';
import HeartRed from '@/assets/icons/heart/heart-red.svg';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import clsx from 'clsx';
import {IProduct} from '@/types/product.types.ts';

interface IProductCardProps extends TouchableOpacityProps {
  product: IProduct;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

const ProductCard: FC<IProductCardProps> = ({
  className,
  product,
  isFavorite,
  onToggleFavorite,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      className={clsx('bg-white w-[160px] rounded-xl', className)}>
      <Image
        className={'rounded-xl'}
        height={150}
        source={{
          uri: product.imageUrl,
        }}
      />
      <View className={'mx-2 mt-3'}>
        <TouchableOpacity
          onPress={() => onToggleFavorite(product.productID)}
          className={'ml-auto'}>
          {isFavorite ? (
            <HeartRed width={20} height={20} />
          ) : (
            <HeartTransparent width={20} height={20} />
          )}
        </TouchableOpacity>
        <RalewayText weight={600} className={'text-matule-blue'}>
          {product.categoryName}
        </RalewayText>
        <RalewayText className={'font-bold text-gray-500 mt-2'}>
          {product.title}
        </RalewayText>
        <RalewayText weight={600} className={'text-black text-lg mb-2'}>
          {product.price} ₽
        </RalewayText>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
