import React, {FC, useEffect, useState} from 'react';
import Home from '@/components/templates/home/Home.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {IProduct} from '@/types/product.types.ts';
import {useAuthUserStore} from '@/store/access-token';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const HomePage: FC = () => {
  const {navigate} = useTypedNavigation();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const user = useAuthUserStore(state => state.user);
  const removeUser = useAuthUserStore(state => state.removeUser);

  useEffect(() => {
    fetchProducts();
    if (user?.userID) {
      fetchFavorites();
    }
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercasedSearch = searchText.toLowerCase();
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(lowercasedSearch),
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  //ИЗМЕНЕНО
  useEffect(() => {
    fetchProducts();
    if (user?.userID) {
      fetchFavorites();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      if (user?.userID) {
        const banResponse = await axios.get(
          `${BASE_URL}/users/is-banned/${user.userID}`,
        );
        console.log(banResponse.data.isBanned);
        if (banResponse.data.isBanned) {
          removeUser();
          navigate('SignIn');
          return;
        }
      }

      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/favorites/${user?.userID}`);
      setFavorites(response.data.map((fav: any) => fav.productID));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (productId: string) => {
    try {
      if (favorites.includes(productId)) {
        await axios.delete(`${BASE_URL}/favorites`, {
          data: {userID: user?.userID, productID: productId},
        });
        setFavorites(favorites.filter(id => id !== productId));
      } else {
        await axios.post(`${BASE_URL}/favorites`, {
          userID: user?.userID,
          productID: productId,
        });
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Home
      navigate={navigate}
      toggleFavorite={toggleFavorite}
      favorites={favorites}
      user={user}
      products={filteredProducts}
      fetchProducts={fetchProducts}
      searchText={searchText}
      setSearchText={setSearchText}
    />
  );
};

export default HomePage;
