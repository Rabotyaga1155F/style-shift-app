import React, {FC} from 'react';
import {View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

const Sale: FC = () => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Статус продавца
      </RalewayText>
    </Layout>
  );
};

export default Sale;
