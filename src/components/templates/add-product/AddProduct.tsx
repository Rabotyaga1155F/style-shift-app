import React, {FC, useState} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Controller} from 'react-hook-form';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {Dropdown} from 'react-native-element-dropdown';
import Field from '@/components/ui/fields/Field.tsx';
import {ISizeItem} from '@/components/pages/add-product/AddProduct.tsx';

interface IAddProductProps {
  control: any;
  handleSubmit: any;
  errors: any;
  categories: any;

  handleAddProduct: any;
  pickImage: any;
  imageUri: any;
  sizesJson: ISizeItem[];
  setSizesJson: React.Dispatch<React.SetStateAction<ISizeItem[]>>;
}

const AddProduct: FC<IAddProductProps> = ({
  errors,
  control,
  handleSubmit,
  categories,
  handleAddProduct,
  pickImage,
  imageUri,
  sizesJson,
  setSizesJson,
}) => {
  const handleSizeChange = (index: number, newStock: string) => {
    const updatedSizes = [...sizesJson];
    updatedSizes[index].stock = parseInt(newStock) || 0;
    setSizesJson(updatedSizes);
  };

  const handleAddSize = () => {
    setSizesJson(prev => [...prev, {size: '', stock: 1}]);
  };

  const handleSizeTextChange = (index: number, newSize: string) => {
    const updatedSizes = [...sizesJson];
    updatedSizes[index].size = newSize;
    setSizesJson(updatedSizes);
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            rules={{required: 'Обязательное поле'}}
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
            rules={{required: 'Обязательное поле'}}
            render={({field: {onChange, value}}) => (
              <Field
                className={'mt-4 h-32'}
                multiline
                numberOfLines={4}
                style={{minHeight: 120, textAlignVertical: 'top'}}
                value={value}
                controllerOnChange={onChange}
                textContentType={'name'}
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
            rules={{required: 'Обязательное поле'}}
            render={({field: {onChange, value}}) => (
              <Dropdown
                iconColor={'#48B2E7'}
                data={categories.map((cat: any) => ({
                  label: cat.categoryName,
                  value: cat.categoryID,
                }))}
                value={value}
                onChange={item => {
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
            rules={{
              required: 'Обязательное поле',
              min: {
                value: 1,
                message: 'Цена не может быть меньше 1',
              },
            }}
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

        <RalewayText weight={600} className="text-lg text-center mt-4">
          Размеры и количество
        </RalewayText>

        {sizesJson.map((size, index) => (
          <View key={index} className="mt-4 flex-row items-center gap-x-2">
            <View className="flex-[3]">
              <Field
                value={size.size}
                controllerOnChange={value => handleSizeTextChange(index, value)}
                placeholder="Размер"
              />
            </View>
            <View className="flex-[2]">
              <Field
                value={size.stock.toString()}
                controllerOnChange={value => handleSizeChange(index, value)}
                placeholder="Кол-во"
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}

        <BigBlueButton onPress={handleAddSize} className="mt-4">
          <RalewayText weight={500} className="text-white text-center">
            Добавить размер
          </RalewayText>
        </BigBlueButton>

        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Изображение
          </RalewayText>

          <TouchableOpacity onPress={pickImage} className={'mt-4 items-center'}>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={{width: 200, height: 200, borderRadius: 10}}
              />
            ) : (
              <RalewayText weight={500} className={'text-blue-500'}>
                Выбрать изображение из галереи
              </RalewayText>
            )}
          </TouchableOpacity>

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
      </ScrollView>
    </Layout>
  );
};

export default AddProduct;
