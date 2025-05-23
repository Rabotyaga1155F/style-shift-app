import React, {FC} from 'react';
import {useAuthUserStore} from '@/store/access-token';
import Sale from '@/components/templates/sale/Sale.tsx';

const SalePage: FC = () => {
  const user = useAuthUserStore(state => state.user!);

  return <Sale user={user} />;
};

export default SalePage;
