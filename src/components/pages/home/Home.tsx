import React, {FC, useEffect} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Bag from '@/assets/icons/bag/bag-black.svg';
import {FlatList, TouchableOpacity, View} from 'react-native';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';
import {testProduct} from '../../../test-data/product-test.ts';

const Home: FC = () => {
  return (
    <Layout>
      <View className="mt-8 flex-row justify-between items-center">
        <RalewayText
          weight={500}
          className="font-bold text-3xl text-center flex-1 pl-10">
          Главная
        </RalewayText>
        <TouchableOpacity className="bg-white p-3 max-w-[50px] rounded-full items-center">
          <Bag />
        </TouchableOpacity>
      </View>
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
        renderItem={product => <ProductCard product={product.item} />}
      />
    </Layout>
  );
};

export default Home;
