import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `https://jk7lulabml.execute-api.us-east-1.amazonaws.com/Prod`;

const getTasks = async () => {
    try {
        return await axiosClient.get(`${baseUrl}/get_all_task`);
    } catch (error) {
        showNotification("error", "Error getting task")
    }
}


const insert = async (task) => {
    try {
        return await axiosClient.post(`${baseUrl}/insert_task`, task);
    } catch (error) {
        showNotification("error", "Error al crear usuario")
    }
};

const getMyTask = async () => {
    try {
        return await axiosClient.get(`${baseUrl}/get_tasks`);
    } catch (error) {
        showNotification("error", "Error getting task")
    }
}
const deleteTask = async (id_task) => {
    try {
        await axiosClient.delete(`${baseUrl}/delete_task?id_task=${id_task}`);
    } catch (error) {
        showNotification("error", "Error deleting task")
    }
};
const update = async (task) => {
    try {
        return await axiosClient.put(`${baseUrl}/update_task`, task);
    } catch (error) {
        showNotification("error", "Error updating task")

    }
};



export default {
    getTasks, insert, getMyTask, deleteTask, update
}