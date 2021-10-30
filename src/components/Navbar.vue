<template>
    <div class="container" id="navbar">
        <div class="container my-3">
            <div class="row">
                <div class="col display-4 align-self-center">
                    <label style="font-family: Fira Sans; color: #f3262d; font-weight: 600"
                        >BRAND</label
                    >
                    <label class="ms-3" style="font-family: Raleway">LOGO</label>
                </div>
                <div class="col align-self-center text-end">
                    <label class="me-5" v-if="isAuthen()">
                        Email:
                        {{ currentUser ? currentUser.user.email : 'Fail to Load' }}
                    </label>
                    <router-link to="/login" class="me-4" v-if="!isAuthen()"
                        ><button
                            type="button"
                            class="btn btn-outline-dark px-3"
                            style="font-family: Raleway"
                        >
                            LOGIN
                        </button>
                    </router-link>
                    <router-link to="/cart">
                        <button
                            id="cart"
                            type="button"
                            v-if="isAuthen()"
                            class="btn btn btn-warning px-3 me-3 position-relative"
                            style="font-family: Raleway"
                        >
                            <span
                                v-if="ItemAmountInCart()"
                                class="
                  position-absolute
                  top-0
                  start-100
                  translate-middle
                  badge
                  rounded-pill
                  bg-danger
                "
                                >{{ ItemAmountInCart() }}
                            </span>
                        </button>
                    </router-link>
                    <router-link to="/logout" class="me-4" v-if="isAuthen()"
                        ><button
                            type="button"
                            class="btn btn-outline-dark px-3"
                            style="font-family: Raleway"
                        >
                            LOGOUT
                        </button>
                    </router-link>
                    <router-link to="/register" class="me-3" v-if="!isAuthen()"
                        ><button
                            type="button"
                            class="btn btn-danger px-5"
                            style="font-family: Fira Sans"
                        >
                            REGISTER &nbsp;&nbsp;>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="!isAdmin()">
            <ul class="navbar-nav mx-auto" style="font-family: Fira Sans; font-weight: 600">
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/">Home</router-link>
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/howtopay"
                        >How to Pay</router-link
                    >
                </li>

                <!-- <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/profile">Profile</router-link>
                </li> -->

                <li v-if="isAuthen()" class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/orderlist"
                        >Order List</router-link
                    >
                </li>
            </ul>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isAdmin()">
            <ul class="navbar-nav mx-auto" style="font-family: Fira Sans; font-weight: 600">
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/">Stock</router-link>
                </li>

                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/supplier"
                        >Supplier
                    </router-link>
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/restocklist"
                        >Restock Order List</router-link
                    >
                </li>
                <li class="nav-item text-center mx-5">
                    <router-link class="nav-link text-uppercase" to="/orderlist/all"
                        >Customer Order List</router-link
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import 'bootstrap/scss/bootstrap.scss';
import '@popperjs/core';
import 'bootstrap';
import ShopStore from '@/store/Shop';
import userCart from '@/store/Cart';

export default {
    data() {
        return {
            currentUser: [],
        };
    },
    created() {
        this.currentUser = ShopStore.getters.currentUser;
    },

    methods: {
        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
        },
        isAuthen() {
            return ShopStore.getters.isAuthen;
        },
        ItemAmountInCart() {
            return userCart.getters.itemTypeAmount;
        },
    },
    name: 'Navbar',
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');

#cart {
    background-image: url('./../../public/cart.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 33px 30px;
    height: 40px;
    width: 50px;
}
</style>
