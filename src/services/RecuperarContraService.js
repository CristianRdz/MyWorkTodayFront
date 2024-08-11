import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

const baseUrl = 'https://uwicx4uhsa.execute-api.us-east-1.amazonaws.com/Prod';


export const forgotPassword = async (cambioRequestDto) => {
    try {
        return await axiosClient.post(`${baseUrl}/forgot_password`, cambioRequestDto);
    } catch (error) {
        console.log(error);
        showNotification("error", "Error al recuperar contraseña");
    }
}

export const confirmChange = async (restablecerContraDto) => {
    try {
        await axiosClient.post(`${baseUrl}/confirm_password`, restablecerContraDto);
    } catch (error) {
        console.log(error);
        showNotification("error", "Error al confirmar el cambio de contraseña");
    }
}

export const setPassword = async (temporaryChangeDto) => {
    try {
        await axiosClient.post(`${baseUrl}/set_password`, temporaryChangeDto);
    } catch (error) {
        console.log(error);
        showNotification("error", "Error al confirmar el cambio de contraseña");
    }
}