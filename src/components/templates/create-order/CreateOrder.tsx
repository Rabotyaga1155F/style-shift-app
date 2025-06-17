import React, {FC, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import OrderModal from '@/components/elements/order-modal/OrderModal.tsx';
import {IProduct} from '@/types/product.types';
import {DELIVERY_PRICE} from '@/constants/price.constants.ts';
import SelectPickupPointModal from './select-pickup-point-modal/SelectPickupPointModal';
import Yamap, {Marker, YaMap} from 'react-native-yamap';
import Svg, {Circle} from 'react-native-svg';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {WebView} from 'react-native-webview';
import Cancel from '@/assets/icons/cancel/cancel.svg';
import {DEFAULT_ICON_SIZE} from '@/constants/icon.constants.ts';

Yamap.init('263a39f9-f08e-4586-8aaa-8dcaea00f4a3');

interface ICreateOrderProps {
  handleCreateOrder: () => void;
  handleBackToHome: () => void;
  product: IProduct;
  modalVisible: boolean;
  quantity: number;
  calculateTotalPrice: (quantity: number) => number;
  setPickupPointID: (id: string | null) => void;
}

const CreateOrder: FC<ICreateOrderProps> = ({
  handleCreateOrder,
  handleBackToHome,
  product,
  modalVisible,
  quantity,
  calculateTotalPrice,
  setPickupPointID,
}) => {
  const [modalPickupPointVisible, setModalPickupPointVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<any | null>(
    null,
  );
  const [mapKey, setMapKey] = useState(0);

  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState('');

  const openModal = () => setModalPickupPointVisible(true);
  const closeModal = () => setModalPickupPointVisible(false);

  const handleCityAndPickupPointSelection = (city: any, pickupPoint: any) => {
    setSelectedCity(city);
    setSelectedPickupPoint(pickupPoint);
    setMapKey(prevKey => prevKey + 1);
    setPickupPointID(pickupPoint.pickupPointId);
    closeModal();
  };

  const calculatePrice = (quantity: number) => quantity * product.price;

  const getEstimatedDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toLocaleDateString('ru-RU');
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

  return (
    <Layout>
      <SelectPickupPointModal
        visible={modalPickupPointVisible}
        onRequestClose={closeModal}
        onSelect={handleCityAndPickupPointSelection}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <RalewayText weight={700} className="text-xl text-center mt-10">
          Создание заказа
        </RalewayText>

        <RalewayText weight={600} className="text-lg  mt-2">
          Выберите пункт выдачи заказа
        </RalewayText>

        <RalewayText weight={500} className="text-base mt-3">
          Пункт StyleShift:{' '}
          {selectedCity && selectedPickupPoint
            ? `${selectedCity.name}, ${selectedPickupPoint.address}`
            : 'Не выбрано'}
        </RalewayText>

        <BigBlueButton className="mt-3" onPress={openModal}>
          Изменить ПВЗ
        </BigBlueButton>

        {selectedPickupPoint &&
          selectedPickupPoint.latitude &&
          selectedPickupPoint.longitude && (
            <>
              <View className="mt-4 h-64 rounded-lg overflow-hidden">
                <YaMap
                  key={mapKey}
                  initialRegion={{
                    lat: selectedPickupPoint.latitude,
                    lon: selectedPickupPoint.longitude,
                    zoom: 15,
                    azimuth: 0,
                    tilt: 0,
                  }}
                  style={{flex: 1}}>
                  <Marker
                    point={{
                      lat: selectedPickupPoint.latitude,
                      lon: selectedPickupPoint.longitude,
                    }}>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Svg width="20" height="20" viewBox="0 0 40 40">
                        <Circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="#48B2E7"
                          stroke="#fff"
                          strokeWidth="3"
                        />
                      </Svg>
                      <RalewayText
                        style={{
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}>
                        ПВЗ StyleShift
                      </RalewayText>
                    </View>
                  </Marker>
                </YaMap>
              </View>

              <RalewayText
                weight={500}
                className="text-sm text-gray-500 mt-4 text-center">
                Приблизительная дата получения: {getEstimatedDate()}
              </RalewayText>

              <View className="flex-row justify-between mt-4">
                <RalewayText weight={500} className="text-base text-gray-600">
                  Сумма:
                </RalewayText>
                <RalewayText weight={600} className="font-bold">
                  ₽{calculatePrice(quantity)}
                </RalewayText>
              </View>

              <View className="flex-row justify-between mt-4">
                <RalewayText weight={500} className="text-base text-gray-600">
                  Доставка:
                </RalewayText>
                <RalewayText weight={600} className="font-bold">
                  ₽{DELIVERY_PRICE}
                </RalewayText>
              </View>

              <View className="border-b border-dashed h-4"></View>

              <View className="flex-row justify-between mt-4">
                <RalewayText weight={500} className="text-base text-gray-600">
                  Итого:
                </RalewayText>
                <RalewayText weight={600} className="font-bold">
                  ₽{calculateTotalPrice(quantity)}
                </RalewayText>
              </View>

              <BigBlueButton
                onPress={() => {
                  createPayment(
                    calculatePrice(quantity),
                    product.title,
                    'style-shift://style-selection',
                  );
                }}
                className="mt-6 mb-6">
                Оплатить
              </BigBlueButton>
            </>
          )}

        <OrderModal visible={modalVisible} onClose={handleBackToHome} />
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

                      handleCreateOrder();
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
    </Layout>
  );
};

export default CreateOrder;
