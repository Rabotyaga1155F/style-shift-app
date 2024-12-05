import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Button, FlatList} from 'react-native';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';

interface IHomeProps {
  fetchProducts: any;
  products: any;
  navigate: any;
  user: any;
  toggleFavorite: any;
  favorites: any;
}

const Home: FC<IHomeProps> = ({
  favorites,
  toggleFavorite,
  user,
  products,
  fetchProducts,
  navigate,
}) => {
  return (
    <Layout>
      <RalewayText weight={500} className="font-bold text-3xl text-center pt-8">
        Главная
      </RalewayText>

      <RalewayText weight={600} className={'text-lg mt-3'}>
        Популярное
      </RalewayText>
      <FlatList
        refreshing={false}
        onRefresh={fetchProducts}
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
            onPress={() => navigate('ProductInfo', {product})}
            product={product}
            isFavorite={favorites.includes(product.productID)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
      {user?.verification == true && (
        <BigBlueButton
          onPress={() => navigate('AddProductPage')}
          className={'mb-8'}>
          Добавить товар
        </BigBlueButton>
      )}
    </Layout>
  );
};

export default Home;
