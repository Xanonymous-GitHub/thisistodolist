import Vue from "vue";
import VueRouter from "vue-router";
import mainlist from "@/components/main-list.vue";
import unfinished from "@/components/unfinished-list.vue";
import finished from "@/components/finished-list.vue";
import trashcan from "@/components/trashcan.vue";
import settings from "@/components/settings.vue";
import signin from "@/components/sign-in.vue";
import signup from "@/components/sign-up.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
        redirect: "todolist",
        children: [
            {
                path: "/todolist",
                component: mainlist
            },
            {
                path: "/todolist/unfinished",
                component: unfinished
            },
            {
                path: "/todolist/finished",
                component: finished
            },
            {
                path: "/todolist/trashcan",
                component: trashcan
            },
            {
                path: "/todolist/settings",
                component: settings
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
    component: signin
  },
  {
    path: "/signup",
    component: signup
  }
];
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes
});

export default router;
