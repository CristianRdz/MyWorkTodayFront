import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `https://ax7xcrp77f.execute-api.us-east-1.amazonaws.com/Prod`;

const getRoles = async () => {
    try {
        return await axiosClient.get(`${baseUrl}/get_roles`);
    } catch (error) {
        showNotification("error", "Error getting roles")
    }
}


export default {
    getRoles,
}