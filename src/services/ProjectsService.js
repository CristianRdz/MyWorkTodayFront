import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `https://ceexetzgka.execute-api.us-east-1.amazonaws.com/Prod`;

const getProjects = async () => {
    try {
        return await axiosClient.get(`${baseUrl}/get_projects`);
    } catch (error) {
        showNotification("error", "Error getting project")
    }
}


const insert = async (project) => {
    try {
        return await axiosClient.post(`${baseUrl}/insert_project`, project);
    } catch (error) {
        showNotification("error", "Error al crear usuario")
    }
};
const deleteProject = async (id_usuarios) => {
    try {
        await axiosClient.delete(`${baseUrl}/delete_project?id_project=${id_usuarios}`);
    } catch (error) {
        showNotification("error", "Error deleting project")
    }
};
const update = async (project) => {
    try {
        return await axiosClient.put(`${baseUrl}/update_project`, project);
    } catch (error) {
        showNotification("error", "Error updating project")

    }
};



export default {
    getProjects, insert,  deleteProject: deleteProject, update
}