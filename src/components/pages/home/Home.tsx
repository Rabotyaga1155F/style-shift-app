import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

const Home: FC = () => {
  return (
    <Layout>
      <RalewayText weight={500} className={'text-red-600'}>
        HomePage
      </RalewayText>
    </Layout>
  );
};

export default Home;
