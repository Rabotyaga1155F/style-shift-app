import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {View} from 'react-native';
import {ForgotPasswordFormValues} from '@/components/pages/forgot-password/ForgotPassword.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';

interface IForgotPasswordProps {
  control: Control<ForgotPasswordFormValues>;
  errors: FieldErrors<ForgotPasswordFormValues>;
  handleSubmit: UseFormHandleSubmit<ForgotPasswordFormValues>;
  forgotPassword: (data: ForgotPasswordFormValues) => void;
}

const ForgotPassword: FC<IForgotPasswordProps> = ({
  errors,
  control,
  handleSubmit,
  forgotPassword,
}) => {
  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Восстановление пароля
      </RalewayText>
      <RalewayText className={'text-center text-lg mt-1'}>
        Введите ваш email
      </RalewayText>

      <View className={'mt-10'}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email обязателен',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Неверный формат email',
            },
          }}
          render={({field: {onChange, value}}) => (
            <Field
              keyboardType="email-address"
              controllerOnChange={onChange}
              value={value}
              className={'mt-4'}
              placeholder="text@gmail.com"
            />
          )}
        />
        {errors.email && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.email.message?.toString()}
          </RalewayText>
        )}
      </View>

      <BigBlueButton onPress={handleSubmit(forgotPassword)} className={'mt-12'}>
        Восстановить
      </BigBlueButton>
    </Layout>
  );
};

export default ForgotPassword;
