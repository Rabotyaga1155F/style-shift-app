import React, {FC, useState} from 'react';
import CreateOrder from '@/components/templates/create-order/CreateOrder.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useForm} from 'react-hook-form';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const CreateOrderPage: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useTypedRoute<'CreateOrderPage'>();
  const navigation = useTypedNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const product = route.params.product;
  const user = useAuthUserStore(state => state.user);

  const fetchOrders = async (orderData: any) => {
    await axios
      .post(`${BASE_URL}/orders`, {
        userID: user?.userID,
        productID: product.productID,
        quantity: 1,
        totalAmount: product.price + 300,
        deliveryAddress: orderData.address,
        deliveryCity: orderData.city,
        deliveryComment: 'dasdad',
        deliveryPhone: orderData.phoneNumber,
        sellerID: product.sellerID,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreateOrder = async (data: any) => {
    await fetchOrders(data);
    console.log('data: ', JSON.stringify(data));
    setModalVisible(true);
  };

  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.replace('TabNavigation');
  };

  return (
    <CreateOrder
      handleCreateOrder={handleCreateOrder}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      product={product}
      handleBackToHome={handleBackToHome}
      modalVisible={modalVisible}
    />
  );
};

export default CreateOrderPage;
