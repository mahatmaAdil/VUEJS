import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import SignUpLayout from "../layouts/SignUpLayout.vue";
import RegistrationView from "../views/RegistrationView.vue";
import CheckInboxView from "../views/CheckInboxView.vue";
import PropertyView from "../views/PropertyView.vue";
import SetPasswordView from "../views/SetPasswordView.vue";
import SuccessView from "../views/SuccessView.vue";

const routes = [
  { path: "/", redirect: { name: "login" } },

  // ✅ логин БЕЗ лейаута
  { path: "/login", name: "login", component: LoginView },

  //регистрация
  {
    path: "/signup",
    component: SignUpLayout,
    children: [
      { path: "", redirect: { name: "registration" } },
      {
        path: "/registration",
        name: "registration",
        component: RegistrationView,
      },
      {
        path: "/checkInbox",
        name: "checkInbox",
        component: CheckInboxView,
      },
      {
        path: "/property",
        name: "property",
        component: PropertyView,
      },
      {
        path: "/setPassword",
        name: "setPassword",
        component: SetPasswordView,
      },
      { path: "/signUpSuccess", name: "signUpSuccess", component: SuccessView },
    ],
  },
  // ✅ восстановление С лейаутом
  { path: "/forgot", name: "forgot", component: AuthLayout },
  { path: "/check-email", name: "checkEmail", component: AuthLayout },
  { path: "/new-password", name: "newPassword", component: AuthLayout },
  { path: "/authsuccess", name: "authSuccess", component: AuthLayout },

  { path: "/:pathMatch(.*)*", redirect: { name: "login" } },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
