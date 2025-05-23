import React, {FC, useEffect, useMemo, useState} from 'react';
import {Image, Modal, Pressable, FlatList, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {
  manBrands,
  womanBrands,
} from '../../../../../data/slyle-selection-data.tsx';
import {TypeBrand} from '../../../../../data/style-selection-types.ts';
import Check from '@/assets/icons/check/check.svg';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';
import {UseFormSetValue} from 'react-hook-form';

interface IStyleSectionTwoProps {
  gender: string;
  setValue: UseFormSetValue<StyleCardFormValues>;
}

const StyleSectionTwo: FC<IStyleSectionTwoProps> = ({gender, setValue}) => {
  const [zoomedBrand, setZoomedBrand] = useState<TypeBrand | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = useMemo(
    () => (gender === 'Мужской' ? manBrands : womanBrands),
    [gender],
  );
  const isSelected = (brand: TypeBrand) =>
    selectedBrands.some(selected => selected === brand.name);

  const toggleBrandSelection = (brand: TypeBrand) => {
    const newSelectedBrands = isSelected(brand)
      ? selectedBrands.filter(selected => selected !== brand.name)
      : [...selectedBrands, brand.name];

    setSelectedBrands(newSelectedBrands);
    setValue('brands', newSelectedBrands);
  };

  return (
    <>
      <RalewayText weight={600} className={'text-lg mt-5'}>
        Стиль каких брендов вам нравится?
      </RalewayText>
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        data={brands}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View className="items-center p-4">
            <Pressable
              onLongPress={() => setZoomedBrand(item)}
              onPress={() => toggleBrandSelection(item)}>
              <Image source={item.image} style={{width: 150, height: 150}} />

              {isSelected(item) && (
                <View className="absolute -top-2 -left-2 w-6 h-6 bg-black rounded-full items-center justify-center">
                  <Check height={20} width={20} />
                </View>
              )}
            </Pressable>
          </View>
        )}
      />

      <Modal visible={!!zoomedBrand} transparent={true} animationType="fade">
        <Pressable
          className={'flex-1 bg-black opacity-90 justify-center items-center'}
          onPress={() => setZoomedBrand(null)}>
          {zoomedBrand && (
            <Image
              source={zoomedBrand.image}
              style={{width: '90%', height: '70%', resizeMode: 'contain'}}
            />
          )}
        </Pressable>
      </Modal>
    </>
  );
};

export default StyleSectionTwo;
