import React, {FC} from 'react';
import {View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

const OrderHistory: FC = () => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Заказы
      </RalewayText>
    </Layout>
  );
};

export default OrderHistory;
