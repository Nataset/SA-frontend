<template>
    <div class="container">
        <div v-if="itemInCart[0]">
            <div class="mt-5">
                <div class="card mb-3 mx-5" v-for="(item, index) in itemInCart" v-bind:key="index">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img
                                v-bind:src="getValidImageUrl(item.image_path)"
                                class="img-fluid
                            rounded-start"
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title mt-2">
                                    {{ item.name }}
                                </h4>
                                <div
                                    style="margin-top: 80px;"
                                    class="text-end w-100 d-flex justify-content-between align-items-center"
                                >
                                    <h5 class="card-text d-inline">
                                        ราคา :
                                        <label class="text-muted ms-3"
                                            >{{ item.price.toFixed(2) }}
                                        </label>
                                        <label class="text-muted ms-2"> Baht</label>
                                    </h5>
                                    <h5 class="card-text d-inline d-flex align-items-center">
                                        จำนวนสินค้า :
                                        <button
                                            class="ms-3 btn btn-outline-secondary fs-4 pt-0"
                                            @click="addItemAmount(item.id)"
                                        >
                                            +
                                        </button>
                                        <label
                                            class="mx-2 border border-secondary p-2 text-muted"
                                            >{{ item.buyAmount }}</label
                                        >
                                        <button
                                            class="btn btn-outline-secondary fs-4 px-3 pt-0"
                                            @click="reduceItemAmount(item.id)"
                                        >
                                            -
                                        </button>
                                    </h5>
                                    <button
                                        class="btn btn-danger px-5"
                                        @click="removeItemInCart(item.id)"
                                    >
                                        <h5>ลบ</h5>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-5">
                <h3 class="d-flex align-items-center p-2">
                    <label class="me-3"
                        >ราคาของสินค้าทั้งหมด :
                        <label class="text-success">{{ getTotalPrice().toFixed(2) }}</label>
                        บาท</label
                    >
                    <button class="btn btn-success fs-4" @click="checkout()">เช็คเอาท์</button>
                </h3>
            </div>
        </div>
        <div v-if="!itemInCart[0]" class="text-center mt-5 pt-5">
            <h1>ไม่มีสินค้าอยู่ใน ตะกร้าสินค้า</h1>
        </div>
    </div>
</template>

<script>
import UserCart from '@/store/Cart';
import ShopStore from '@/store/Shop';

export default {
    name: 'Cart',
    data() {
        return {
            itemInCart: [],
            placeholder: 'https://via.placeholder.com/200x200',
        };
    },
    mounted() {
        this.setItemInCart();
    },

    methods: {
        setItemInCart() {
            this.itemInCart = UserCart.getters.itemInCart;
        },
        addItemAmount(item_id) {
            UserCart.commit('addItemAmount', item_id);
            this.itemInCart = undefined;
            this.setItemInCart();
        },
        reduceItemAmount(item_id) {
            UserCart.commit('reduceItemAmount', item_id);
            this.itemInCart = undefined;
            this.setItemInCart();
        },
        removeItemInCart(item_id) {
            UserCart.commit('removeItemInCart', item_id);
            this.setItemInCart();
        },

        getValidImageUrl(url) {
            return url ? url : this.placeholder;
        },

        getTotalPrice() {
            let totalPrice = 0;
            this.itemInCart.forEach(item => {
                totalPrice += item.price * item.buyAmount;
            });
            return totalPrice;
        },

        async checkout() {
            let payload = {
                user_id: ShopStore.getters.currentUser.user.id,
                total_order_price: this.getTotalPrice(),
                item: this.itemInCart,
            };

            console.log(payload);

            await UserCart.dispatch('checkout', payload);
        },
    },
};
</script>

<style></style>
