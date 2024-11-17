import React, {FC, useState} from 'react';
import {Alert, Image, Modal, ModalProps, Pressable, View} from 'react-native';
import RalewayText from '@/components/ui/fonts/RalewayText.tsx';
import BigBlueButton from '@/components/ui/buttons/big-blue-button/BigBlueButton.tsx';
import {useTypedNavigation} from '@/hooks/navigation/useTypedNavigation.ts';

interface IOrderModalProps extends ModalProps {
  onClose: () => void;
}

const OrderModal: FC<IOrderModalProps> = ({onClose, ...rest}) => {
  return (
    <Modal {...rest} animationType="slide" transparent={true}>
      <View className={'flex-1 justify-center items-center'}>
        <View className={'mt-4 bg-white rounded-3xl px-12 py-10  items-center'}>
          <View className={'bg-blue-100 rounded-full p-6'}>
            <Image source={require('../../../assets/images/happy.png')} />
          </View>
          <RalewayText weight={500} className={'text-xl text-center'}>
            Вы успешно оформили заказ!
          </RalewayText>
          <BigBlueButton className={'px-2 mt-8'} onPress={onClose}>
            Вернуться к покупкам
          </BigBlueButton>
        </View>
      </View>
    </Modal>
  );
};

export default OrderModal;
