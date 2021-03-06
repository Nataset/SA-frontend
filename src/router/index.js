import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Logout from '@/views/Logout.vue';
import OrderList from '../views/OrderList.vue';
import Cart from '../views/Cart.vue';
import Supplier from '../views/Supplier.vue';
import AddSupplier from '../views/AddSupplier.vue';
import AddItem from '../views/AddItem.vue';
import EditItem from '../views/EditItem.vue';
import Howtopay from '../views/Howtopay.vue';
import OrderDetail from '../views/OrderDetail.vue';
import AdminOrderList from '../views/AdminOrderList.vue';
import AdminOrderDetail from '../views/AdminOrderDetail.vue';
import UserDetail from '../views/UserDetail.vue';
import OrderReceipt from '../views/OrderReceipt';
import RestockOrder from '../views/RestockOrder';
import Restock from '../views/Restock';
import Test from '../views/test';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
    },
    {
        path: '/orderlist',
        name: 'OrderList',
        component: OrderList,
    },

    {
        path: '/supplier',
        name: 'Supplier',
        component: Supplier,
    },
    {
        path: '/supplier/add',
        name: 'AddSupplier',
        component: AddSupplier,
    },
    {
        path: '/item/add',
        name: 'AddItem',
        component: AddItem,
    },
    {
        path: '/item/edit/:id',
        name: 'EditItem',
        component: EditItem,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/howtopay',
        name: 'Howtopay',
        component: Howtopay,
    },
    {
        path: '/orderlist/order/:id',
        name: 'OrderDetail',
        component: OrderDetail,
    },
    {
        path: '/orderlist/all',
        name: 'AdminOrderList',
        component: AdminOrderList,
    },
    {
        path: '/user/:id',
        name: 'UserDetail',
        component: UserDetail,
    },
    {
        path: '/orderlist/order/:id/receipt',
        name: 'OrderReceipt',
        component: OrderReceipt,
    },
    {
        path: '/restocklist',
        name: 'RestockOrder',
        component: RestockOrder,
    },
    {
        path: '/restock/:id',
        name: 'Restock',
        component: Restock,
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
    },
    {
        path: '/orderlist/order/admin/:id',
        name: 'adminOrderDetail',
        component: AdminOrderDetail,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
