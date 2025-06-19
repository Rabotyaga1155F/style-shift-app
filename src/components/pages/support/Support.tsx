import React, {FC, useState} from 'react';
import Support from '@/components/templates/support/Support.tsx';
import {useAuthUserStore} from '@/store/access-token';
import {SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {Alert} from 'react-native';
import {DEFAULT_SUPPORT_STATUS} from '@/constants/statuses.constants.ts';

export interface SupportFormValues {
  email: string;
  subject: string;
  message: string;
}

const SupportPage: FC = () => {
  const user = useAuthUserStore(state => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    reset,
    formState: {errors},
    handleSubmit,
  } = useForm<SupportFormValues>({
    defaultValues: {
      email: user?.email ?? '',
    },
  });

  const submitSupportRequest: SubmitHandler<SupportFormValues> = async data => {
    console.log('Support request data:', data);

    try {
      const response = await axios.post(`${BASE_URL}/support-request`, {
        userId: user!.userID,
        statusId: DEFAULT_SUPPORT_STATUS,
        ...data,
      });
      console.log(response.data);

      setIsModalVisible(true);
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert('Ошибка', 'Произошла ошибка при отправке заявки');
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = () => {
    handleSubmit(submitSupportRequest)();
  };

  return (
    <Support
      control={control}
      user={user ?? undefined}
      errors={errors}
      isModalVisible={isModalVisible}
      handleCloseModal={handleCloseModal}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default SupportPage;
