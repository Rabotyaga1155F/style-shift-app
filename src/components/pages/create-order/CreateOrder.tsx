import React, {FC, useState} from 'react';
import CreateOrder from '@/components/templates/create-order/CreateOrder.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {DELIVERY_PRICE} from '@/constants/price.constants.ts';

const CreateOrderPage: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickupPointID, setPickupPointID] = useState<string | null>(null); // Стейт для pickupPointID
  const route = useTypedRoute<'CreateOrderPage'>();
  const navigation = useTypedNavigation();

  const product = route.params.product;
  const quantity = route.params.quantity;
  const size = route.params.size;
  const user = useAuthUserStore(state => state.user);

  const fetchOrders = async () => {
    if (!pickupPointID) {
      console.error('Pickup point is not selected');
      return;
    }

    await axios
      .post(`${BASE_URL}/orders`, {
        userID: user?.userID,
        productID: product.productID,
        quantity: quantity,
        size: size,
        totalAmount: calculateTotalPrice(quantity),
        pickupPointID: pickupPointID,
        sellerID: product.sellerID,
      })
      .then(function (response) {
        console.log(response.data);
        setModalVisible(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreateOrder = () => {
    fetchOrders();
  };

  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.replace('TabNavigation');
  };

  const calculateTotalPrice = (quantity: number) => {
    return quantity * product.price + DELIVERY_PRICE;
  };

  return (
    <CreateOrder
      handleCreateOrder={handleCreateOrder}
      product={product}
      handleBackToHome={handleBackToHome}
      modalVisible={modalVisible}
      quantity={quantity}
      calculateTotalPrice={calculateTotalPrice}
      setPickupPointID={setPickupPointID}
    />
  );
};

export default CreateOrderPage;
