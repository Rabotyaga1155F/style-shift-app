import React, {FC} from 'react';
import ForgotPasswordCode from '@/components/templates/forgot-password-code/ForgotPasswordCode.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useForm} from 'react-hook-form';
import {} from '@/components/pages/forgot-password/ForgotPassword.tsx';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {Alert} from 'react-native';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';

export type ForgotPasswordCodeFormValues = {
  code: string;
};

const ForgotPasswordCodePage: FC = () => {
  const navigation = useTypedNavigation();
  const route = useTypedRoute<'ForgotPasswordCode'>();

  const email = route.params.email;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordCodeFormValues>();

  const sendCode = async (data: ForgotPasswordCodeFormValues) => {
    await axios
      .post(`${BASE_URL}/auth/verify-code`, {
        email: email,
        code: data.code,
      })
      .then(function (response) {
        navigation.navigate('NewPasswordPage', {email: email, code: data.code});
        console.log(response.data);
      })
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            Alert.alert(
              'Ошибка',
              'Неверный код подтверждения. Попробуйте ещё раз.',
            );
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
    <ForgotPasswordCode
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      sendCode={sendCode}
    />
  );
};

export default ForgotPasswordCodePage;
