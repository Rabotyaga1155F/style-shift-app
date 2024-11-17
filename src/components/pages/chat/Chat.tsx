import React, {FC} from 'react';
import {Text, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';

const Chat: FC = () => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Чат с экспертом
      </RalewayText>
    </Layout>
  );
};

export default Chat;
