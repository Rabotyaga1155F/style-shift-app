import React, {FC} from 'react';
import {Image, View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {useAuthUserStore} from '@/store/access-token';
import Sale from '@/components/templates/sale/Sale.tsx';

const SalePage: FC = () => {
  const user = useAuthUserStore(state => state.user);

  return <Sale user={user} />;
};

export default SalePage;
