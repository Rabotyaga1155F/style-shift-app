import React, {FC} from 'react';
import SignUp from '@/components/templates/sign-up/SignUp.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const SignUpPage: FC = () => {
  const navigation = useTypedNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSignUp = async (data: any) => {
    await axios
      .post(`${BASE_URL}/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        navigation.navigate('SignIn');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SignUp
      handleSignUp={handleSignUp}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      navigation={navigation}
    />
  );
};

export default SignUpPage;
