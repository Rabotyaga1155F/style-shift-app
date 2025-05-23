import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {NewPasswordFormValues} from '@/components/pages/new-password/NewPassword.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {View} from 'react-native';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';

interface IForgotPasswordCodeProps {
  control: Control<NewPasswordFormValues>;
  errors: FieldErrors<NewPasswordFormValues>;
  handleSubmit: UseFormHandleSubmit<NewPasswordFormValues>;
  resetPassword: (data: NewPasswordFormValues) => void;
}
const NewPassword: FC<IForgotPasswordCodeProps> = ({
  resetPassword,
  handleSubmit,
  errors,
  control,
}) => {
  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-20'}>
        Новый пароль
      </RalewayText>
      <RalewayText className={'text-center text-lg mt-1'}>
        Введите новый пароль для вашей учетной записи
      </RalewayText>

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

      <BigBlueButton onPress={handleSubmit(resetPassword)} className={'mt-12'}>
        Отправить
      </BigBlueButton>
    </Layout>
  );
};

export default NewPassword;
