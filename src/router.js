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
      component: Home
    },
    {
      path: "/domains",
      name: "domains",
      component: () => {
        import(/* webpackChunkName: "domains" */ "./views/Domains.vue")
      }
    },
    {
      path: "/domains/:domain",
      name: "domain",
      component: () => {
        import(/* webpackChunkName: "domain" */ "./views/Domain.vue")
      }
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
      path: '/login',
      query: {redirectTo: to.fullPath}
    });
  }

  next();
});

export default router;
