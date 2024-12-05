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
  const [favorites, setFavorites] = useState<string[]>([]);
  const user = useAuthUserStore(state => state.user);

  useEffect(() => {
    fetchProducts();
    if (user?.userID) {
      fetchFavorites();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
      fetchFavorites();
    }, []),
  );

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
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
      products={products}
      fetchProducts={fetchProducts}
    />
  );
};

export default HomePage;
