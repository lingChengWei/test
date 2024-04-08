import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/summaryList",
    children: [
      {
        path: "/dyHotPush",
        name: "dyHotPush",
        component: () => import("@/views/goods/dyHotPush.vue"),
      },
      {
        path: "/zbHotPush",
        name: "zbHotPush",
        component: () => import("@/views/goods/zbHotPush.vue"),
      },
      {
        path: "/spHotPush",
        name: "spHotPush",
        component: () => import("@/views/goods/spHotPush.vue"),
      },
      {
        path: "/summaryList",
        name: "summaryList",
        component: () => import("@/views/summaryList/index.vue"),
      },
      {
        path: "/employeeEnd",
        name: "employeeEnd",
        component: () => import("@/views/employeeEnd/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
