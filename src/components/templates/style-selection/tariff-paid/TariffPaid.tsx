import React, {FC} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Image, ScrollView} from 'react-native';

const TariffPaid: FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Заказ успешно оплачен, в ближайшее время с вами свяжется наш стилист
      </RalewayText>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Пример отчета
      </RalewayText>

      <Image
        className={'w-full h-[500px] mt-5'}
        source={require('../../../../assets/images/style-examples/page1.png')}
        resizeMode="contain"
      />
      <Image
        className={'w-full h-[500px] mt-5'}
        source={require('../../../../assets/images/style-examples/page2.png')}
        resizeMode="contain"
      />
      <Image
        className={'w-full h-[500px] mt-5'}
        source={require('../../../../assets/images/style-examples/page3.png')}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

export default TariffPaid;
