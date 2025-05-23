import React, {FC, useEffect, useState} from 'react';
import SignUp from '@/components/templates/sign-up/SignUp.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {Alert} from 'react-native';

const SignUpPage: FC = () => {
  const navigation = useTypedNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  useEffect(() => {
    console.log(' ', verifyCode);
  }, [verifyCode]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const handleSignUp = async (data: any) => {
    console.log(' ', data);

    await axios
      .post(`${BASE_URL}/auth/request-verification-registration`, {
        email: data.email,
        username: data.username,
      })
      .then(response => {
        console.log(response.data);
        setModalVisible(true);
      })
      .catch(error => {
        Alert.alert(
          'Ошибка',
          'Пользователь с таким email или username уже существует',
        );
      });
  };

  const handleVerifyCode = async ({email}: {email: string}) => {
    await axios
      .post(`${BASE_URL}/auth/verify-code`, {
        email,
        code: verifyCode,
      })
      .then(response => {
        console.log(response.data);
        console.log(' ОТПРАВКА ПИСЬМА НА РЕГИСТРАЦИЮ ');

        return axios.post(`${BASE_URL}/auth/register`, {
          username: getValues('username'),
          email,
          password: getValues('password'),
        });
      })
      .then(registerResponse => {
        console.log(registerResponse.data);
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.error(
          'Ошибка:',
          error.response?.data.toString() || error.message.toString(),
        );
      });
  };

  return (
    <SignUp
      handleSignUp={handleSignUp}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      navigation={navigation}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      setVerifyCode={setVerifyCode}
      handleVerifyCode={handleVerifyCode}
      getValues={getValues}
    />
  );
};

export default SignUpPage;
