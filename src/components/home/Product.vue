<template>
    <div class="mb-4 bg-white" id="flex-content">
        <img :src="picURL" class="mt-4" width="250" height="250" />
        <h4 class="mt-3">{{ title }}</h4>
        <h5 class="mt-1">จำนวน: {{ amount }}</h5>
        <h5 class="mt-1">ราคา: {{ price.toFixed(2) }} บาท</h5>
        <div class="d-grid gap-2 col-8 mx-auto">
            <button
                type="button"
                class="btn btn-danger mb-2"
                v-if="isAdmin()"
                @click="onRestock(item.id)"
            >
                Restock
            </button>
            <button type="button" class="btn btn-danger mb-4" v-if="isAdmin()" @click="edit(item)">
                Edit</button
            ><button
                type="button"
                class="btn btn-danger mb-4"
                @click="addItemToCart"
                v-if="!isAdmin()"
            >
                ใส่ในตะตร้า
            </button>
        </div>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';
import userCart from '@/store/Cart';
import axios from 'axios';

export default {
    name: 'Item',
    props: ['item'],
    data() {
        return {
            currentUser: '',
            placeholder: require('@/assets/box.png'),
            endPoint: ShopStore.getters.endPoint,
            title: '',
            amount: '',
            price: '',
            picURL: '',
        };
    },
    async created() {
        await this.validProductData();
        await this.fetchCurrentUserdata();
    },
    methods: {
        isAuthen() {
            return ShopStore.getters.isAuthen;
        },

        addItemToCart() {
            if (!this.isAuthen()) {
                console.log('TEST');
                this.$swal('กรุณา login ก่อน', '', 'error').then(() => {
                    this.$router.push('/login');
                });
            } else {
                userCart.commit('addItemInCart', this.item);
                this.$swal(`เพิ่มสินค้าสำเร็จ`, `เพิ่ม ${this.title} 1 จำนวนลงใน Cart`, 'success');
            }
        },
        isAdmin() {
            return ShopStore.getters.isAdmin;
        },

        // Check If image exists
        // BUG CORS can't fetch public image!!
        // checkImage(url) {
        //     return axios.get(url).then(result => {
        //         url = this.endPoint + url;
        //         return result.status == 200 ? true : false;
        //     });
        // },

        // async getValidImageUrl(url) {
        //     return url ? url : this.placeholder;
        // },

        async validProductData() {
            this.title = this.item.name || 'Item TITLE';
            this.price = this.item.price ? this.item.price : 'Item PRICE';
            this.amount = this.item.amount ? this.item.amount : 'Item AMOUNT';
            this.picURL = this.item.image_path
                ? // edit url to product image
                  this.endPoint + '/' + this.item.image_path
                : this.placeholder;
        },
        fetchCurrentUserdata() {
            this.currentUser = ShopStore.getters.getCurrentUser;
        },

        onRestock(item_id) {
            this.$router.push('/restock/' + item_id);
        },

        edit(item) {
            if (this.isAdmin()) {
                this.$router.push({
                    name: 'EditItem',
                    params: { id: item.id },
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');

* {
    box-sizing: border-box;
}
#flex {
    display: flex;
    flex-wrap: wrap;
}

#flex-content {
    position: relative;
    width: 29%;
    margin-left: 4%;
    text-align: center;
    padding-top: 10px;
    font-family: 'Questrial', sans-serif;
    cursor: pointer;
}
#flex-content:hover {
    transform: scale(1.05);
    transition: 0.25s;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
}

#flex-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    z-index: -1;
    background-color: white;
}
</style>
