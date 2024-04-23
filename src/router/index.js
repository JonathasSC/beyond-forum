import Vue from "vue";

import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewPostView from "../views/NewPostView.vue";
import NewUserView from "../views/NewUserView.vue";
import PostView from "../views/PostView.vue";
import UserView from "../views/UserView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/newpost",
    name: "newpost",
    component: NewPostView,
  },
  {
    path: "/newuser",
    name: "newuser",
    component: NewUserView,
  },
  {
    path: "/post",
    name: "post",
    component: PostView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
