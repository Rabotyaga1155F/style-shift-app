import React, {FC, useEffect, useState} from 'react';
import ProductInfo from '@/components/templates/product-info/ProductInfo.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const ProductInfoPage: FC = () => {
  const route = useTypedRoute<'ProductInfo'>();
  const navigation = useTypedNavigation();
  const user = useAuthUserStore(state => state.user);

  const product = route.params.product;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (user?.userID) {
      checkFavoriteStatus();
    }
  }, [user?.userID]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/favorites/${user?.userID}`);
      const favoriteProducts = response.data;
      setIsFavorite(
        favoriteProducts.some((p: any) => p.productID === product.productID),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${BASE_URL}/favorites`, {
          data: {userID: user?.userID, productID: product.productID},
        });
        setIsFavorite(false);
      } else {
        await axios.post(`${BASE_URL}/favorites`, {
          userID: user?.userID,
          productID: product.productID,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductInfo
      product={product}
      isFavorite={isFavorite}
      user={user}
      toggleFavorite={toggleFavorite}
      navigation={navigation}
    />
  );
};

export default ProductInfoPage;
