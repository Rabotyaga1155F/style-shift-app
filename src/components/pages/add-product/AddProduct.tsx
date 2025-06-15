import React, {FC, useCallback, useEffect, useState} from 'react';
import AddProduct from '@/components/templates/add-product/AddProduct.tsx';
import {useForm} from 'react-hook-form';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';

export interface ISizeItem {
  size: string;
  stock: number;
}

const AddProductPage: FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [categories, setCategories] = useState<any[]>([]);
  const [sizesJson, setSizesJson] = useState<ISizeItem[]>([
    {size: '', stock: 1},
  ]);

  const navigation = useTypedNavigation();

  useEffect(() => {
    if (sizesJson.length === 0) {
      setSizesJson([{size: '', stock: 0}]);
    }
  }, []);

  const user = useAuthUserStore(state => state.user);

  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddProduct = async (data: any) => {
    const hasInvalidSize = sizesJson.some(
      size => size.size.trim() === '' || size.stock <= 0 || size.stock > 9999,
    );

    if (hasInvalidSize) {
      Alert.alert(
        'Ошибка',
        'Убедитесь, что у всех размеров указаны непустые названия и количество от 1 до 9999',
      );

      return;
    }

    if (!imageUri) {
      Alert.alert('Ошибка', 'Пожалуйста, добавьте изображение товара.');
      return;
    }

    const formData = new FormData();

    formData.append('sellerID', user?.userID);
    formData.append('categoryID', data.category);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('sizesJson', JSON.stringify(sizesJson));

    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        name: imageUri.split('/').pop(),
        type: 'image/jpeg',
      });
    }

    try {
      const response = await axios.post(`${BASE_URL}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigation.navigate('TabNavigation');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddProduct
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      categories={categories}
      handleAddProduct={handleAddProduct}
      pickImage={pickImage}
      imageUri={imageUri}
      setSizesJson={setSizesJson}
      sizesJson={sizesJson}
    />
  );
};

export default AddProductPage;
