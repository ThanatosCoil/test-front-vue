import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/contact-form",
    name: "ContactForm",
    component: () => import("../views/ContactForm.vue"),
  },
  {
    path: "/survey-form",
    name: "SurveyForm",
    component: () => import("../views/SurveyForm.vue"),
  },
  {
    path: "/registration-form",
    name: "RegistrationForm",
    component: () => import("../views/RegistrationForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
