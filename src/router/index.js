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
        name: "admin",
        component: () => import("../components/admin/components/SidebarNavbar.vue"),
        children: [{
            path: "/", name: "dashboard", component: () => import("../components/admin/Dashboard.vue"),
        }, {
            path: "/admin/users", name: "users", component: () => import("../components/admin/users/TableUsers.vue"),
        }, {
            path: "/admin/profile", name: "profileAdmin", component: () => import("../components/public/Profile.vue"),
        },{
            path: "/admin/projects", name: "projects", component: () => import("../components/admin/projects/TableProject.vue"),
        },{
            path: "/admin/tasks", name: "tasks", component: () => import("../components/admin/tasks/TableTask.vue"),
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
                        next({ name: 'personalScreen' });
                    } else if (auth.user.role === 'Admins') {
                        next({ name: 'tasks' });
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
            path: "/home/login/", name: "login", component: () => import("../components/public/Login.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    if (auth.user.role === 'Users') {
                        next({ name: 'personalScreen' });
                    } else if (auth.user.role === 'Admins') {
                        next({ name: 'admin' });
                    }
                } else {
                    next();
                }
            },
        },{

            path: "/restablecer/correo/",
            meta: {auth: false},
            name: "restablecerCorreo",
            component: () => import("../components/public/Restablecer.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({ name: 'inicio' });
                } else {
                    next();
                }
            },
        }, {
            path: "/restablecer/",
            meta: {auth: false},
            name: "restablecerConfirmar",
            component: () => import("../components/public/RestablecerConfirmar.vue"),
            beforeEnter: (to, from, next) => {
                const auth = useAuthStore();
                if (auth.user) {
                    next({ name: 'inicio' });
                } else {
                    next();
                }
            },
        },


        ],
    }, {
        path: "/personal",
        meta: {role: 'Users'},
        name: "personalScreen",
        component: () => import("../components/personal/components/SidebarNavbar.vue"),
        children: [{
            path: "/", name: "eventos", component: () => import("../components/personal/components/Eventos.vue"),
        }, {
            path: "/personal/profile",
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
    if (to.meta.role !== auth.user?.role
        && to.meta.role !== undefined) {
        return next({name: "404"});
    }
    next();
});
export default router;
