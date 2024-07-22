import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `https://djng6tq596.execute-api.us-east-1.amazonaws.com/Prod`;

const getUsers = async () => {
    try {
        return await axiosClient.get(`${baseUrl}/get_users`);
    } catch (error) {
        showNotification("error", "Server error")
    }
}

const getMyUser = async () => {
    try {
        return await axiosClient.get(`${baseUrl}/get_my_user`);
    } catch (error) {
        showNotification("error", "Server error")
    }

}

const insert = async (user) => {
    try {
        return await axiosClient.post(`${baseUrl}/insert_user`, user);
    } catch (error) {
        showNotification("error", "Server error")
    }
};
const deleteUser = async (id_usuarios) => {
    try {
        await axiosClient.delete(`${baseUrl}/delete_user?id_user=${id_usuarios}`);
    } catch (error) {
        showNotification("error", "Server error")
    }
};
const update = async (users) => {
    try {
        return await axiosClient.put(`${baseUrl}/update_user`, users);
    } catch (error) {
        showNotification("error", "Server error")

    }
};



export default {
    getUsers,getMyUser, insert,  deleteUser: deleteUser, update
}