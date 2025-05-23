import React, {FC, useState} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {View} from 'react-native';
import {
  colors,
  interests,
  messengers,
} from '../../../../../data/slyle-selection-data.tsx';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';
import {useAuthUserStore} from '@/store/access-token';

interface IStyleSectionSixProps {
  control: Control<StyleCardFormValues>;
  errors: FieldErrors<StyleCardFormValues>;
  setValue: UseFormSetValue<StyleCardFormValues>;
}
const StyleSectionSix: FC<IStyleSectionSixProps> = ({
  errors,
  control,
  setValue,
}) => {
  const [selectedMessengers, setSelectedMessengers] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const email = useAuthUserStore(state => state.user!.email);

  const toggleMessengerSelection = (messenger: string) => {
    setSelectedMessengers(prev => {
      const newSelected = prev.includes(messenger)
        ? prev.filter(item => item !== messenger)
        : [...prev, messenger];

      setValue('messengers', newSelected);
      return newSelected;
    });
  };

  const toggleInterestSelection = (interest: string) => {
    setSelectedInterests(prev => {
      const newSelected = prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest];

      setValue('interests', newSelected);
      return newSelected;
    });
  };

  return (
    <>
      <RalewayText weight={600} className={'text-lg mt-5'}>
        Мессенджер для общения со стилистом?
      </RalewayText>

      <View className="mt-4">
        {messengers.map((messenger, index) => (
          <View key={index} className="flex-row items-center my-2">
            <BouncyCheckbox
              isChecked={selectedMessengers.includes(messenger)}
              onPress={() => toggleMessengerSelection(messenger)}
              fillColor="#48B2E7"
              text={messenger}
              textStyle={{
                textDecorationLine: 'none',
                color: 'FFFFFF',
                fontFamily: 'Raleway-Regular-Bold',
              }}
            />
            <RalewayText weight={500} className="ml-2">
              {messenger}
            </RalewayText>
          </View>
        ))}
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш e-mail*
      </RalewayText>

      <Controller
        control={control}
        name="email"
        defaultValue={email}
        rules={{
          pattern: {
            value: /^(|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10})$/,
            message: 'Некорректный email',
          },
        }}
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'emailAddress'}
            keyboardType={'email-address'}
            className={'mt-4'}
          />
        )}
      />

      {errors.email && (
        <RalewayText weight={500} className={'text-red-600 mt-1'}>
          {errors.email.message?.toString()}
        </RalewayText>
      )}

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш мобильный телефон*
      </RalewayText>

      <Controller
        control={control}
        name="phone"
        rules={{
          required: 'Обязательное поле',
          pattern: {
            value: /^(\+7|8)[0-9]{10}$/,
            message: 'Некорректный номер телефона',
          },
        }}
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'telephoneNumber'}
            keyboardType={'phone-pad'}
            className={'mt-4'}
          />
        )}
      />

      {errors.phone && (
        <RalewayText weight={500} className={'text-red-600 mt-1'}>
          {errors.phone.message?.toString()}
        </RalewayText>
      )}

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Как мы можем найти вас в социальных сетях?
      </RalewayText>

      <Controller
        control={control}
        name="socials"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
            placeholder={'Это позволит стилисту лучше вас узнать'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Что для ваc более важно?
      </RalewayText>

      <View className="mt-4">
        {interests.map((interest, index) => (
          <View key={index} className="flex-row items-center my-2">
            <BouncyCheckbox
              isChecked={selectedInterests.includes(interest)}
              onPress={() => toggleInterestSelection(interest)}
              fillColor="#48B2E7"
              text={interest}
              textStyle={{
                textDecorationLine: 'none',
                color: 'FFFFFF',
                fontFamily: 'Raleway-Regular-Bold',
              }}
            />
            <RalewayText weight={500} className="ml-2">
              {interest}
            </RalewayText>
          </View>
        ))}
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Пожелания, ограничения, комментарии
      </RalewayText>

      <Controller
        control={control}
        name="wishes"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />
    </>
  );
};

export default StyleSectionSix;
