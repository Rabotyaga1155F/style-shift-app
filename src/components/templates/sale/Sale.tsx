import React, {FC} from 'react';
import {Image, View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {useAuthUserStore} from '@/store/access-token';

interface ISaleProps {
  user: any;
}

const Sale: FC<ISaleProps> = ({user}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Статус продавца
      </RalewayText>
      {user?.verification ? (
        <View>
          <RalewayText weight={600} className={'text-2xl text-center mt-10'}>
            Вы можете продавать товары на нашем сервисе
          </RalewayText>
          <Image
            className={'w-60 h-60 mx-auto mt-20'}
            source={require('../../../assets/images/ok-status.png')}
          />
        </View>
      ) : (
        <View>
          <RalewayText weight={600} className={'text-2xl text-center mt-10'}>
            Вы не можете продавать товары на нашем сервисе
          </RalewayText>
          <RalewayText weight={600} className={'text-xl text-center mt-10'}>
            Оставить заявку на продажу товаров вы можете написать на почту
            администрации
          </RalewayText>
          <RalewayText weight={600} className={'text-xl text-center mt-10'}>
            cool.poryadin2014@yandex.ru
          </RalewayText>
        </View>
      )}
    </Layout>
  );
};

export default Sale;
