import React, {FC, useEffect, useRef, useState} from 'react';
import StyleSelection from '@/components/templates/style-selection/StyleSelection.tsx';
import {useForm} from 'react-hook-form';
import {useAuthUserStore} from '@/store/access-token';
import {goals, sphereOfActivity} from '../../../data/slyle-selection-data.tsx';
import {ScrollView} from 'react-native';
import {StyleCardFormValues} from '@/components/pages/style-selection/style-card-form-values.types.ts';
import axios from 'axios';
import {BASE_URL} from '@/constants/url.constants.ts';
import {IUserQuiz} from '@/types/quiz.types.ts';
import {STYLE_CARD_STATUS_MAPPING} from '@/components/templates/style-selection/statuses.ts';

const StyleSelectionPage: FC = () => {
  const [step, setStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [userQuiz, setUserQuiz] = useState<IUserQuiz | undefined>();

  useEffect(() => {
    checkQuiz();
  }, []);

  const user = useAuthUserStore(state => state.user);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm<StyleCardFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: user?.username ?? '',
      email: user?.email ?? '',
      sphere: sphereOfActivity[0],
      goal: goals[0],
      brands: [],
      styles: [],
      peculiarities: [],
      materials: [],
      colors: [],
    },
  });

  const onSubmit = async (data: StyleCardFormValues) => {
    console.log('data: ', JSON.stringify(data));
    await axios
      .post(`${BASE_URL}/style-cards`, {
        UserID: user!.userID,
        StyleCardStatusID: STYLE_CARD_STATUS_MAPPING.NOT_PAID,
        Quiz: JSON.stringify(data),
      })
      .then(function (response) {
        setModalVisible(true);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response ? error.response.data : error.message);
      });
  };

  const checkQuiz = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/style-cards/user/${user!.userID}`,
      );
      const quizData = response.data?.[0];

      setUserQuiz(quizData);
    } catch (error) {
      console.log('CheckQuiz - ' + error);
    }
  };

  const onModalClose = () => {
    setModalVisible(false);
    checkQuiz();
  };

  const handleNextStep = () => {
    handleSubmit(() => {
      if (step < 6) {
        setStep(prev => prev + 1);
        scrollViewRef.current?.scrollTo({y: 0, animated: true});
      } else {
        handleSubmit(onSubmit)();
      }
    })();
  };

  return (
    <StyleSelection
      errors={errors}
      control={control}
      setValue={setValue}
      onModalClose={onModalClose}
      modalVisible={modalVisible}
      setStep={setStep}
      getValues={getValues}
      step={step}
      handleNextStep={handleNextStep}
      scrollViewRef={scrollViewRef}
      userQuiz={userQuiz}
      checkQuiz={checkQuiz}
    />
  );
};

export default StyleSelectionPage;
