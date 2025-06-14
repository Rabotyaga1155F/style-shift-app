import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import HistoryProductCard from '@/components/elements/history-product-card/HistoryProductCard';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton';
import RalewayText from '@/components/ui/fonts/RalewayText';
import {BASE_URL} from '@/constants/url.constants';
import {IUser} from '@/types/user.types';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

interface ISellerProps {
  user: IUser;
}

export default function Seller({user}: ISellerProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderIdToSubmit, setOrderIdToSubmit] = useState<string | null>(null);
  const [submissionCode, setSubmissionCode] = useState<string>('');
  const [balance, setBalance] = useState(user.balance);
  const {navigate} = useTypedNavigation();

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const ordersResponse = await axios.get(
        `${BASE_URL}/orders/seller/${user.userID}/created-orders`,
      );
      const sortedOrders = ordersResponse.data.sort((a: any, b: any) => {
        if (a.deliveryStatus === 'Создан' && b.deliveryStatus !== 'Создан') {
          return -1;
        } else if (
          a.deliveryStatus !== 'Создан' &&
          b.deliveryStatus === 'Создан'
        ) {
          return 1;
        }
        return 0;
      });

      setOrders(sortedOrders);

      const userResponse = await axios.get(
        `${BASE_URL}/users/get-user-by-id/${user.userID}`,
      );
      setBalance(userResponse.data.balance);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user.userID]);

  const handleSubmitToPVZ = async (orderID: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/orders/${orderID}/generate-confirmation-code`,
      );
      const code = response.data.confirmationCode;
      setSubmissionCode(code);
      setOrderIdToSubmit(orderID);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Ошибка при генерации кода:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSubmissionCode('');
  };

  return (
    <View className="flex-1">
      <View className="flex-row justify-center mt-6">
        <Image
          className="w-24 h-24"
          source={require('@/assets/images/avatar.png')}
        />
      </View>
      <RalewayText weight={600} className={'text-xl text-center mt-3'}>
        {user.username}
      </RalewayText>
      <RalewayText weight={500} className={'text-lg text-center mt-3'}>
        Баланс : {balance} ₽
      </RalewayText>

      <TouchableOpacity
        onPress={() => {
          navigate('SaleStatsPage');
        }}>
        <RalewayText
          weight={400}
          className={'text-base text-center mt-3 text-gray-600'}>
          Статистика
        </RalewayText>
      </TouchableOpacity>

      <FlatList
        refreshing={loading}
        onRefresh={fetchOrders}
        showsVerticalScrollIndicator={false}
        className={'mt-5'}
        numColumns={1}
        data={orders}
        renderItem={({item: order}) => {
          const orderDate = new Date(order.orderDate);
          const deadlineDate = new Date(orderDate);
          deadlineDate.setDate(orderDate.getDate() + 2);

          return (
            <View className="mb-5">
              <HistoryProductCard order={order} />
              {order.deliveryStatus === 'Создан' && (
                <>
                  <RalewayText className="text-center text-red-600 font-bold">
                    Ожидает сдачи в ПВЗ до {deadlineDate.toLocaleDateString()}
                  </RalewayText>
                  <BigBlueButton
                    className="my-2"
                    onPress={() => handleSubmitToPVZ(order.orderID)}>
                    Сдать в ПВЗ
                  </BigBlueButton>
                </>
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => item.orderID || index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={
          <View>
            {!loading && (
              <RalewayText className="text-center text-gray-500 mt-5">
                Заказов пока нет.
              </RalewayText>
            )}
          </View>
        }
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/50 bg-opacity-50">
          <View className="bg-white p-5 rounded-lg w-80">
            <RalewayText className="text-center text-xl mb-4">
              Код сдачи
            </RalewayText>
            <Text className="text-center text-2xl font-bold mb-4">
              {submissionCode}
            </Text>
            <RalewayText className="text-center mb-4">
              Скажите его сотруднику ПВЗ
            </RalewayText>
            <BigBlueButton onPress={handleCloseModal}>Закрыть</BigBlueButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}
