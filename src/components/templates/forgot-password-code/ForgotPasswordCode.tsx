import React, {FC, useEffect, useState} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import {TextInput, View} from 'react-native';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {ForgotPasswordFormValues} from '@/components/pages/forgot-password/ForgotPassword.tsx';
import {ForgotPasswordCodeFormValues} from '@/components/pages/forgot-password-code/ForgotPasswordCode.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
interface IForgotPasswordCodeProps {
  control: Control<ForgotPasswordCodeFormValues>;
  errors: FieldErrors<ForgotPasswordCodeFormValues>;
  handleSubmit: UseFormHandleSubmit<ForgotPasswordCodeFormValues>;
  sendCode: (data: ForgotPasswordCodeFormValues) => void;
}
const ForgotPasswordCode: FC<IForgotPasswordCodeProps> = ({
  sendCode,
  control,
  handleSubmit,
  errors,
}) => {
  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Проверьте почту
      </RalewayText>
      <RalewayText className={'text-center text-lg mt-1'}>
        Введите код подтверждения который пришел на вашу почту
      </RalewayText>

      <View className={'mt-10'}>
        <Controller
          control={control}
          name="code"
          rules={{
            required: 'Код обязателен',
            pattern: {
              value: /^[0-9]{6}$/,
              message: 'Код должен состоять из 6 цифр',
            },
          }}
          render={({field: {onChange, value}}) => (
            <Field
              keyboardType="number-pad"
              maxLength={6}
              controllerOnChange={onChange}
              value={value}
              className={'mt-4'}
              placeholder="Введите 6-значный код"
            />
          )}
        />
        {errors.code && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.code.message?.toString()}
          </RalewayText>
        )}
      </View>

      <BigBlueButton onPress={handleSubmit(sendCode)} className={'mt-12'}>
        Отправить
      </BigBlueButton>
    </Layout>
  );
};

export default ForgotPasswordCode;
