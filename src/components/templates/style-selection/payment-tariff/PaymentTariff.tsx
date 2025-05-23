import React, {FC, useState} from 'react';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import TariffCard from '@/components/templates/style-selection/payment-tariff/tariff-card/TariffCard.tsx';
import {
  ScrollView,
  Modal,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {WebView} from 'react-native-webview';
import Cancel from '@/assets/icons/cancel/cancel.svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';
import {IUserQuiz} from '@/types/quiz.types.ts';
import {STATUS_MAPPING} from '@/components/templates/style-selection/statuses.ts';

interface IPaymentTariffProps {
  userQuiz: IUserQuiz;
  checkQuiz: () => void;
  setStep: any;
}

const PaymentTariff: FC<IPaymentTariffProps> = ({
  userQuiz,
  checkQuiz,
  setStep,
}) => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState('');

  const capturePayment = async (paymentId: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/capture-payment`, {
        paymentId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteStyleCard = async (cardId: string) => {
    try {
      await axios.delete(`${BASE_URL}/style-cards/${cardId}`);
      checkQuiz();
    } catch (error) {
      console.log('Ошибка обновления статуса:', error);
    }
  };

  const updateStyleCardStatus = async (cardId: string, statusId: string) => {
    try {
      await axios.patch(`${BASE_URL}/style-cards/${cardId}/status`, {
        statusId,
      });
      checkQuiz();
    } catch (error) {
      console.log('Ошибка обновления статуса:', error);
    }
  };

  const createPayment = async (
    amount: number,
    description: string,
    returnUrl: string,
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment/create-payment`, {
        amount,
        description,
        returnUrl,
      });
      setPaymentUrl(response.data.confirmationUrl);
      setPaymentId(response.data.paymentId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        Карта заполнена
      </RalewayText>
      <RalewayText weight={600} className={'text-lg text-center mt-3'}>
        Статус - {userQuiz.status.name}
      </RalewayText>

      <RalewayText weight={800} className={'text-xl text-center mt-3'}>
        Завершите оформление
      </RalewayText>

      <TariffCard
        className={'mt-12'}
        tariffName={'Basic'}
        price={'4 590'}
        onButtonPress={() => {
          createPayment(4590, 'Тариф Basic', 'style-shift://style-selection');
        }}
        description={
          'Желаете уделить больше внимания вашему стилю? Профессиональный стилист направит вам персонализированный образ из 7 вещей с рекомендациями по стилю и в течение 24 часов ответит на все вопросы. Закажите вещи по прямым ссылкам.'
        }
      />

      <TariffCard
        className={'mt-12'}
        tariffName={'Plus'}
        price={'9 990'}
        onButtonPress={() => {
          createPayment(9990, 'Тариф Plus', 'style-shift://style-selection');
        }}
        description={
          'Еще больше вариантов образов в гардеробе! Профессиональный стилист направит вам персонализированную подборку с 5 образами из 15 вещей и рекомендации по стилю. В течение 24 часов стилист сможет заменить вещи и ответить на любые вопросы. Закажите вещи по прямым ссылкам.'
        }
      />

      <TariffCard
        className={'mt-12 mb-6'}
        tariffName={'Heat'}
        price={'17 590'}
        onButtonPress={() => {
          createPayment(17590, 'Тариф Heat', 'style-shift://style-selection');
        }}
        description={
          'Решите вопрос с гардеробом на полгода! Профессиональный стилист проведет онлайн-разбор гардероба, составит образы из вашей одежды и направит список покупок, которые его дополнят. В течение 48 часов стилист направит персонализированный гайд с 12 образами и рекомендациями по стилю, проведет часовую онлайн-консультацию и ответит на все вопросы. Закажите вещи по прямым ссылкам.'
        }
      />
      <TouchableOpacity
        onPress={() => {
          setStep(1);
          deleteStyleCard(userQuiz.styleCardID);
        }}>
        <RalewayText className={'text-gray-500 text-base text-center mb-7'}>
          Отменить заявку
        </RalewayText>
      </TouchableOpacity>

      {paymentUrl && (
        <Modal visible={true} animationType="slide">
          <View className={'flex-1'}>
            <WebView
              source={{uri: paymentUrl}}
              onNavigationStateChange={event => {
                if (event.url.includes('success')) {
                  setPaymentUrl(null);
                  capturePayment(paymentId).then(paymentData => {
                    const amount = paymentData.amount.value;
                    const statusId = STATUS_MAPPING[amount];

                    if (statusId) {
                      console.log('cardId - ' + userQuiz);
                      console.log('statusId - ' + statusId);
                      updateStyleCardStatus(userQuiz.styleCardID, statusId);
                    } else {
                      Alert.alert(
                        'Неизвестная сумма',
                        `Сумма ${amount} не соответствует тарифу.`,
                      );
                    }
                  });
                }

                if (event.url.includes('cancel')) {
                  setPaymentUrl(null);
                  Alert.alert('Оплата отменена');
                }
              }}
            />
            <TouchableOpacity
              onPress={() => setPaymentUrl(null)}
              className={'absolute top-5 right-5'}>
              <Cancel width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default PaymentTariff;
