import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `https://djng6tq596.execute-api.us-east-1.amazonaws.com/Prod`;

const getUsers = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/get_users`);
        console.log(response)
        return response;
    } catch (error) {
        showNotification("error", "Error getting users")
    }
}

const getMyUser = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/get_my_user`);
        return response;
    } catch (error) {
        showNotification("error", "Error al obtener usuario");
    }

}

const insert = async (user) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/insert_user`, user);
        response ? showNotification("success", "Usuario creado") : showNotification("error", "Error al crear usuario")
        return response;
    } catch (error) {
        showNotification("error", "Error al crear usuario")
    }
};
const deleteUser = async (id_usuarios) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/delete_user?id_user=${id_usuarios}`);
        response ? showNotification("success", "Usuario eliminado") : showNotification("error", "Error al eliminar usuario")
    } catch (error) {
        showNotification("error", "Error al eliminar usuario")
    }
};
const update = async (users) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/update_user`, users);
        response ? showNotification("success", "Usuario actualizado") : showNotification("error", "Error al actualizar usuario")
        return response;
    } catch (error) {
        showNotification("error", "Error al actualizar usuario")

    }
};



export default {
    getUsers,getMyUser, insert,  deleteUser: deleteUser, update
}