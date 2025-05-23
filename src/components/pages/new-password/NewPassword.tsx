import React, {FC} from 'react';
import NewPassword from '@/components/templates/new-password/NewPassword.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useForm} from 'react-hook-form';
import {ForgotPasswordCodeFormValues} from '@/components/pages/forgot-password-code/ForgotPasswordCode.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {Alert} from 'react-native';

export type NewPasswordFormValues = {
  password: string;
};
const NewPasswordPage: FC = () => {
  const navigation = useTypedNavigation();
  const route = useTypedRoute<'NewPasswordPage'>();

  const {email, code} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<NewPasswordFormValues>();

  const resetPassword = async (data: NewPasswordFormValues) => {
    await axios
      .post(`${BASE_URL}/auth/reset-password`, {
        email: email,
        code: code,
        newPassword: data.password,
      })
      .then(function (response) {
        navigation.navigate('SignIn');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
          'Небезопасный пароль',
          'Минимум 8 символов, заглавная буква, знак препинания',
        );
      });
  };

  return (
    <NewPassword
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      resetPassword={resetPassword}
    />
  );
};

export default NewPasswordPage;
