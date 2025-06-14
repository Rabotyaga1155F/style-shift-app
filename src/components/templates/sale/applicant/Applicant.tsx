import OrderModal from "@/components/elements/order-modal/OrderModal";
import BigBlueButton from "@/components/ui/buttons/big-blue-button/BigBlueButton";
import Field from "@/components/ui/fields/Field";
import RalewayText from "@/components/ui/fonts/RalewayText";
import { DEFAULT_SUPPORT_STATUS } from "@/constants/statuses.constants";
import { BASE_URL } from "@/constants/url.constants";
import { IUser } from "@/types/user.types";
import axios from "axios";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, View } from "react-native";

interface IApplicantProps {
    user: IUser;
}

interface ISaleQuiz {
    description: string;
    docs: string;
}

const SUPPORT_DEFAULT_SUBJECT = "Получение верификации";

export default function Applicant({ user }: IApplicantProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ISaleQuiz>();

    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = (data: ISaleQuiz) => {
        submitSupportRequest(data);
    };

    const submitSupportRequest: SubmitHandler<ISaleQuiz> = async (data) => {
        console.log("Support request data:", data);

        try {
            const response = await axios.post(`${BASE_URL}/support-request`, {
                userId: user.userID,
                statusId: DEFAULT_SUPPORT_STATUS,
                subject: SUPPORT_DEFAULT_SUBJECT,
                email: user.email,
                message: data.description + "   -   " + data.docs,
            });
            console.log(response.data);

            setModalVisible(true);
            reset();
        } catch (error) {
            console.error(error);
            Alert.alert("Ошибка", "Произошла ошибка при отправке заявки");
        }
    };

    return (
        <View>
            <RalewayText weight={600} className="text-xl text-center mt-5">
                Оставить заявку на продажу товаров
            </RalewayText>

            <View className="mt-4">
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: "Обязательное поле" }}
                    render={({ field: { onChange, value } }) => (
                        <Field
                            className="mt-4 h-32"
                            multiline
                            numberOfLines={4}
                            style={{ minHeight: 120, textAlignVertical: "top" }}
                            value={value}
                            controllerOnChange={onChange}
                            placeholder="Описание товаров, которые будете продавать"
                        />
                    )}
                />
                {errors.description && (
                    <RalewayText weight={500} className="text-red-600 mt-1">
                        {errors.description.message?.toString()}
                    </RalewayText>
                )}
            </View>

            <View className="mt-4">
                <Controller
                    control={control}
                    name="docs"
                    rules={{ required: "Обязательное поле" }}
                    render={({ field: { onChange, value } }) => (
                        <Field
                            value={value}
                            controllerOnChange={onChange}
                            placeholder="Ссылка на пакет документов"
                            className="mt-4"
                        />
                    )}
                />
                {errors.docs && (
                    <RalewayText weight={500} className="text-red-600 mt-1">
                        {errors.docs.message?.toString()}
                    </RalewayText>
                )}
            </View>

            <BigBlueButton onPress={handleSubmit(onSubmit)} className="mt-8">
                Отправить заявку
            </BigBlueButton>


            <OrderModal
                text="Заявка успешно отправлена"
                buttonText="Ожидать"
                visible={modalVisible}
                onClose={() => {
                    reset();
                    setModalVisible(false);
                }}
            />
        </View>
    );
}
