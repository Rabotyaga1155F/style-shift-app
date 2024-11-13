import React, {FC} from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import HeartTransparent from '@/assets/icons/heart/heart-transparent.svg';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import clsx from 'clsx';
import {IProduct} from '@/types/product.types.ts';

interface IProductCardProps extends TouchableOpacityProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({className, product, ...rest}) => {
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
        <View className={'ml-auto'}>
          <HeartTransparent width={20} height={20} />
        </View>
        <RalewayText weight={600} className={'text-matule-blue'}>
          {product.category}
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
