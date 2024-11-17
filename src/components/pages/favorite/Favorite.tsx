import React, {FC} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import {testProduct} from '../../../test-data/product-test.ts';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';
import {FlatList} from 'react-native';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

const Favorite: FC = () => {
  const {navigate} = useTypedNavigation();

  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Избранное
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

export default Favorite;
