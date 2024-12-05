import React, {FC, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {IProduct} from '@/types/product.types.ts';
import {useAuthUserStore} from '@/store/access-token';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

interface ISellerProductsProps {
  user: any;
  fetchProductsBySeller: any;
  products: any;
  navigation: any;
  favorites: any;
  toggleFavorite: any;
}
const SellerProducts: FC<ISellerProductsProps> = ({
  fetchProductsBySeller,
  products,
  toggleFavorite,
  favorites,
  user,
  navigation,
}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Мои товары
      </RalewayText>
      <FlatList
        refreshing={false}
        onRefresh={() => {
          if (user?.userID) {
            fetchProductsBySeller(user.userID);
          }
        }}
        showsVerticalScrollIndicator={false}
        className={'mt-5'}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: 5,
        }}
        numColumns={2}
        data={products}
        renderItem={({item: product}) => (
          <ProductCard
            onPress={() => navigation.navigate('ProductInfo', {product})}
            product={product}
            isFavorite={favorites.includes(product.productID)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </Layout>
  );
};

export default SellerProducts;
