import React, {FC} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import Field from '@/components/ui/fields/Field.tsx';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';

interface IStyleSectionFourProps {
  control: Control<StyleCardFormValues>;
  errors: FieldErrors<StyleCardFormValues>;
}
const StyleSectionFour: FC<IStyleSectionFourProps> = ({control, errors}) => {
  return (
    <>
      <RalewayText weight={600} className={'text-sm mt-5'}>
        Расскажите нам, сколько вы обычно тратите на эти вещи, и мы подберем их
        для вас в комфортном бюджете.
      </RalewayText>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Ваш бюджет на всю подборку?*
      </RalewayText>

      <RalewayText weight={400} className={'text-sm mt-3'}>
        Цена подборки не будет превышать указанную цену.
      </RalewayText>

      <Controller
        control={control}
        name="totalPrice"
        rules={{required: 'Обязательное поле'}}
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            keyboardType={'numeric'}
            className={'mt-4'}
          />
        )}
      />
      {errors.totalPrice && (
        <RalewayText weight={500} className={'text-red-600 mt-1'}>
          {errors.totalPrice.message?.toString()}
        </RalewayText>
      )}

      <RalewayText weight={600} className={'text-sm mt-5'}>
        Укажите, сколько вы готовы потратить на вещи по отдельности. Указывайте
        среднюю цену — мы будем подбирать в пределах 30% от вашей цены. Если вы
        не хотите видеть вещь в подборке, оставьте поле пустым.
      </RalewayText>

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Футболка (₽)
      </RalewayText>

      <Controller
        control={control}
        name="t-shirt"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Поло (₽)
      </RalewayText>

      <Controller
        control={control}
        name="polo"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Рубашка (₽)
      </RalewayText>

      <Controller
        control={control}
        name="shirt"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Свитер (₽)
      </RalewayText>

      <Controller
        control={control}
        name="sweater"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Худи (₽)
      </RalewayText>

      <Controller
        control={control}
        name="hoodie"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Джинсы (₽)
      </RalewayText>

      <Controller
        control={control}
        name="jeans"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Брюки (₽)
      </RalewayText>

      <Controller
        control={control}
        name="trousers"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Шорты (₽)
      </RalewayText>

      <Controller
        control={control}
        name="shorts"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Пиджак или блейзер (₽)
      </RalewayText>

      <Controller
        control={control}
        name="blazer"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Куртка (₽)
      </RalewayText>

      <Controller
        control={control}
        name="jacket"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Пальто (₽)
      </RalewayText>

      <Controller
        control={control}
        name="coat"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Обувь (₽)
      </RalewayText>

      <Controller
        control={control}
        name="shoes"
        render={({field: {onChange, value}}) => (
          <Field
            value={value}
            controllerOnChange={onChange}
            textContentType={'name'}
            className={'mt-4'}
          />
        )}
      />

      <RalewayText weight={600} className={'text-lg mt-5'}>
        Аксессуары (₽)
      </RalewayText>

      <Controller
        control={control}
        name="accessories"
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

export default StyleSectionFour;
