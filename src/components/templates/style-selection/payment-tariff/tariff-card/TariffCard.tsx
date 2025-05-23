import React, {FC} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Text, View, ViewProps} from 'react-native';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import cn from 'clsx';

interface ITariffCard extends ViewProps {
  tariffName: string;
  price: string;
  description: string;
  onButtonPress?: () => void;
}

const TariffCard: FC<ITariffCard> = ({
  tariffName,
  price,
  description,
  className,
  onButtonPress,
  ...rest
}) => {
  return (
    <View {...rest} className={cn('bg-white mx-5 rounded', className)}>
      <RalewayText weight={700} className={'text-lg text-center pt-3'}>
        {tariffName}
      </RalewayText>
      <Text className={'text-lg text-center pt-1 font-bold'}>{price}₽</Text>

      <RalewayText weight={500} className={'text-lg text-center p-5'}>
        {description}
      </RalewayText>

      <BigBlueButton onPress={onButtonPress} className={'mx-12 mb-3'}>
        Оформить услугу
      </BigBlueButton>
    </View>
  );
};

export default TariffCard;
