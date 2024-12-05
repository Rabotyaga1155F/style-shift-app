import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Controller} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {View} from 'react-native';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';

interface IEditProduct {
  control: any;
  errors: any;
  handleSubmit: any;
  product: any;
  deleteProduct: any;
  handleCreateOrder: any;
}

const EditProduct: FC<IEditProduct> = ({
  deleteProduct,
  handleCreateOrder,
  handleSubmit,
  product,
  control,
  errors,
}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Редактировать товар
      </RalewayText>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Название
        </RalewayText>
        <Controller
          control={control}
          name="title"
          render={({field: {onChange, value}}) => (
            <Field
              value={value || product.title}
              controllerOnChange={onChange}
              className={'mt-4'}
              defaultValue={product.title}
            />
          )}
        />
        {errors.title && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.title.message?.toString()}
          </RalewayText>
        )}
      </View>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Описание
        </RalewayText>
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, value}}) => (
            <Field
              value={value || product.description}
              controllerOnChange={onChange}
              className={'mt-4'}
              defaultValue={product.description}
            />
          )}
        />
        {errors.description && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.description.message?.toString()}
          </RalewayText>
        )}
      </View>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Цена
        </RalewayText>
        <Controller
          control={control}
          name="price"
          render={({field: {onChange, value}}) => (
            <Field
              value={value || product.price}
              controllerOnChange={onChange}
              className={'mt-4'}
              defaultValue={product.price.toString()}
            />
          )}
        />
        {errors.price && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.price.message?.toString()}
          </RalewayText>
        )}
      </View>
      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Фотография
        </RalewayText>
        <Controller
          control={control}
          name="imageUrl"
          render={({field: {onChange, value}}) => (
            <Field
              value={value || product.imageUrl}
              controllerOnChange={onChange}
              className={'mt-4'}
              defaultValue={product.imageUrl}
            />
          )}
        />
        {errors.imageUrl && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.imageUrl.message?.toString()}
          </RalewayText>
        )}
      </View>
      <BigBlueButton
        onPress={handleSubmit(handleCreateOrder)}
        className={'mt-12'}>
        Изменить
      </BigBlueButton>
      <BigBlueButton onPress={deleteProduct} className={'bg-red-700 mt-6'}>
        Удалить заказ
      </BigBlueButton>
    </Layout>
  );
};

export default EditProduct;
