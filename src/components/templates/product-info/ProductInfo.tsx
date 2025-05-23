import React, {FC, useState} from 'react';
import {Image, TouchableOpacity, View, ScrollView} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import HeartTransparent from '@/assets/icons/heart/heart-transparent.svg';
import HeartRed from '@/assets/icons/heart/heart-red.svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';
import BagWhite from '@/assets/icons/bag/bag-white.svg';
import Plus from '@/assets/icons/plus/plus-white.svg';
import Minus from '@/assets/icons/minus/minus-white.svg';
import {IUser} from '@/types/user.types';
import SizeView from '@/components/elements/size-view/SizeView.tsx';
import {ISize} from '@/types/product.types.ts';

interface IProductInfoProps {
  product: any;
  toggleFavorite: any;
  isFavorite: any;
  user: IUser;
  navigation: any;
}

const ProductInfo: FC<IProductInfoProps> = ({
  product,
  user,
  navigation,
  toggleFavorite,
  isFavorite,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0].size,
  );

  const selectedSizeObj = product.sizes.find(
    (sizeItem: ISize) => sizeItem.size === selectedSize,
  );

  const currentStock = selectedSizeObj?.stock ?? 1;

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View className="relative mt-4">
          <Image
            style={{width: '100%', height: 300}}
            resizeMode="contain"
            source={{uri: product.imageUrl}}
          />

          <TouchableOpacity
            onPress={toggleFavorite}
            className={
              'absolute -top-1 right-8  rounded-full w-14 h-14 justify-center items-center'
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
        </View>

        {product.sizes?.length > 0 && (
          <View className="mt-6">
            <RalewayText className="mb-2 text-lg font-semibold">
              Выберите размер:
            </RalewayText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {product.sizes
                  .filter((sizeItem: ISize) => sizeItem.stock > 0)
                  .map((sizeItem: ISize) => (
                    <SizeView
                      key={sizeItem.size}
                      size={sizeItem.size}
                      isSelected={selectedSize === sizeItem.size}
                      onSelect={() => {
                        setSelectedSize(sizeItem.size);
                        setQuantity(1);
                      }}
                    />
                  ))}
              </View>
            </ScrollView>
          </View>
        )}

        <RalewayText className={'pt-4 leading-5'}>
          {product.description}
        </RalewayText>
        <View className={'flex-row justify-between items-center mt-6 mr-1'}>
          <RalewayText className={'text-lg font-bold'}>
            ПРОДАВЕЦ: {product.sellerName}
          </RalewayText>
        </View>

        <View className={'flex-row justify-between mt-12 mb-8 '}>
          {user?.userID !== product.sellerID && (
            <View
              className={
                'bg-matule-blue rounded flex-row justify-around items-center'
              }>
              <TouchableOpacity
                onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
                className={'w-14 h-14 items-center justify-center'}>
                <Minus />
              </TouchableOpacity>

              <RalewayText className={'text-white text-lg w-8 text-center'}>
                {quantity}
              </RalewayText>

              <TouchableOpacity
                onPress={() =>
                  setQuantity(prev => Math.min(currentStock, prev + 1))
                }
                className={'w-14 h-14 items-center justify-center'}>
                <Plus />
              </TouchableOpacity>
            </View>
          )}

          {user?.userID !== product.sellerID ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateOrderPage', {
                  product,
                  quantity,
                  size: selectedSize,
                })
              }
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
                'bg-gray-700 rounded-md flex-row justify-center items-center w-full h-14'
              }>
              <RalewayText weight={600} className={'text-white text-sm pl-3'}>
                Изменить
              </RalewayText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default ProductInfo;
