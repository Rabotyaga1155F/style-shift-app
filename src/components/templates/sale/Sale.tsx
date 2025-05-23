import React, {FC, useState} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {IUser} from '@/types/user.types.ts';
import Applicant from './applicant/Applicant';
import Seller from './seller/Seller';

interface ISaleProps {
  user: IUser;
}

const Sale: FC<ISaleProps> = ({user}) => {
 return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Кабинет продавца
      </RalewayText>
      {user?.verification ? (
        <Seller user={user}/>
      ) : (
        <Applicant user={user}/>
      )
}
    </Layout>
  );
};

export default Sale;
