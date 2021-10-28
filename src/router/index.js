import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '@/views/UserProfile.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Logout from '@/views/Logout.vue';
import OrderList from '../views/OrderList.vue';
import Stock from "../views/Stock.vue";
import Restock from "../views/Restock.vue";
import Supplier from "../views/Supplier.vue";
import AddSupplier from "../views/AddSupplier.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/orderlist",
    name: "OrderList",
    component: OrderList,
  },
  {
    path: "/stock",
    name: "Stock",
    component: Stock,
  },
  {
    path: "/restock",
    name: "Restock",
    component: Restock,
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: Supplier,
  },
  {
    path: "/supplier/add",
    name: "AddSupplier",
    component: AddSupplier,
  },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
