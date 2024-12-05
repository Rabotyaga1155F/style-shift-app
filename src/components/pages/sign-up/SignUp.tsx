import React, {FC, useState} from 'react';
import SignUp from '@/components/templates/sign-up/SignUp.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import axios from 'axios';

const SignUpPage: FC = () => {
  const navigation = useTypedNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    await axios
      .post(`${process.env.BASE_URL}/auth/register`, {
        username,
        email,
        password,
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
      navigation={navigation}
      setEmail={setEmail}
      setPassword={setPassword}
      setUsername={setUsername}
    />
  );
};

export default SignUpPage;
