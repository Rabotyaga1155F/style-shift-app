import React, {FC, useEffect, useState} from 'react';
import SellerProducts from '@/components/templates/seller-products/SellerProducts.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {IProduct} from '@/types/product.types.ts';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const SellerProductsPage: FC = () => {
  const navigation = useTypedNavigation();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthUserStore(state => state.user);

  useEffect(() => {
    if (user?.userID) {
      fetchProductsBySeller(user.userID);
      fetchFavorites();
    }
  }, [user]);

  const fetchProductsBySeller = async (sellerId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/products/seller/${sellerId}`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    <SellerProducts
      fetchProductsBySeller={fetchProductsBySeller}
      products={products}
      user={user}
      navigation={navigation}
      toggleFavorite={toggleFavorite}
      favorites={favorites}
    />
  );
};

export default SellerProductsPage;
