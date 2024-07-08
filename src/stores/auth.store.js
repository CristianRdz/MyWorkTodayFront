import {defineStore} from 'pinia';
import {showNotification} from "@/utils/notification";
import {axiosClient} from "@/utils/axios-client";
import router from "@/router";

const baseUrl = `https://uwicx4uhsa.execute-api.us-east-1.amazonaws.com/Prod/login`;

export const useAuthStore = defineStore({
    id: 'auth', state: () => ({
        user: JSON.parse(localStorage.getItem('user')), returnUrl: null,

    }), actions: {
        async login(username, password) {
            try {
                let userInfo = await axiosClient.post(`${baseUrl}/`, {username, password});
                userInfo ? showNotification('success', 'Welcome') : showNotification('error', 'User or password incorrect');
                this.user = userInfo;
                localStorage.setItem('user', JSON.stringify(userInfo));
                let route;
                switch (this.user.role) {
                    case 'Admins':
                        route = '/admin/'
                        break;
                    case 'Users':
                        route = '/personal/'
                        break;
                    default:
                        route = '/'
                        break;
                }
                this.returnUrl = route;
                await router.push(route);
            } catch (e) {
                console.error(e);
                showNotification('error', 'User or password incorrect');
            }
        }, logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/home/inicio');
            showNotification('success', 'Goodbye');

        }
    }
});
