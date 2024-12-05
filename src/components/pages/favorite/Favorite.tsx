import React, {FC, useEffect, useState} from 'react';
import Favorite from '@/components/templates/favorite/Favorite.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';
import {IProduct} from '@/types/product.types.ts';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const FavoritePage: FC = () => {
  const {navigate} = useTypedNavigation();
  const user = useAuthUserStore(state => state.user);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, []),
  );

  useEffect(() => {
    if (user?.userID) {
      fetchFavorites();
    }
  }, []);

  const fetchFavorites = async () => {
    try {
      const favoritesResponse = await axios.get(
        `${BASE_URL}/favorites/${user?.userID}`,
      );
      const favoriteProductIDs = favoritesResponse.data.map(
        (fav: any) => fav.productID,
      );
      setFavorites(favoriteProductIDs);

      const productsResponse = await axios.get(`${BASE_URL}/products`);
      const allProducts = productsResponse.data;
      const filteredProducts = allProducts.filter((product: IProduct) =>
        favoriteProductIDs.includes(product.productID),
      );
      setFavoriteProducts(filteredProducts);
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
        setFavoriteProducts(
          favoriteProducts.filter(p => p.productID !== productId),
        );
      } else {
        await axios.post(`${BASE_URL}/favorites`, {
          userID: user?.userID,
          productID: productId,
        });
        setFavorites([...favorites, productId]);
        const addedProduct = favoriteProducts.find(
          p => p.productID === productId,
        );
        if (addedProduct) {
          setFavoriteProducts([...favoriteProducts, addedProduct]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Favorite
      favorites={favorites}
      fetchFavorites={fetchFavorites}
      favoriteProducts={favoriteProducts}
      toggleFavorite={toggleFavorite}
      navigate={navigate}
    />
  );
};

export default FavoritePage;
