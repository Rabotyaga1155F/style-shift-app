import React, {FC} from 'react';
import {Text, View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';

const Home: FC = () => {
  return (
    <Layout>
      <Text className={'text-red-600'}>HomePage</Text>
    </Layout>
  );
};

export default Home;
