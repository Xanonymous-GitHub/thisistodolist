import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/Home.vue"),
    redirect: "/",
    children: [
      {
        path: "/",
        component: () => import("@/components/MainList.vue")
      },
      {
        path: "/unfinished",
        component: () => import("@/components/UnfinishedList.vue")
      },
      {
        path: "/finished",
        component: () => import("@/components/FinishedList.vue")
      },
      {
        path: "/trashcan",
        component: () => import("@/components/Trashcan.vue")
      },
      {
        path: "/settings",
        component: () => import("@/components/Settings.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/signin",
    component: () => import("@/components/SignIn.vue")
  },
  {
    path: "/signup",
    component: () => import("@/components/SignUp.vue")
  }
];
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes
});

export default router;
