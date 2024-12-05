import React, {FC} from 'react';
import {View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';

const Chat: FC = () => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Помощь
      </RalewayText>
      <View>
        <RalewayText weight={600} className={'text-2xl text-center mt-10'}>
          Возникли вопросы или появилась жалоба?
        </RalewayText>
        <RalewayText weight={600} className={'text-xl text-center mt-10'}>
          Оставить заявку в техподдержку можно по почте администрации
        </RalewayText>
        <RalewayText weight={600} className={'text-xl text-center mt-10'}>
          cool.poryadin2014@yandex.ru
        </RalewayText>
      </View>
    </Layout>
  );
};

export default Chat;
