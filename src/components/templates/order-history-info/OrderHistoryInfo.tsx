import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import React, {useState} from 'react';
import Yamap, {Marker, YaMap} from 'react-native-yamap';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {DELIVERY_PRICE} from '@/constants/price.constants.ts';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';

const CANCEL_STATUS_ID = '54fb7db0-b1e8-4902-a05d-11d96aa2522a';

Yamap.init('263a39f9-f08e-4586-8aaa-8dcaea00f4a3');

interface IOrderHistoryInfoProps {
  order: any;
  navigation: any;
}

export default function OrderHistoryInfo({
  order,
  navigation,
}: IOrderHistoryInfoProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const handleCancelOrder = async () => {
    try {
      await axios.put(`${BASE_URL}/orders/${order.orderID}/update-status`, {
        statusID: CANCEL_STATUS_ID,
      });
      setIsCancelModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка при отмене заказа:', error);
    }
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RalewayText weight={600} className={'text-lg text-center mt-10'}>
          Информация о заказе
        </RalewayText>
        <RalewayText weight={600} className={'text-lg mt-4'}>
          {order.deliveryStatus}
        </RalewayText>
        <View className="mt-4 h-64 rounded-lg overflow-hidden">
          <YaMap
            initialRegion={{
              lat: order.pickupPoint.latitude,
              lon: order.pickupPoint.longitude,
              zoom: 15,
              azimuth: 0,
              tilt: 0,
            }}
            style={{flex: 1}}>
            <Marker
              point={{
                lat: order.pickupPoint.latitude,
                lon: order.pickupPoint.longitude,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
              </View>
            </Marker>
          </YaMap>
        </View>
        <RalewayText weight={500} className={'text-sm mt-4'}>
          Пункт выдачи
        </RalewayText>
        <RalewayText weight={600} className={'text-lg mt-1'}>
          {order.pickupPointName}
        </RalewayText>

        <RalewayText weight={500} className={'text-xl mt-4'}>
          Состав заказа
        </RalewayText>

        <View
          className={
            'flex-row items-center bg-gray-200/70 px-3 mt-3 py-2 rounded'
          }>
          <Image className={'w-20 h-20'} source={{uri: order.imageUrl}} />
          <View className={'pl-3'}>
            <RalewayText weight={500} className={'text-base'}>
              {order.productName}
            </RalewayText>
            <RalewayText weight={600} className={'text-base pt-2'}>
              {order.totalAmount - DELIVERY_PRICE} ₽
            </RalewayText>
          </View>
        </View>
        {order.deliveryStatus === 'Ожидает получения' && (
          <>
            <BigBlueButton
              onPress={() => setIsModalVisible(true)}
              className={'mt-10'}>
              Получить заказ
            </BigBlueButton>
          </>
        )}
        {order.deliveryStatus !== 'Отменён' &&
          order.deliveryStatus !== 'Завершен' && (
            <TouchableOpacity onPress={() => setIsCancelModalVisible(true)}>
              <RalewayText
                weight={500}
                className={
                  'text-base pt-2 text-center mt-2 mb-4 text-gray-600'
                }>
                Отменить заказ
              </RalewayText>
            </TouchableOpacity>
          )}

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View className="flex-1 justify-center items-center bg-black/50 bg-opacity-50">
            <View className="bg-white p-5 rounded-lg w-80">
              <RalewayText className="text-center text-xl mb-4">
                Код получения
              </RalewayText>
              <Text className="text-center text-2xl font-bold mb-4">
                {order.confirmationCode}
              </Text>
              <RalewayText className="text-center mb-4">
                Скажите его сотруднику ПВЗ
              </RalewayText>
              <BigBlueButton onPress={() => setIsModalVisible(false)}>
                Закрыть
              </BigBlueButton>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isCancelModalVisible}
          animationType="slide"
          transparent={true}>
          <View className="flex-1 justify-center items-center bg-black/50 bg-opacity-50">
            <View className="bg-white p-5 rounded-lg w-80">
              <RalewayText weight={500} className="text-center text-xl mb-4">
                Вы уверены, что хотите отменить заказ?
              </RalewayText>
              <View className="flex-row justify-around">
                <TouchableOpacity
                  onPress={() => setIsCancelModalVisible(false)}
                  className="px-4 py-2 bg-matule-blue  rounded-lg">
                  <RalewayText weight={500} className={'text-white'}>
                    Нет
                  </RalewayText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelOrder}
                  className="px-4 py-2 bg-red-500 rounded-lg">
                  <RalewayText weight={500} className="text-white">
                    Да
                  </RalewayText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Layout>
  );
}
