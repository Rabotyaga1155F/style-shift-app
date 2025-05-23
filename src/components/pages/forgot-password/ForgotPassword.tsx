import React, {FC} from 'react';
import ForgotPassword from '@/components/templates/forgot-password/ForgotPassword.tsx';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {Alert} from 'react-native';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

export type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordPage: FC = () => {
  const navigation = useTypedNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormValues>();

  const forgotPassword = async (data: ForgotPasswordFormValues) => {
    await axios
      .post(`${BASE_URL}/auth/request-verification`, {
        email: data.email,
      })
      .then(function (response) {
        navigation.navigate('ForgotPasswordCode', {email: data.email});
        console.log(response.data);
      })
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            Alert.alert('Ошибка', 'Пользователь с таким email не найден.');
          } else {
            Alert.alert(
              'Ошибка',
              error.response?.data?.message || 'Произошла неизвестная ошибка.',
            );
          }
        } else {
          Alert.alert(
            'Ошибка',
            'Не удалось отправить запрос. Проверьте подключение к интернету.',
          );
        }
        console.log(error);
      });
  };

  return (
    <ForgotPassword
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      forgotPassword={forgotPassword}
    />
  );
};

export default ForgotPasswordPage;
