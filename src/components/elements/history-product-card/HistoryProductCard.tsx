import React, {FC} from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import clsx from 'clsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

interface IHistoryProductCardProps extends TouchableOpacityProps {
  order: any;
}

const HistoryProductCard: FC<IHistoryProductCardProps> = ({
  order,
  className,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        'bg-white rounded-xl flex-row p-3 mb-4 w-full',
        className,
      )}>
      <Image
        className={'rounded-xl'}
        height={80}
        width={80}
        source={{
          uri: order.imageUrl,
        }}
      />
      <View className={'mx-2 mt-1'}>
        <RalewayText weight={600} className={'text-black mt-1'}>
          {'Номер: ' + order.orderID.slice(0, 8)}
        </RalewayText>
        <RalewayText weight={600} className={'text-matule-blue mt-1'}>
          {order.productName.length > 25
            ? order.productName.slice(0, 25) + '…'
            : order.productName}
          <RalewayText weight={600} className={'text-black'}>
            , {order.quantity} шт
          </RalewayText>
        </RalewayText>
        <RalewayText weight={600} className={'text-black mt-1'}>
          Размер : {order.size}
        </RalewayText>
        <RalewayText className={'font-bold text-gray-500 mt-2'}>
          {order.deliveryStatus}
        </RalewayText>
        <RalewayText weight={600} className={'text-black text-lg mb-2'}>
          {order.totalAmount} ₽
        </RalewayText>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryProductCard;
