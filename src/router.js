import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import { isValid } from "./services/token";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: 'domains' },
      component: Home
    },
    {
      path: "/domains",
      component: () => import(/* webpackChunkName: "domains" */ "@/views/Domains.vue"),
      children: [
        {
          path: "",
          name: "domain-list",
          component: () => import(/* webpackChunkName: "domain-list" */ "@/views/Domain.vue")
        },
        {
          path: ":domain",
          name: "domain-detail",
          component: () => import(/* webpackChunkName: "domain-detail" */ "@/views/Domain.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        public: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const isLoggedIn = isValid();

  if (!isPublic && !isLoggedIn) {
    return next({
      name: 'login',
      replace: true,
      query: {redirectTo: to.fullPath}
    });
  }

  next();
});

export default router;
