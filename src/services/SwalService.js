// src/services/SweetAlertService.js
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

const SweetAlertService = {
    success(message) {
        Vue.swal({
            icon: 'success', title: 'Success', text: message,
        });
    },

    error(message) {
        Vue.swal({
            icon: 'error', title: 'Error', text: message,
        });
    },

    warning(message) {
        Vue.swal({
            icon: 'warning', title: 'Warning', text: message,
        });
    },

    info(message) {
        Vue.swal({
            icon: 'info', title: 'Info', text: message,
        });
    },

    async confirmationWarning(message) {
        let result = await Vue.swal({
            icon: 'warning',
            title: 'Warning',
            text: message,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        });
        return result.isConfirmed;
    },
};

export default SweetAlertService;