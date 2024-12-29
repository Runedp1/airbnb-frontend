import { createRouter, createWebHistory } from "vue-router";
import FrontPage from "./components/FrontPage.vue";
import UserEntry from "./components/UserEntry.vue";
import OwnerEntry from "./components/OwnerEntry.vue";
import UserLogin from "./components/UserLogin.vue";
import OwnerLogin from "./components/OwnerLogin.vue";
import UserMainPage from "./components/UserMainPage.vue";
import BookingPage from "./components/BookingPage.vue";
import MyBookings from "./components/MyBookings.vue"; 
import ChangeUserInfo from "./components/ChangeUserInfo.vue";
import OwnerMainPage from './components/OwnerMainPage.vue';
import CreateCampingSpot from './components/CreateCampingSpot.vue';
import UserSignUp from "./components/UserSignUp.vue";
import OwnerSignUp from "./components/OwnerSignUp.vue";


const routes = [
  { path: "/", component: FrontPage },
  { path: "/user-entry", component: UserEntry },
  { path: "/owner-entry", component: OwnerEntry },
  { path: "/user-login", component: UserLogin },
  { path: "/owner-login", component: OwnerLogin },
  { path: "/user-main", component: UserMainPage,  meta: { requiresAuth: true } },  
  { path: "/booking/:spotId", component: BookingPage,  meta: { requiresAuth: true } }, 
  { path: '/my-bookings', component: MyBookings,  meta: { requiresAuth: true } }, 
  { path: "/user-info", component: ChangeUserInfo,  meta: { requiresAuth: true } }, 
  { path: '/owner-main', component: OwnerMainPage },
  { path: '/create-campingspot', component: CreateCampingSpot },
  { path: "/user-signup", component: UserSignUp },
  { path: "/owner-signup", component: OwnerSignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const loggedInUser = localStorage.getItem("user");

  if (to.meta.requiresAuth && !loggedInUser) {
    // Redirect to login if no user is logged in
    next("/user-login");
  } else {
    next();
  }
});
export default router;