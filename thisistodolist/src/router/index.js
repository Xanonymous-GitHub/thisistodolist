import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import mainlist from "@/components/main-list.vue";
import signin from "@/components/sign-in.vue";
import signup from "@/components/sign-up.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "todolist",
    children: [
      {
        path: "todolist",
        component: mainlist
      }
    ]
  },
  {

    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
  mode: 'history',
  base:__dirname,
  routes
});

export default router;
