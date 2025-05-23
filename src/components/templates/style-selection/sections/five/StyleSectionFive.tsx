import React, {FC, useState} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {Dropdown} from 'react-native-element-dropdown';
import {
  colors,
  jeansSizes,
  legsSizes,
  materials,
  pantsSizes,
  peculiarities,
  shirtSizes,
  shoesSizes,
} from '../../../../../data/slyle-selection-data.tsx';
import {FlatList, Image, Pressable, View} from 'react-native';
import Check from '@/assets/icons/check/check.svg';
import {TypeStyle} from '../../../../../data/style-selection-types.ts';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';

interface IStyleSectionFiveProps {
  control: Control<StyleCardFormValues>;
  errors: FieldErrors<StyleCardFormValues>;
  setValue: UseFormSetValue<StyleCardFormValues>;
  getValues: UseFormGetValues<StyleCardFormValues>;
}
const StyleSectionFive: FC<IStyleSectionFiveProps> = ({
  control,
  errors,
  setValue,
}) => {
  const [selectedShirtSize, setSelectedShirtSize] = useState('');
  const [selectedPantsSize, setSelectedPantsSize] = useState('');
  const [selectedJeansSize, setSelectedJeansSize] = useState('');
  const [selectedLegsSize, setSelectedLegsSize] = useState('');
  const [selectedShoesSize, setSelectedShoesSize] = useState('');
  const [selectedPeculiarities, setSelectedPeculiarities] = useState<string[]>(
    [],
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const isSelected = (peculiarities: TypeStyle) =>
    selectedPeculiarities.some(selected => selected === peculiarities.name);

  const togglePeculiaritiesSelection = (peculiarities: TypeStyle) => {
    const newSelectedPeculiarities = isSelected(peculiarities)
      ? selectedPeculiarities.filter(
          selected => selected !== peculiarities.name,
        )
      : [...selectedPeculiarities, peculiarities.name];

    setSelectedPeculiarities(newSelectedPeculiarities);
    setValue('peculiarities', newSelectedPeculiarities);
  };

  const toggleMaterialSelection = (material: string) => {
    setSelectedMaterials(prev => {
      const newSelected = prev.includes(material)
        ? prev.filter(item => item !== material)
        : [...prev, material];

      setValue('materials', newSelected);
      return newSelected;
    });
  };

  const toggleColorSelection = (color: string) => {
    setSelectedColors(prev => {
      const newSelected = prev.includes(color)
        ? prev.filter(item => item !== color)
        : [...prev, color];

      setValue('colors', newSelected);
      return newSelected;
    });
  };

  return (
    <>
      <RalewayText weight={700} className={'text-xl text-center mt-5'}>
        Укажите размеры
      </RalewayText>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш рост*
      </RalewayText>

      <Controller
        control={control}
        name="height"
        rules={{required: 'Обязательное поле'}}
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            keyboardType={'numeric'}
            className={'mt-4'}
            placeholder={'см'}
          />
        )}
      />
      {errors.height && (
        <RalewayText weight={500} className={'text-red-600 mt-1'}>
          {errors.height.message?.toString()}
        </RalewayText>
      )}
      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш размер (футболка, рубашка, свитер)
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="shirtSize"
          render={({field: {onChange}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={shirtSizes.map((size: string) => ({
                label: size,
                value: size,
              }))}
              value={selectedShirtSize}
              onChange={item => {
                setSelectedShirtSize(item.value);
                onChange(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Выберите размер"
            />
          )}
        />
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш размер талии (брюки)
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="pantsSize"
          render={({field: {onChange}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={pantsSizes.map((size: string) => ({
                label: size,
                value: size,
              }))}
              value={selectedPantsSize}
              onChange={item => {
                setSelectedPantsSize(item.value);
                onChange(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Выберите размер"
            />
          )}
        />
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш размер талии (джинсы)
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="jeansSize"
          render={({field: {onChange}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={jeansSizes.map((size: string) => ({
                label: size,
                value: size,
              }))}
              value={selectedJeansSize}
              onChange={item => {
                setSelectedJeansSize(item.value);
                onChange(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Выберите размер"
            />
          )}
        />
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Длина ног
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="legsSize"
          render={({field: {onChange}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={legsSizes.map((size: string) => ({
                label: size,
                value: size,
              }))}
              value={selectedLegsSize}
              onChange={item => {
                setSelectedLegsSize(item.value);
                onChange(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Выберите размер"
            />
          )}
        />
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш размер обуви
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="shoesSize"
          render={({field: {onChange}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={shoesSizes.map((size: string) => ({
                label: size,
                value: size,
              }))}
              value={selectedShoesSize}
              onChange={item => {
                setSelectedShoesSize(item.value);
                onChange(item.value);
              }}
              labelField="label"
              valueField="value"
              placeholder="Выберите размер"
            />
          )}
        />
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваши параметры (Укажите через "-" обхват груди, талии и бёдер)
      </RalewayText>

      <Controller
        control={control}
        name="girths"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
            placeholder={'90-60-90'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Особенности фигуры
      </RalewayText>
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        data={peculiarities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View className="items-center p-4">
            <Pressable onPress={() => togglePeculiaritiesSelection(item)}>
              <Image source={item.image} style={{width: 155, height: 220}} />

              {isSelected(item) && (
                <View className="absolute -top-2 -left-2 w-6 h-6 bg-black rounded-full items-center justify-center">
                  <Check height={20} width={20} />
                </View>
              )}
            </Pressable>
          </View>
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Какие материалы вы предпочитаете?
      </RalewayText>

      <View className="mt-4">
        {materials.map((material, index) => (
          <View key={index} className="flex-row items-center my-2">
            <BouncyCheckbox
              isChecked={selectedMaterials.includes(material)}
              onPress={() => toggleMaterialSelection(material)}
              fillColor="#48B2E7"
              text={material}
              textStyle={{
                textDecorationLine: 'none',
                color: 'FFFFFF',
                fontFamily: 'Raleway-Regular-Bold',
              }}
            />
            <RalewayText weight={500} className="ml-2">
              {material}
            </RalewayText>
          </View>
        ))}
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Какие цвета вы предпочитаете?
      </RalewayText>

      <View className="mt-4">
        {colors.map((color, index) => (
          <View key={index} className="flex-row items-center my-2">
            <BouncyCheckbox
              isChecked={selectedColors.includes(color)}
              onPress={() => toggleColorSelection(color)}
              fillColor="#48B2E7"
              text={color}
              textStyle={{
                textDecorationLine: 'none',
                color: 'FFFFFF',
                fontFamily: 'Raleway-Regular-Bold',
              }}
            />
            <RalewayText weight={500} className="ml-2">
              {color}
            </RalewayText>
          </View>
        ))}
      </View>
    </>
  );
};

export default StyleSectionFive;
