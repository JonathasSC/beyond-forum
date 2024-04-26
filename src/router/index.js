import Vue from "vue";

import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import NewPostView from "../views/NewPostView.vue";
import NewUserView from "../views/NewUserView.vue";
import NewCommentView from "../views/NewCommentView.vue";

import PostView from "../views/PostView.vue";
import UserView from "../views/UserView.vue";
import CommentView from "../views/CommentView.vue";

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
    path: "/newcomment",
    name: "newcomment",
    component: NewCommentView,
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
  {
    path: "/comment",
    name: "comment",
    component: CommentView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
