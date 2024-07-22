import {axiosClient} from "@/utils/axios-client";
import {showNotification} from "@/utils/notification";

let baseUrl = `https://ceexetzgka.execute-api.us-east-1.amazonaws.com/Prod`;

const getProjects = async () => {
    try {
        const response = await axiosClient.get(`${baseUrl}/get_projects`);
        console.log(response)
        return response;
    } catch (error) {
        showNotification("error", "Error getting project")
    }
}


const insert = async (project) => {
    try {
        const response = await axiosClient.post(`${baseUrl}/insert_project`, project);
        response ? showNotification("success", "Usuario creado") : showNotification("error", "Error al crear usuario")
        return response;
    } catch (error) {
        showNotification("error", "Error al crear usuario")
    }
};
const deleteProject = async (id_usuarios) => {
    try {
        const response = await axiosClient.delete(`${baseUrl}/delete_project?id_project=${id_usuarios}`);
        response ? showNotification("success", "Usuario eliminado") : showNotification("error", "Error al eliminar usuario")
    } catch (error) {
        showNotification("error", "Error deleting project")
    }
};
const update = async (project) => {
    try {
        const response = await axiosClient.put(`${baseUrl}/update_project`, project);
        response ? showNotification("success", "Usuario actualizado") : showNotification("error", "Error al actualizar usuario")
        return response;
    } catch (error) {
        showNotification("error", "Error updating project")

    }
};



export default {
    getProjects, insert,  deleteProject: deleteProject, update
}