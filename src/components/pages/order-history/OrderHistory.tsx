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
        const endStatuses = ['отменён', 'завершён', 'завершен'];

        const aStatus = a.deliveryStatus?.toLowerCase().trim();
        const bStatus = b.deliveryStatus?.toLowerCase().trim();

        const aIsEnd = endStatuses.includes(aStatus);
        const bIsEnd = endStatuses.includes(bStatus);

        if (aIsEnd === bIsEnd) return 0;
        return aIsEnd ? 1 : -1;
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
