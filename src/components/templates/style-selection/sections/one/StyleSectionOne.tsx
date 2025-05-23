import React, {FC, useMemo, useState} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {View} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {Dropdown} from 'react-native-element-dropdown';
import {
  goals,
  sphereOfActivity,
} from '../../../../../data/slyle-selection-data.tsx';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';

interface IStyleSectionOneProps {
  control: Control<StyleCardFormValues>;
  errors: FieldErrors<StyleCardFormValues>;
}

const StyleSectionOne: FC<IStyleSectionOneProps> = ({control, errors}) => {
  const [selectedSphere, setSelectedSphere] = useState(sphereOfActivity[0]);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);

  const genderRadioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'Мужской',
        label: 'Мужской',
        value: 'Мужской',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
      {
        id: 'Женский',
        label: 'Женский',
        value: 'Женский',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
    ],
    [],
  );

  const yearRadioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '18-25',
        label: '18-25',
        value: '18-25',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
      {
        id: '25-30',
        label: '25-30',
        value: '25-30',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
      {
        id: '30-40',
        label: '30-40',
        value: '30-40',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
      {
        id: '40-50',
        label: '40-50',
        value: '40-50',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
      {
        id: '>50',
        label: '   >50',
        value: '>50',
        color: '#48B2E7',
        containerStyle: {paddingLeft: 0, marginLeft: 0},
      },
    ],
    [],
  );

  return (
    <>
      <RalewayText weight={600} className={'text-lg mt-5'}>
        Как вас зовут?
      </RalewayText>

      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />
      {errors.name && (
        <RalewayText weight={500} className={'text-red-600 mt-1'}>
          {errors.name.message?.toString()}
        </RalewayText>
      )}

      <Controller
        control={control}
        name="gender"
        rules={{required: 'Обязательное поле'}}
        render={({field: {onChange, value}}) => (
          <>
            <RalewayText weight={600} className={'text-lg mt-5'}>
              Ваш пол:
            </RalewayText>

            <View className={'items-start mt-3'}>
              <RadioGroup
                radioButtons={genderRadioButtons}
                onPress={id => {
                  onChange(id);
                }}
                selectedId={value}
              />
            </View>

            {errors.gender && (
              <RalewayText weight={500} className={'text-red-600 mt-1'}>
                {errors.gender.message?.toString()}
              </RalewayText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="age"
        rules={{required: 'Обязательное поле'}}
        render={({field: {onChange, value}}) => (
          <>
            <RalewayText weight={600} className={'text-lg mt-5'}>
              На сколько лет вы себя ощущаете?
            </RalewayText>

            <View className={'items-start mt-3'}>
              <RadioGroup
                radioButtons={yearRadioButtons}
                onPress={id => {
                  onChange(id);
                }}
                selectedId={value}
              />
            </View>

            {errors.age && (
              <RalewayText weight={500} className={'text-red-600 mt-1'}>
                {errors.age.message?.toString()}
              </RalewayText>
            )}
          </>
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        В какой сфере вы работаете?
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="sphere"
          render={({field: {onChange, value}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={sphereOfActivity.map((sphere: string) => ({
                label: sphere,
                value: sphere,
              }))}
              value={value}
              onChange={item => onChange(item.value)}
              labelField="label"
              valueField="value"
              placeholder="Выберите сферу"
            />
          )}
        />
      </View>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Для чего нужна подборка вещей?
      </RalewayText>

      <View className={'mt-6'}>
        <Controller
          control={control}
          name="goal"
          render={({field: {onChange, value}}) => (
            <Dropdown
              iconColor={'#48B2E7'}
              data={goals.map((goal: string) => ({
                label: goal,
                value: goal,
              }))}
              value={value}
              onChange={item => onChange(item.value)}
              labelField="label"
              valueField="value"
              placeholder="Выберите цель"
            />
          )}
        />
      </View>
    </>
  );
};

export default StyleSectionOne;
