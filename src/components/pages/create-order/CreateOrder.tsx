import React, {FC, useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {useTypedRoute} from '@/hooks/navigation/useTypedRoute.ts';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';
import Field from '@/components/ui/fields/Field.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import OrderModal from '@/components/elements/order-modal/OrderModal.tsx';
import {useForm, Controller} from 'react-hook-form';

const CreateOrder: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useTypedRoute<'CreateOrderPage'>();
  const navigation = useTypedNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const product = route.params.product;

  const handleCreateOrder = (data: any) => {
    setModalVisible(true);
    console.log('Form Data: ', JSON.stringify(data));
  };

  const handleBackToHome = () => {
    setModalVisible(false);
    navigation.replace('TabNavigation');
  };

  return (
    <Layout>
      <ScrollView>
        <RalewayText weight={600} className={'text-lg text-center mt-10'}>
          Создание заказа
        </RalewayText>

        <RalewayText weight={500} className={'text-base mt-3'}>
          Контактная информация
        </RalewayText>

        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Номер телефона
          </RalewayText>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{required: 'Номер телефона обязателен'}}
            render={({field: {onChange, value}}) => (
              <Field
                value={value}
                controllerOnChange={onChange}
                textContentType={'telephoneNumber'}
                keyboardType={'numeric'}
                className={'mt-4'}
                placeholder={'+7 *** *** ** **'}
              />
            )}
          />
          {errors.phoneNumber && (
            <RalewayText weight={500} className={'text-red-600 mt-1'}>
              {errors.phoneNumber.message?.toString()}
            </RalewayText>
          )}
        </View>

        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Город
          </RalewayText>
          <Controller
            control={control}
            name="city"
            rules={{required: 'Город обязателен'}}
            render={({field: {onChange, value}}) => (
              <Field
                value={value}
                controllerOnChange={onChange}
                textContentType={'addressCity'}
                className={'mt-4'}
                placeholder={'Москва'}
              />
            )}
          />
          {errors.city && (
            <RalewayText weight={500} className={'text-red-600 mt-1'}>
              {errors.city.message?.toString()}
            </RalewayText>
          )}
        </View>

        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Улица, дом, кв
          </RalewayText>
          <Controller
            control={control}
            name="address"
            rules={{required: 'Адрес обязателен'}}
            render={({field: {onChange, value}}) => (
              <Field
                value={value}
                controllerOnChange={onChange}
                textContentType={'addressCity'}
                className={'mt-4'}
                placeholder={'Набережный проспект 21, 44'}
              />
            )}
          />
          {errors.address && (
            <RalewayText weight={500} className={'text-red-600 mt-1'}>
              {errors.address.message?.toString()}
            </RalewayText>
          )}
        </View>

        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Комментарий
          </RalewayText>
          <Controller
            control={control}
            name="comment"
            render={({field: {onChange, value}}) => (
              <Field
                value={value}
                controllerOnChange={onChange}
                className={'mt-4'}
              />
            )}
          />
          {errors.comment && (
            <RalewayText weight={500} className={'text-red-600 mt-1'}>
              {errors.comment.message?.toString()}
            </RalewayText>
          )}
        </View>

        <View className={'flex-row justify-between mt-4'}>
          <RalewayText weight={500} className={'text-base text-gray-600'}>
            Сумма:
          </RalewayText>
          <RalewayText weight={600} className={'font-bold'}>
            ₽{product.price}
          </RalewayText>
        </View>

        <View className={'flex-row justify-between mt-4'}>
          <RalewayText weight={500} className={'text-base text-gray-600'}>
            Доставка:
          </RalewayText>
          <RalewayText weight={600} className={'font-bold'}>
            ₽300.00
          </RalewayText>
        </View>

        <View className={'border-b border-dashed h-4'}></View>

        <View className={'flex-row justify-between mt-4'}>
          <RalewayText weight={500} className={'text-base text-gray-600'}>
            Итого:
          </RalewayText>
          <RalewayText weight={600} className={'font-bold'}>
            ₽{product.price + 300}
          </RalewayText>
        </View>

        <BigBlueButton
          onPress={handleSubmit(handleCreateOrder)}
          className={'mt-6 mb-6'}>
          Подтвердить
        </BigBlueButton>

        <OrderModal visible={modalVisible} onClose={handleBackToHome} />
      </ScrollView>
    </Layout>
  );
};

export default CreateOrder;
