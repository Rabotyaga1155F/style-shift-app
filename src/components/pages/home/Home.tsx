import React, {FC, useEffect} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Bag from '@/assets/icons/bag/bag-black.svg';
import {FlatList, TouchableOpacity, View} from 'react-native';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';
import {testProduct} from '../../../test-data/product-test.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

const Home: FC = () => {
  const {navigate} = useTypedNavigation();

  return (
    <Layout>
      <RalewayText weight={500} className="font-bold text-3xl text-center pt-8">
        Главная
      </RalewayText>

      <RalewayText weight={600} className={'text-lg mt-3'}>
        Популярное
      </RalewayText>
      <FlatList
        showsVerticalScrollIndicator={false}
        className={'mt-5'}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: 5,
        }}
        numColumns={2}
        data={testProduct}
        renderItem={product => (
          <ProductCard
            onPress={() => {
              navigate('ProductInfo', {product: product.item});
            }}
            product={product.item}
          />
        )}
      />
    </Layout>
  );
};

export default Home;
