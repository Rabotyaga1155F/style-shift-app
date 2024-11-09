import React, {FC, useState} from 'react';
import {TextInput, TextInputProps, TouchableOpacity, View} from 'react-native';
import clsx from 'clsx';
import EyeSlash from '@/assets/icons/eye/eye-slash.svg';

interface IFieldProps extends TextInputProps {}

const Field: FC<IFieldProps> = ({className, textContentType, ...rest}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={'relative'}>
      <TextInput
        {...rest}
        className={clsx(
          'bg-gray-200 rounded-xl py-4 pl-4 text-black font-medium pr-12 max-h-12',
          className,
        )}
        placeholderTextColor={'darkgray'}
        secureTextEntry={isPasswordVisible}
      />
      {textContentType == 'password' && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className={'absolute top-1/2 right-4'}>
          <EyeSlash />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Field;
