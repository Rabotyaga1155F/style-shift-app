import React, {FC, useState} from 'react';
import {Alert, View} from 'react-native';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {useAuthUserStore} from '@/store/access-token';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import OrderModal from '@/components/elements/order-modal/OrderModal.tsx';
import {SupportFormValues} from '@/components/pages/support/Support.tsx';
import {IUser} from '@/types/user.types.ts';

interface ISupportProps {
  control: Control<SupportFormValues>;
  user: IUser;
  errors: FieldErrors<SupportFormValues>;
  isModalVisible: boolean;
  handleCloseModal: () => void;
  handleFormSubmit: () => void;
}

const Support: FC<ISupportProps> = ({
  control,
  user,
  errors,
  isModalVisible,
  handleFormSubmit,
  handleCloseModal,
}) => {
  return (
    <Layout>
      <RalewayText className={'text-center font-bold text-3xl mt-10'}>
        Поддержка
      </RalewayText>
      <RalewayText className={'text-center text-lg mt-2'}>
        Заполните форму, и мы с вами свяжемся
      </RalewayText>

      <View className={'mt-10'}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Обязательное поле',
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
              placeholder="Ваш email"
              defaultValue={user.email}
            />
          )}
        />
        {errors.email && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.email.message}
          </RalewayText>
        )}

        <Controller
          control={control}
          name="subject"
          rules={{required: 'Обязательное поле'}}
          render={({field: {onChange, value}}) => (
            <Field
              controllerOnChange={onChange}
              value={value}
              className={'mt-4'}
              placeholder="Краткое описание"
            />
          )}
        />
        {errors.subject && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.subject.message}
          </RalewayText>
        )}

        <Controller
          control={control}
          name="message"
          rules={{required: 'Обязательное поле'}}
          render={({field: {onChange, value}}) => (
            <Field
              controllerOnChange={onChange}
              value={value}
              className={'mt-4 h-32'}
              multiline
              numberOfLines={4}
              style={{minHeight: 120, textAlignVertical: 'top'}}
              placeholder="Опишите вашу проблему"
            />
          )}
        />
        {errors.message && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.message.message}
          </RalewayText>
        )}

        <BigBlueButton onPress={handleFormSubmit} className={'mt-10'}>
          Отправить заявку
        </BigBlueButton>
      </View>

      <OrderModal
        visible={isModalVisible}
        buttonText={'Закрыть'}
        text={'Заявка успешно создана'}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default Support;
