import React, {FC} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import clsx from 'clsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';

interface IBigBlueButton extends TouchableOpacityProps {}

const BigBlueButton: FC<IBigBlueButton> = ({className, children, ...rest}) => {
  return (
    <TouchableOpacity
      className={clsx('bg-blue-400/90 rounded-xl', className)}
      {...rest}>
      <RalewayText
        weight={600}
        className={'text-base text-white text-center py-3 '}>
        {children}
      </RalewayText>
    </TouchableOpacity>
  );
};

export default BigBlueButton;
