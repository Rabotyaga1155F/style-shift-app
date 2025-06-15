import React, {FC, useEffect, useState} from 'react';
import OrderHistory from '@/components/templates/order-history/OrderHistory.tsx';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

const OrderHistoryPage: FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthUserStore(state => state.user);
  const navigation = useTypedNavigation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/get-orders-for-user/${user?.userID}`,
      );

      const sortedOrders = response.data.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });


      setOrders(sortedOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderHistory
      navigation={navigation}
      orders={orders}
      fetchOrders={fetchOrders}
      loading={loading}
    />
  );
};

export default OrderHistoryPage;
