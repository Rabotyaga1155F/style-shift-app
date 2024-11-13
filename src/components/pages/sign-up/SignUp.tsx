import React, {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import axios from 'axios';

const SignUp: FC = () => {
  const {navigate} = useTypedNavigation();

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
        navigate('SignIn');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Регистрация
      </RalewayText>
      <RalewayText className={'text-center  text-lg mt-1'}>
        Заполните Свои Данные
      </RalewayText>
      <View className={'mt-10'}>
        <RalewayText weight={500} className={'text-md  mt-1'}>
          Ваше имя
        </RalewayText>
        <Field
          onChangeText={text => setUsername(text)}
          className={'mt-4'}
          placeholder={'xxxxxxxxx'}
        />
      </View>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md  mt-1'}>
          Email
        </RalewayText>
        <Field
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          onChangeText={text => setEmail(text)}
          className={'mt-4'}
          placeholder={'text@gmail.com'}
        />
      </View>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md  mt-1'}>
          Пароль
        </RalewayText>
        <Field
          onChangeText={text => setPassword(text)}
          textContentType={'password'}
          className={'mt-4'}
          placeholder={'⬤⬤⬤⬤⬤⬤⬤⬤'}
        />
      </View>
      <BigBlueButton onPress={handleSignUp} className={'mt-8'}>
        Зарегистрироваться
      </BigBlueButton>
      <View className="mt-28">
        <RalewayText
          weight={500}
          className={'text-base text-gray-600 text-center'}>
          Есть аккаунт?{' '}
          <TouchableOpacity
            onPress={() => navigate('SignIn')}
            className={'mt-[4.5px]'}>
            <RalewayText weight={500} className="text-blue-black text-base">
              Войти
            </RalewayText>
          </TouchableOpacity>
        </RalewayText>
      </View>
    </Layout>
  );
};

export default SignUp;
