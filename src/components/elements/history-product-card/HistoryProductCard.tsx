import React, {FC} from 'react';
import {Image, View, ViewProps} from 'react-native';
import clsx from 'clsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

interface IHistoryProductCardProps extends ViewProps {
  order: any;
}

const HistoryProductCard: FC<IHistoryProductCardProps> = ({
  order,
  className,
  ...rest
}) => {
  return (
    <View
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
        <RalewayText weight={600} className={'text-matule-blue'}>
          {order.productName}
        </RalewayText>
        <RalewayText className={'font-bold text-gray-500 mt-2'}>
          {order.deliveryStatus}
        </RalewayText>
        <RalewayText weight={600} className={'text-black text-lg mb-2'}>
          {order.totalAmount} ₽
        </RalewayText>
      </View>
    </View>
  );
};

export default HistoryProductCard;
