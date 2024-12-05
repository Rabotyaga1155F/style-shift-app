import React, {FC} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {View} from 'react-native';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {Dropdown} from 'react-native-element-dropdown';
import Field from '@/components/ui/fields/Field.tsx';
import {ICategory} from '@/types/category.types.ts';

interface IAddProductProps {
  control: any;
  handleSubmit: any;
  errors: any;
  categories: any;
  selectedCategory: any;
  setSelectedCategory: any;
  handleAddProduct: any;
}

const AddProduct: FC<IAddProductProps> = ({
  errors,
  control,
  handleSubmit,
  setSelectedCategory,
  selectedCategory,
  categories,
  handleAddProduct,
}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Добавить товар
      </RalewayText>

      <View className={'mt-4'}>
        <RalewayText weight={500} className={'text-md mt-1'}>
          Название
        </RalewayText>
        <Controller
          control={control}
          name="title"
          rules={{required: 'Название обязателено'}}
          render={({field: {onChange, value}}) => (
            <Field
              value={value}
              controllerOnChange={onChange}
              textContentType={'name'}
              className={'mt-4'}
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
          rules={{required: 'Описание обязателено'}}
          render={({field: {onChange, value}}) => (
            <Field
              value={value}
              controllerOnChange={onChange}
              textContentType={'name'}
              className={'mt-4'}
            />
          )}
        />
        {errors.description && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.description.message?.toString()}
          </RalewayText>
        )}
      </View>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="category"
          rules={{required: 'Категория обязателена'}}
          render={({field: {onChange}}) => (
            <Dropdown
              data={categories.map((cat: any) => ({
                label: cat.categoryName,
                value: cat.categoryID,
              }))}
              value={selectedCategory?.categoryName}
              onChange={item => {
                setSelectedCategory(item.value);
                onChange(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Выберите категорию"
            />
          )}
        />
        {errors.category && (
          <RalewayText weight={500} className={'text-red-600 mt-1'}>
            {errors.category?.message?.toString()}
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
          rules={{required: 'Цена обязателена'}}
          render={({field: {onChange, value}}) => (
            <Field
              value={value}
              controllerOnChange={onChange}
              keyboardType={'numeric'}
              className={'mt-4'}
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
          URL изображения
        </RalewayText>
        <Controller
          control={control}
          name="imageUrl"
          rules={{required: 'Фото обязателено'}}
          render={({field: {onChange, value}}) => (
            <Field
              value={value}
              controllerOnChange={onChange}
              keyboardType={'url'}
              className={'mt-4'}
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
        onPress={handleSubmit(handleAddProduct)}
        className={'mt-6 mb-6'}>
        Подтвердить
      </BigBlueButton>
    </Layout>
  );
};

export default AddProduct;
