import OrderHistoryInfo from '@/components/templates/order-history-info/OrderHistoryInfo.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

export default function OrderHistoryInfoPage() {
  const {order} = useTypedRoute<'OrderHistoryInfoPage'>().params;

  const navigation = useTypedNavigation();

  console.log(order);

  return <OrderHistoryInfo navigation={navigation} order={order} />;
}
