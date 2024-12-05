import React, {FC, useEffect, useState} from 'react';
import AddProduct from '@/components/templates/add-product/AddProduct.tsx';
import {useForm} from 'react-hook-form';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const AddProductPage: FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigation = useTypedNavigation();

  const user = useAuthUserStore(state => state.user);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (productData: any) => {
    await axios
      .post(`${BASE_URL}/products`, {
        sellerID: user?.userID,
        categoryID: selectedCategory,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        stock: 1,
        imageUrl: productData.imageUrl,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddProduct = async (data: any) => {
    await fetchProducts(data);
    console.log('data: ', JSON.stringify(data));
    navigation.navigate('TabNavigation');
  };

  return (
    <AddProduct
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      setSelectedCategory={setSelectedCategory}
      categories={categories}
      selectedCategory={selectedCategory}
      handleAddProduct={handleAddProduct}
    />
  );
};

export default AddProductPage;
