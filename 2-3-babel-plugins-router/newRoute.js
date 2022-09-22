// './src/router.ts'
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/about',
    name: 'about',
    component: About
  } // to be append new route.
  , {
    path: "/list",
    name: "list",
    component: ListComponent
  }]
});