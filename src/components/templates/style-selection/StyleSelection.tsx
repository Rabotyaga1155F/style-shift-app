import React, {FC, RefObject} from 'react';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import {ScrollView, Text, View} from 'react-native';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import StyleSectionOne from '@/components/templates/style-selection/sections/one/StyleSectionOne.tsx';
import StyleSectionTwo from '@/components/templates/style-selection/sections/two/StyleSectionTwo.tsx';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import StyleSectionThree from '@/components/templates/style-selection/sections/three/StyleSectionThree.tsx';
import StyleSectionFour from '@/components/templates/style-selection/sections/four/StyleSectionFour.tsx';
import StyleSectionFive from '@/components/templates/style-selection/sections/five/StyleSectionFive.tsx';
import StyleSectionSix from '@/components/templates/style-selection/sections/six/StyleSectionSix.tsx';
import OrderModal from '@/components/elements/order-modal/OrderModal.tsx';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';
import TariffCard from '@/components/templates/style-selection/payment-tariff/tariff-card/TariffCard.tsx';
import PaymentTariff from '@/components/templates/style-selection/payment-tariff/PaymentTariff.tsx';
import {IUserQuiz} from '@/types/quiz.types.ts';
import {STYLE_CARD_STATUS_MAPPING} from '@/components/templates/style-selection/statuses.ts';
import TariffPaid from '@/components/templates/style-selection/tariff-paid/TariffPaid.tsx';

interface IStyleSelectionProps {
  control: Control<StyleCardFormValues>;
  errors: FieldErrors<StyleCardFormValues>;
  setValue: UseFormSetValue<StyleCardFormValues>;
  step: number;
  setStep: any;
  scrollViewRef: RefObject<ScrollView>;
  onModalClose: () => void;
  handleNextStep: () => void;
  modalVisible: boolean;
  getValues: UseFormGetValues<StyleCardFormValues>;
  userQuiz: IUserQuiz | undefined;
  checkQuiz: () => void;
}

const StyleSelection: FC<IStyleSelectionProps> = ({
  errors,
  control,
  step,
  scrollViewRef,
  setValue,
  onModalClose,
  handleNextStep,
  modalVisible,
  getValues,
  userQuiz,
  checkQuiz,
  setStep,
}) => {
  if (userQuiz?.styleCardStatusID === STYLE_CARD_STATUS_MAPPING.NOT_PAID) {
    return (
      <PaymentTariff
        setStep={setStep}
        userQuiz={userQuiz}
        checkQuiz={checkQuiz}
      />
    );
  }
  if (
    userQuiz?.styleCardStatusID === STYLE_CARD_STATUS_MAPPING.BASIC ||
    userQuiz?.styleCardStatusID === STYLE_CARD_STATUS_MAPPING.PLUS ||
    userQuiz?.styleCardStatusID === STYLE_CARD_STATUS_MAPPING.HEAT
  ) {
    return <TariffPaid />;
  }

  return (
    <Layout>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <RalewayText weight={600} className={'text-lg text-center mt-10'}>
          Карта стиля
        </RalewayText>

        {step === 1 && <StyleSectionOne errors={errors} control={control} />}

        {step === 2 && (
          <StyleSectionTwo
            gender={control._formValues.gender}
            setValue={setValue}
          />
        )}

        {step === 3 && (
          <StyleSectionThree
            gender={control._formValues.gender}
            setValue={setValue}
          />
        )}

        {step === 4 && <StyleSectionFour errors={errors} control={control} />}
        {step === 5 && (
          <StyleSectionFive
            errors={errors}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />
        )}
        {step === 6 && (
          <StyleSectionSix
            errors={errors}
            control={control}
            setValue={setValue}
          />
        )}

        <RalewayText weight={400} className={'text-sm mt-6 text-center'}>
          {step}/6
        </RalewayText>

        <BigBlueButton onPress={handleNextStep} className={'my-2'}>
          {step < 6 ? 'Далее' : 'Отправить'}
        </BigBlueButton>
      </ScrollView>
      <OrderModal
        text={'Анкета успешно заполнена!'}
        buttonText={'Перейти к оформлению'}
        visible={modalVisible}
        onClose={onModalClose}
      />
    </Layout>
  );
};

export default StyleSelection;
