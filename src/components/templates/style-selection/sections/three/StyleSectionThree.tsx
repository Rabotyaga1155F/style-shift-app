import React, {FC, useMemo, useState} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {FlatList, Image, Modal, Pressable, View} from 'react-native';
import Check from '@/assets/icons/check/check.svg';
import {TypeStyle} from '../../../../../data/style-selection-types.ts';
import {
  manStyles,
  womanStyles,
} from '../../../../../data/slyle-selection-data.tsx';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';
import {UseFormSetValue} from 'react-hook-form';

interface IStyleSectionThreeProps {
  gender: string;
  setValue: UseFormSetValue<StyleCardFormValues>;
}
const StyleSectionThree: FC<IStyleSectionThreeProps> = ({gender, setValue}) => {
  const [zoomedStyle, setZoomedStyle] = useState<TypeStyle | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const styles = useMemo(
    () => (gender === 'Мужской' ? manStyles : womanStyles),
    [gender],
  );
  const isSelected = (style: TypeStyle) =>
    selectedStyles.some(selected => selected === style.name);

  const toggleStyleSelection = (style: TypeStyle) => {
    const newSelectedStyles = isSelected(style)
      ? selectedStyles.filter(selected => selected !== style.name)
      : [...selectedStyles, style.name];

    setSelectedStyles(newSelectedStyles);
    setValue('styles', newSelectedStyles);
  };

  return (
    <>
      <RalewayText weight={600} className={'text-lg mt-5'}>
        Выберите, какие стили вам наиболее близки
      </RalewayText>
      <FlatList
        scrollEnabled={false}
        numColumns={2}
        data={styles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View className="items-center p-4">
            <Pressable
              onLongPress={() => setZoomedStyle(item)}
              onPress={() => toggleStyleSelection(item)}>
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

      <Modal visible={!!zoomedStyle} transparent={true} animationType="fade">
        <Pressable
          className={'flex-1 bg-black opacity-90 justify-center items-center'}
          onPress={() => setZoomedStyle(null)}>
          {zoomedStyle && (
            <Image
              source={zoomedStyle.image}
              style={{width: '90%', height: '70%', resizeMode: 'contain'}}
            />
          )}
        </Pressable>
      </Modal>
    </>
  );
};

export default StyleSectionThree;
