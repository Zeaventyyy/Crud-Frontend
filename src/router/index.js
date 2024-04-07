import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import EditPostView from "../views/EditPostView.vue";
import AddPostView from "../views/AddPostView.vue";

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Login", component: LoginView },
    { path: "/dashboard", name: "Dashboard", component: DashboardView },
    { path: "/posts/:id/edit", name: "EditPost", component: EditPostView },
    { path: "/posts/add", name: "AddPost", component: AddPostView },
  ],
});

Router.beforeEach(async (to) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);

  const authenticated = sessionStorage.getItem("authenticated");

  if (authRequired && !authenticated) {
    alert("Sorry, you are not yet authenticated");
    return "/";
  }
});

export default Router;
