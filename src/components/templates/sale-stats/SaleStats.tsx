import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {useAuthUserStore} from '@/store/access-token';
import {BarChart} from 'react-native-chart-kit';

const SaleStats = () => {
  interface MonthData {
    month: string;
    year: number;
    totalSold: number;
  }

  const [salesData, setSalesData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthUserStore(state => state.user!);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const sellerId = user.userID;
        const response = await axios.get(
          `${BASE_URL}/orders/seller/${sellerId}/last-six-months-sales`,
        );
        setSalesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <RalewayText>Загрузка данных...</RalewayText>
      </Layout>
    );
  }

  const screenWidth = Dimensions.get('window').width;

  const formattedData = {
    labels: salesData.map(item => item.month.slice(0, 3)),
    datasets: [
      {
        data: salesData.map(item => item.totalSold),
      },
    ],
  };

  return (
    <Layout>
      <RalewayText weight={600} className={'text-lg text-center mt-10 '}>
        Статистика продаж
      </RalewayText>

      <RalewayText weight={600} className={'text-base text-left mt-10 mb-3 '}>
        Статистика продаж за последние 6 месяцев
      </RalewayText>

      <BarChart
        data={{
          labels: salesData.map(item => item.month.slice(0, 3)),
          datasets: [
            {
              data: salesData.map(item => item.totalSold),
              colors: salesData.map(() => () => `rgba(72, 178, 231, 1)`),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" шт"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(72, 178, 231, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.5,
          decimalPlaces: 0,
        }}
        fromZero
        showBarTops={false}
        yAxisInterval={1}
        withCustomBarColorFromData={true}
        flatColor={true}
      />

      <RalewayText weight={600} className={'text-base text-left mt-10 mb-3 '}>
        Статистика продаж по товарам за месяц
      </RalewayText>
    </Layout>
  );
};

export default SaleStats;
