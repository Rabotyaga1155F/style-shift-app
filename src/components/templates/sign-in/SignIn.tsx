import React, {FC, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import axios from 'axios';
import {useAuthUserStore} from '@/store/access-token';
import {BASE_URL} from '@/constants/url.constants.ts';
import {useForm, Controller} from 'react-hook-form';

interface ISignInProps {
  control: any;
  errors: any;
  handleSubmit: any;
  handleSignIn: any;
  navigation: any;
}

const SignIn: FC<ISignInProps> = ({
  handleSignIn,
  handleSubmit,
  navigation,
  errors,
  control,
}) => {
  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Привет!
      </RalewayText>
      <RalewayText className={'text-center text-lg mt-1'}>
        Заполните Свои Данные
      </RalewayText>

      <View className={'mt-10'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Email
        </RalewayText>
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

      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Пароль
        </RalewayText>
        <Controller
          control={control}
          name="password"
          rules={{required: 'Пароль обязателен'}}
          render={({field: {onChange, value}}) => (
            <Field
              controllerOnChange={onChange}
              value={value}
              textContentType="password"
              className={'mt-4'}
              placeholder="⬤⬤⬤⬤⬤⬤⬤⬤"
            />
          )}
        />
        {errors.password && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.password.message?.toString()}
          </RalewayText>
        )}
      </View>

      <TouchableOpacity>
        <RalewayText className={'text-right mt-3 text-gray-600'}>
          Восстановить
        </RalewayText>
      </TouchableOpacity>

      <BigBlueButton onPress={handleSubmit(handleSignIn)} className={'mt-12'}>
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
