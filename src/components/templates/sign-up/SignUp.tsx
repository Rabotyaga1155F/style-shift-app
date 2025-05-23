import React, {FC} from 'react';
import {Keyboard, Modal, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {Controller} from 'react-hook-form';

interface ISignUpProps {
  handleSignUp: any;
  handleSubmit: any;
  control: any;
  errors: any;
  navigation: any;
  setModalVisible:any
  modalVisible:boolean;
  handleVerifyCode:any
  setVerifyCode:any
  getValues:any
}

const SignUp: FC<ISignUpProps> = ({
  handleSignUp,
  handleSubmit,
  control,
  errors,
  navigation,
  setModalVisible,
  modalVisible,
  setVerifyCode,
  handleVerifyCode,
  getValues
}) => {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Регистрация
      </RalewayText>
      <RalewayText className={'text-center text-lg mt-1'}>
        Заполните Свои Данные
      </RalewayText>

      <View className={'mt-10'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Ваше имя
        </RalewayText>
        <Controller
          control={control}
          name="username"
          rules={{required: 'Имя обязательно'}}
          render={({field: {onChange, value}}) => (
            <Field
              controllerOnChange={onChange}
              value={value}
              className={'mt-4'}
              placeholder={'Ваше имя'}
            />
          )}
        />
        {errors.username && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.username.message?.toString()}
          </RalewayText>
        )}
      </View>

      <View className={'mt-4'}>
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
              controllerOnChange={onChange}
              value={value}
              keyboardType="email-address"
              className={'mt-4'}
              placeholder={'text@gmail.com'}
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
              placeholder={'⬤⬤⬤⬤⬤⬤⬤⬤'}
            />
          )}
        />
        {errors.password && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.password.message?.toString()}
          </RalewayText>
        )}
      </View>

      <BigBlueButton onPress={handleSubmit(handleSignUp)} className={'mt-8'}>
        Зарегистрироваться
      </BigBlueButton>

      <View className="mt-4 pb-3">
        <RalewayText
          weight={500}
          className={'text-base text-gray-600 text-center'}>
          Есть аккаунт?{' '}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className={'mt-[4.5px]'}>
            <RalewayText weight={500} className="text-blue-black text-base">
              Войти
            </RalewayText>
          </TouchableOpacity>
        </RalewayText>
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className={'flex-1 justify-center items-center bg-black/50'}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className={'mt-4 bg-white rounded-3xl py-10 px-10 items-center'}>
                  <RalewayText weight={500} className={'text-base text-center mb-3'}>
                    Введите код подтверждения, отправленный на вашу почту
                  </RalewayText>
                  <TextInput
                    onChangeText={(text) => setVerifyCode(text)}
                    keyboardType='number-pad'
                    className={'text-center w-48 bg-gray-200 rounded-xl py-4 text-black font-medium max-h-12'}
                    placeholderTextColor={'darkgray'}
                  />
                  <BigBlueButton
                    onPress={() => handleVerifyCode({ email: getValues('email') })}
                    className={'px-2 mt-8'}>
                    Подтвердить
                  </BigBlueButton>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>

    </Layout>
  );
};

export default SignUp;
