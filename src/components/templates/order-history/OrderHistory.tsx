import React, {FC, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Layout from '@/components/layout/Layout.tsx';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import HistoryProductCard from '@/components/elements/history-product-card/HistoryProductCard.tsx';

interface IOrderHistoryProps {
  loading: any;
  fetchOrders: any;
  orders: any;
  navigation: any;
}

const OrderHistory: FC<IOrderHistoryProps> = ({
  orders,
  fetchOrders,
  loading,
  navigation,
}) => {
  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10'}>
        История заказов
      </RalewayText>
      <FlatList
        refreshing={loading}
        onRefresh={fetchOrders}
        showsVerticalScrollIndicator={false}
        className={'mt-5'}
        numColumns={1}
        data={orders}
        renderItem={({item: order}) => (
          <HistoryProductCard
            onPress={() => {
              navigation.navigate('OrderHistoryInfoPage', {order});
            }}
            order={order}
          />
        )}
        keyExtractor={item => item.orderID}
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
    </Layout>
  );
};

export default OrderHistory;
