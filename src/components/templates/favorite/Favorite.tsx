import React, {FC, useEffect, useState} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import {FlatList} from 'react-native';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';

interface IFavoriteProps {
  fetchFavorites: any;
  favoriteProducts: any;
  toggleFavorite: any;
  favorites: any;
  navigate: any;
}

const Favorite: FC<IFavoriteProps> = ({
  fetchFavorites,
  toggleFavorite,
  favoriteProducts,
  favorites,
  navigate,
}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Избранное
      </RalewayText>
      <FlatList
        refreshing={false}
        onRefresh={fetchFavorites}
        showsVerticalScrollIndicator={false}
        className={'mt-5'}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: 5,
        }}
        numColumns={2}
        data={favoriteProducts}
        renderItem={({item: product}) => (
          <ProductCard
            onPress={() => navigate('ProductInfo', {product})}
            product={product}
            isFavorite={favorites.includes(product.productID)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </Layout>
  );
};

export default Favorite;
