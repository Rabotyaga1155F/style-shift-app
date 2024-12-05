import React, {FC, useEffect} from 'react';
import SignIn from '@/components/templates/sign-in/SignIn.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import {useForm} from 'react-hook-form';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const SignInPage: FC = () => {
  const navigation = useTypedNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const saveUser = useAuthUserStore(state => state.saveUser);
  const user = useAuthUserStore(state => state.user);

  useEffect(() => {
    if (user) {
      navigation.replace('TabNavigation');
    }
  }, [user, navigation]);

  const handleSignIn = async (data: any) => {
    await axios
      .post(`${BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        saveUser(response.data);
        navigation.navigate('TabNavigation');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SignIn
      navigation={navigation}
      handleSignIn={handleSignIn}
      handleSubmit={handleSubmit}
      errors={errors}
      control={control}
    />
  );
};

export default SignInPage;
