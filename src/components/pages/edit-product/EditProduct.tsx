import React, {FC, useState} from 'react';
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
  const [sizesJson, setSizesJson] = useState(product.sizes);
  const navigation = useTypedNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      sizesJson: sizesJson,
    },
  });

  const handleCreateOrder = async (data: any) => {
    const formData = new FormData();

    formData.append('sellerID', user?.userID || '');
    formData.append('categoryID', product.categoryID);
    formData.append('title', data.title || product.title);
    formData.append('description', data.description || product.description);
    formData.append('price', Number(data.price) || product.price);
    formData.append('sizesJson', JSON.stringify(sizesJson));

    if (data.imageUrl && data.imageUrl !== product.imageUrl) {
      formData.append('image', {
        uri: data.imageUrl,
        name: data.imageUrl.split('/').pop(),
        type: 'image/jpeg',
      });
    }

    await editProduct(formData);
    console.log('data: ', JSON.stringify(data));
  };

  const editProduct = (formData: FormData) => {
    axios
      .put(`${BASE_URL}/products/` + product.productID, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response.data);
        navigation.replace('TabNavigation');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`${BASE_URL}/products/` + product.productID)
      .then(function (response) {
        console.log(response.data);
        Alert.alert('Товар успешно удален');
        navigation.replace('TabNavigation');
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(error);
      });
  };

  return (
    <EditProduct
      sizesJson={sizesJson}
      setSizesJson={setSizesJson}
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
