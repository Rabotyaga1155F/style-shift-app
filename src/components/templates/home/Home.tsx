import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {FlatList, TextInput, View} from 'react-native';
import ProductCard from '@/components/elements/product-card/ProductCard.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import Search from '@/components/elements/search/Search.tsx';

interface IHomeProps {
  fetchProducts: any;
  products: any;
  navigate: any;
  user: any;
  toggleFavorite: any;
  favorites: any;
  searchText: any;
  setSearchText: any;
}

const Home: FC<IHomeProps> = ({
  favorites,
  toggleFavorite,
  user,
  products,
  fetchProducts,
  navigate,
  setSearchText,
}) => {
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState<'min' | 'max' | null>(
    null,
  );

  const handlePriceInput = (text: string, setter: (val: string) => void) => {
    if (/^\d{0,7}$/.test(text)) {
      setter(text);
    }
  };

  const filteredProducts = products.filter((product: {price: number}) => {
    const productPrice = product.price;
    const min = minPrice !== '' ? productPrice >= parseFloat(minPrice) : true;
    const max = maxPrice !== '' ? productPrice <= parseFloat(maxPrice) : true;
    return min && max;
  });

  const getMinMaxPrice = (products: any[]) => {
    if (!products.length) return {minPrice: 0, maxPrice: 0};
    const prices = products.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return {minPrice, maxPrice};
  };

  const {minPrice: placeholderMin, maxPrice: placeholderMax} =
    getMinMaxPrice(filteredProducts);

  return (
    <Layout>
      <RalewayText weight={500} className="font-bold text-3xl text-center pt-8">
        Главная
      </RalewayText>

      <Search onChangeText={text => setSearchText(text)} className={'mt-3'} />
      <View className="flex-row gap-2 mt-3">
        <View
          className={`flex-row items-center rounded px-2 w-[48%] border ${
            focusedInput === 'min' ? 'border-blue-500' : 'border-gray-300'
          }`}>
          <RalewayText className="text-gray-600 text-sm mr-1">От</RalewayText>
          <TextInput
            value={minPrice}
            onChangeText={text => handlePriceInput(text, setMinPrice)}
            onFocus={() => setFocusedInput('min')}
            onBlur={() => setFocusedInput(null)}
            keyboardType="numeric"
            className="flex-1 text-sm text-black"
            placeholder={placeholderMin.toString()}
            placeholderTextColor="#999"
            maxLength={7}
          />
        </View>

        <View
          className={`flex-row items-center rounded px-2 w-[48%] border ${
            focusedInput === 'max' ? 'border-blue-500' : 'border-gray-300'
          }`}>
          <RalewayText className="text-gray-600 text-sm mr-1">До</RalewayText>
          <TextInput
            value={maxPrice}
            onChangeText={text => handlePriceInput(text, setMaxPrice)}
            onFocus={() => setFocusedInput('max')}
            onBlur={() => setFocusedInput(null)}
            keyboardType="numeric"
            className="flex-1 text-sm text-black"
            placeholder={placeholderMax.toString()}
            placeholderTextColor="#999"
            maxLength={7}
          />
        </View>
      </View>

      <RalewayText weight={600} className={'text-lg mt-3'}>
        Популярное
      </RalewayText>
      <FlatList
        refreshing={false}
        onRefresh={fetchProducts}
        showsVerticalScrollIndicator={false}
        className={'mt-5 mx-2'}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
        numColumns={2}
        data={filteredProducts}
        renderItem={({item: product}) => (
          <ProductCard
            onPress={() => navigate('ProductInfo', {product})}
            product={product}
            isFavorite={favorites.includes(product.productID)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListEmptyComponent={
          <RalewayText className="text-center text-xl text-gray-500 mt-3">
            Ничего не нашлось
          </RalewayText>
        }
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
