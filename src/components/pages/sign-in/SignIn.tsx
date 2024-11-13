import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import axios from 'axios';
import {useAuthTokenStore} from '@/store/access-token';

const SignIn: FC = () => {
  const navigation = useTypedNavigation();

  const [email, setEmail] = useState('cool.poryadin2014@yandex.ru');
  const [password, setPassword] = useState('Marizmariz1.');

  const saveToken = useAuthTokenStore(state => state.saveToken);
  const token = useAuthTokenStore(state => state.token);

  useEffect(() => {
    if (token) {
      navigation.replace('TabNavigation');
    }
  }, [token, navigation.navigate]);

  const handleSignIn = async () => {
    await axios
      .post(`${process.env.BASE_URL}/login`, {
        email,
        password,
      })
      .then(function (response) {
        saveToken(response.data.accessToken);
        navigation.navigate('TabNavigation');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Привет!
      </RalewayText>
      <RalewayText className={'text-center  text-lg mt-1'}>
        Заполните Свои Данные
      </RalewayText>
      <View className={'mt-10'}>
        <RalewayText weight={500} className={'text-md  mt-1'}>
          Email
        </RalewayText>
        <Field
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
      <TouchableOpacity>
        <RalewayText className={'text-right mt-3 text-gray-600'}>
          Восстановить
        </RalewayText>
      </TouchableOpacity>
      <BigBlueButton onPress={handleSignIn} className={'mt-12'}>
        Войти
      </BigBlueButton>

      <View className="mt-40">
        <RalewayText
          weight={500}
          className={'text-base text-gray-600 text-center'}>
          Вы впервые?{' '}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className={'mt-[4.5px]'}>
            <RalewayText weight={500} className="text-blue-black text-base">
              Создать пользователя
            </RalewayText>
          </TouchableOpacity>
        </RalewayText>
      </View>
    </Layout>
  );
};

export default SignIn;
