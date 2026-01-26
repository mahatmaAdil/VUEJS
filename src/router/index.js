import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HomeView from "../views/HomeView.vue";

import AuthLayout from "../layouts/AuthLayout.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import CheckEmailView from "../views/CheckEmailView.vue";
import NewPasswordView from "../views/NewPasswordView.vue";
import SuccessView from "../views/SuccessView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },

    // login (без layout)
    { path: "/login", component: LoginView },

    // forgot password flow
    {
      path: "/forgot",
      component: AuthLayout,
      children: [
        { path: "", component: ForgotPasswordView },
        { path: "check-email", component: CheckEmailView },
        { path: "new-password", component: NewPasswordView },
        {path: "success", component: SuccessView},
      ]
    },

    // app (после логина)
    {
      path: "/app",
      component: MainLayout,
      children: [
        { path: "", component: HomeView },
      ],
    },
  ],
});

// guard (опционально, но ок)
router.beforeEach((to) => {
  const isAuth = localStorage.getItem("auth") === "true";

  const isPublic =
    to.path === "/login" ||
    to.path.startsWith("/forgot"); // ← ключевое

  if (!isAuth && !isPublic) return "/login";
  if (isAuth && to.path === "/login") return "/app";
});

