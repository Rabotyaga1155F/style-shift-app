import React, {FC} from 'react';
import EditProduct from '@/components/templates/edit-product/EditProduct.tsx';
import {useAuthUserStore} from '@/store/access-token';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {Alert} from 'react-native';

const EditProductPage: FC = () => {
  const user = useAuthUserStore(state => state.user);
  const {params} = useTypedRoute<'EditProductPage'>();
  const product = params.product;
  const navigation = useTypedNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleCreateOrder = async (data: any) => {
    await editProduct(data);
    console.log('data: ', JSON.stringify(data));
  };

  const editProduct = (data: any) => {
    axios
      .put(`${BASE_URL}/products/` + product.productID, {
        sellerID: user?.userID,
        categoryID: product.categoryID,
        title: data.title || product.title,
        description: data.description || product.description,
        price: Number(data.price) || product.price,
        stock: 1,
        imageUrl: data.imageUrl || product.imageUrl,
      })
      .then(function (response) {
        console.log(response.data);
        Alert.alert('Заказ успешно изменен');
        navigation.replace('TabNavigation');
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(error);
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`${BASE_URL}/products/` + product.productID)
      .then(function (response) {
        console.log(response.data);
        Alert.alert('Заказ успешно удален');
        navigation.replace('TabNavigation');
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(error);
      });
  };

  return (
    <EditProduct
      product={product}
      control={control}
      errors={errors}
      deleteProduct={deleteProduct}
      handleCreateOrder={handleCreateOrder}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditProductPage;
