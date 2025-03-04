import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import {showNotification} from "@/utils/notification";
import router from "@/router";

export const axiosClient = {
    get: request('get'),
    post: request('post'),
    put: request('put'),
    delete: request('delete')
};

function request(method) {
    return async (url, body) => {
        const headers = authHeader(url);
        if (body) {
            headers['Content-Type'] = 'application/json';
        }
        try {
            const response = await axios({
                method,
                url: `${url}`,
                headers,
                data: body
            });
            return handleResponse(response);
        } catch (error) {

            localStorage.removeItem('user');
            await router.push('/home/inicio');
            showNotification('error', 'Server Error');

        }
    }
}



function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.id_token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.id_token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    try {
        const data = response.data;
        if (response.status > 400) {
            const { user } = useAuthStore();
            if ([401].includes(response.status) && user) {
                showNotification("error", "Session expired");
                this.useAuthStore().logout();
            }
            const error = data?.message || response.statusText;
            return Promise.reject(error);
        }
        data.message ? showNotification(response.status === 200 ? "success" : "error", data.message) : null;
        return data;
    } catch (error) {

        localStorage.removeItem('user');
        router.push('/home/inicio');
        showNotification('error', 'Server Error');
    }
}