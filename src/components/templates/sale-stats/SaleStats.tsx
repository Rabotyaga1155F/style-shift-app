import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import Layout from '@/components/layout/Layout.tsx';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {useAuthUserStore} from '@/store/access-token';
import {BarChart, PieChart} from 'react-native-chart-kit';

const SaleStats = () => {
  interface MonthData {
    month: string;
    year: number;
    totalSold: number;
  }

  interface ProductSalesData {
    name: string;
    stock: number;
  }

  const [salesData, setSalesData] = useState<MonthData[]>([]);
  const [productSalesData, setProductSalesData] = useState<ProductSalesData[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const user = useAuthUserStore(state => state.user!);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const sellerId = user.userID;
        const response = await axios.get(
          `${BASE_URL}/orders/seller/${sellerId}/last-six-months-sales`,
        );
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductSalesData = async () => {
      try {
        const sellerId = user.userID;
        const response = await axios.get(
          `${BASE_URL}/orders/seller/${sellerId}/last-month-sales`,
        );
        setProductSalesData(response.data);
      } catch (error) {
        console.error('Error fetching product sales data:', error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchSalesData();
    fetchProductSalesData();
  }, []);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(72, 178, 231, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  const pieColors = [
    '#48b2e7',
    '#66c1f0',
    '#8ad0f5',
    '#aadffb',
    '#c9ecff',
    '#e0f7ff',
    '#309bb9',
    '#55bddc',
    '#78d3ed',
    '#9aeaff',
  ];

  const pieData = productSalesData.map((item, index) => ({
    name: `- ${item.name}`,

    population: item.stock,
    color: pieColors[index % pieColors.length],
    legendFontColor: '#000',
    legendFontSize: 12,
  }));

  if (loading || productLoading) {
    return <Layout></Layout>;
  }

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
        chartConfig={chartConfig}
        fromZero
        showBarTops={false}
        yAxisInterval={1}
        withCustomBarColorFromData={true}
        flatColor={true}
      />

      <RalewayText weight={600} className={'text-base text-left mt-10 mb-3 '}>
        Статистика продаж по товарам за месяц
      </RalewayText>

      <View className=" mt-2 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pieData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 16,
              }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: item.color,
                  borderRadius: 6,
                  marginRight: 4,
                }}
              />
              <RalewayText style={{fontSize: 12, color: '#000'}}>
                {item.name}
              </RalewayText>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className={'bg-white mx-2'}>
        <PieChart
          data={pieData}
          width={screenWidth - 45}
          height={210}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      </View>
    </Layout>
  );
};

export default SaleStats;
