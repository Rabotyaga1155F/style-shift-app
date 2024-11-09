import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

const SignIn: FC = () => {
  const {navigate} = useTypedNavigation();

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
        <Field className={'mt-4'} placeholder={'text@gmail.com'} />
      </View>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md  mt-1'}>
          Пароль
        </RalewayText>
        <Field
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
      <BigBlueButton
        onPress={() => navigate('TabNavigation')}
        className={'mt-12'}>
        Войти
      </BigBlueButton>

      <View className="top-40">
        <RalewayText
          weight={500}
          className={'text-base text-gray-600 text-center'}>
          Вы впервые?{' '}
          <TouchableOpacity
            onPress={() => navigate('SignUp')}
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
