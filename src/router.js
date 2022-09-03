import VueRouter from "vue-router";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: () => import("./Home.vue") },
  { path: "/login", name: "login", component: () => import("./Login.vue") },
];

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
