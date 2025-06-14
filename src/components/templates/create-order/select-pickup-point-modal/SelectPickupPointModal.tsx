import React, { useState, useEffect } from 'react';
import { Modal, ModalProps, Text, View, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { BASE_URL } from '@/constants/url.constants';
import Search from '@/components/elements/search/Search';


interface ISelectPickupPointProps extends ModalProps {
  onSelect: (city: any, pickupPoint: any) => void;
  onRequestClose: () => void;
}

const SelectPickupPointModal: React.FC<ISelectPickupPointProps> = ({ onSelect, onRequestClose, ...rest }) => {
  const [cities, setCities] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
        setFilteredCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredCities(cities);
    } else {
      setFilteredCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const renderCityItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => setSelectedCity(item)}
      style={{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
      }}
    >
      <Text>{item.name || 'Неизвестный город'}</Text>
    </TouchableOpacity>
  );

  const renderPickupPointItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        if (selectedCity) {
          onSelect(selectedCity, item);
          setSelectedCity(null);
        }
      }}
      style={{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
      }}
    >
      <Text>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal {...rest} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
                height: '60%',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                {selectedCity ? `Пункты выдачи в ${selectedCity.name}` : 'Выберите город'}
              </Text>

              {!selectedCity && (
                <Search
                  className="px-3 border rounded-xl"
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              )}

              {selectedCity ? (
                <FlatList
                  data={selectedCity.pickupPoints}
                  keyExtractor={(item) => item.pickupPointId.toString()}
                  renderItem={renderPickupPointItem}
                />
              ) : (
                <FlatList
                showsVerticalScrollIndicator={false}
                  data={filteredCities}
                  keyExtractor={(item) => item.cityId.toString()}
                  renderItem={renderCityItem}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectPickupPointModal;
