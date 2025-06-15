import React, {FC, useEffect} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Controller} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {launchImageLibrary} from 'react-native-image-picker';
import {ISize} from '@/types/product.types.ts';

interface IEditProduct {
  control: any;
  errors: any;
  handleSubmit: any;
  product: any;
  deleteProduct: any;
  handleCreateOrder: any;
  setSizesJson: any;
  sizesJson: ISize[];
}

const EditProduct: FC<IEditProduct> = ({
  deleteProduct,
  handleCreateOrder,
  handleSubmit,
  product,
  control,
  errors,
  sizesJson,
  setSizesJson,
}) => {
  useEffect(() => {
    console.log(product);
  }, []);

  const handleSizeChange = (index: number, value: string) => {
    // Проверяем, является ли строка положительным целым числом
    if (/^\d+$/.test(value)) {
      const updatedSizes = sizesJson.map((sizeData, idx) =>
        idx === index ? {...sizeData, stock: Number(value)} : sizeData,
      );
      setSizesJson(updatedSizes);
    } else if (value === '') {
      // Разрешаем очистку поля (например, пользователь удаляет значение)
      const updatedSizes = sizesJson.map((sizeData, idx) =>
        idx === index ? {...sizeData, stock: 0} : sizeData,
      );
      setSizesJson(updatedSizes);
    }
    // В противном случае не обновляем sizesJson
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RalewayText weight={600} className={'text-lg text-center mt-10'}>
          Редактировать товар
        </RalewayText>

        {/* Название товара */}
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

        {/* Описание товара */}
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

        {/* Цена товара */}
        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Цена
          </RalewayText>
          <Controller
            control={control}
            name="price"
            rules={{
              required: 'Обязательное поле',
              validate: value => {
                const number = Number(value);
                if (!/^\d+$/.test(value)) {
                  return 'Цена должна быть целым положительным числом';
                }
                if (number < 1) {
                  return 'Цена не может быть меньше 1';
                }
                if (value.length > 7) {
                  return 'Цена не может быть больше 7 цифр';
                }
                return true;
              },
            }}
            render={({field: {onChange, value}}) => (
              <Field
                maxLength={7}
                value={value}
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

        {/* Фотография */}
        <View className={'mt-4'}>
          <RalewayText weight={500} className={'text-md mt-1'}>
            Фотография
          </RalewayText>
          <Controller
            control={control}
            name="imageUrl"
            render={({field: {onChange, value}}) => (
              <View className="mt-4 items-center">
                <TouchableOpacity
                  onPress={async () => {
                    const result = await launchImageLibrary({
                      mediaType: 'photo',
                      quality: 1,
                    });

                    if (
                      !result.didCancel &&
                      result.assets &&
                      result.assets.length > 0
                    ) {
                      onChange(result.assets[0]?.uri);
                    }
                  }}>
                  {value ? (
                    <Image
                      source={{uri: value}}
                      style={{width: 200, height: 200, borderRadius: 10}}
                    />
                  ) : (
                    <RalewayText weight={500} className={'text-gray-500'}>
                      Изображение не выбрано
                    </RalewayText>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.imageUrl && (
            <RalewayText weight={500} className={'text-red-600 mt-1'}>
              {errors.imageUrl.message?.toString()}
            </RalewayText>
          )}
        </View>

        {/* Изменение количества размеров */}
        <View className={'mt-6'}>
          <RalewayText weight={600} className={'text-lg text-center mt-4'}>
            Размеры и количество
          </RalewayText>
          {sizesJson.map((size, index) => (
            <View key={index} className="mt-4 flex-row items-center">
              <RalewayText weight={500} className="text-md flex-1">
                Размер: {size.size}
              </RalewayText>
              <Field
                maxLength={4}
                value={size.stock.toString()}
                controllerOnChange={value => handleSizeChange(index, value)}
                className="flex-1 w-32"
                defaultValue={size.stock.toString()}
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>

        {/* Кнопка для сохранения изменений */}
        <BigBlueButton
          onPress={handleSubmit(handleCreateOrder)}
          className={'mt-12'}>
          Изменить
        </BigBlueButton>

        {/* Кнопка для удаления товара */}
        <BigBlueButton
          onPress={deleteProduct}
          className={'bg-red-700 mt-6 mb-6'}>
          Удалить товар
        </BigBlueButton>
      </ScrollView>
    </Layout>
  );
};

export default EditProduct;
