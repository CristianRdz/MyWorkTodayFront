import Vue from "vue";
import VueRouter from "vue-router";
import {useAuthStore} from "@/stores";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history", base: import.meta.env.BASE_URL, routes: [{
        path: "/", redirect: "/home/inicio",
    }, {
        path: "/admin",
        meta: {role: 'Admins'},
        component: () => import("../components/admin/components/SidebarNavbar.vue"),
        children: [{
            path: "/",
            meta: {role: 'Admins'},
            name: "dashboard",
            component: () => import("../components/admin/Dashboard.vue"),
        }, {
            path: "/admin/users",
            meta: {role: 'Admins'},
            name: "users",
            component: () => import("../components/admin/users/TableUsers.vue"),
        }, {
            path: "/admin/profile",
            meta: {role: 'Admins'},
            name: "profileAdmin",
            component: () => import("../components/public/Profile.vue"),
        }, {
            path: "/admin/projects",
            meta: {role: 'Admins'},
            name: "projects",
            component: () => import("../components/admin/projects/TableProject.vue"),
        }, {
            path: "/admin/tasks",
            meta: {role: 'Admins'},
            name: "tasks",
            component: () => import("../components/admin/tasks/TableTask.vue"),
        }

        ],
    }, {
        path: "/home",
        name: "home",
        component: () => import("../components/public/Home.vue"),
        redirect: "/home/inicio",
        children: [{
            path: "/home/inicio/",
            name: "inicio",
            component: () => import("../components/public/Landing-pages/LandingPage.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    if (auth.user.role === 'Users') {
                        next({name: 'personalScreen'});
                    } else if (auth.user.role === 'Admins') {
                        next({name: 'tasks'});
                    }
                } else {
                    next();
                }
            },
        }, {

            path: "/home/profile/",
            meta: {auth: true},
            name: "profile",
            component: () => import("../components/public/Profile.vue")


        }, {
            meta: {auth: false},
            path: "/home/login/",
            name: "login",
            component: () => import("../components/public/Login.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    if (auth.user.role === 'Users') {
                        next({name: 'eventos'});
                    } else if (auth.user.role === 'Admins') {
                        next({name: 'admin'});
                    }
                } else {
                    next();
                }
            },
        }, {

            path: "/recover/email/",
            meta: {auth: false},
            name: "recoverCorreo",
            component: () => import("../components/public/Restablecer.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({name: 'inicio'});
                } else {
                    next();
                }
            },
        }, {
            path: "/recover/",
            meta: {auth: false},
            name: "recoverConfirmar",
            component: () => import("../components/public/RestablecerConfirmar.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({name: 'inicio'});
                } else {
                    next();
                }
            },
        }, {

            path: "/setPassword/",
            meta: {auth: false},
            name: "setPassword",
            component: () => import("../components/public/SetPassword.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({name: 'inicio'});
                } else {
                    next();
                }

            },
        },


        ],
    }, {
        path: "/personal",
        meta: {role: 'Users'},
        component: () => import("../components/personal/components/SidebarNavbar.vue"),
        children: [{

            path: "/",
            meta: {role: 'Users'},
            name: "eventos",
            component: () => import("../components/personal/components/Eventos.vue"),
        }, {
            path: "/personal/profile",
            meta: {role: 'Users'},
            name: "profilePersonal",
            component: () => import("../components/public/Profile.vue"),
        }],
    }, {
        path: "/404", name: "404", component: () => import("../components/public/error/ErrorPage.vue"),
    }, {
        path: "*", redirect: "/404",
    },],
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();


    if (to.matched.some((record) => record.meta?.auth)) {
        if (!auth.user) {
            auth.returnUrl = to.fullPath;
            return next({name: "inicio"});
        }
    }

    if (auth.user && to.meta.role !== auth.user.role && to.meta.role !== undefined) {
        console.log(auth.user.role);
        return next({name: "404"});
    }
    next();
});
export default router;
