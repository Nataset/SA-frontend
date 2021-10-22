<template>
    <div>
        <div class="container-fluid text-center">
            <jumbotron></jumbotron>

            <div class="container" id="flex">
                <product v-for="(item, index) in items" v-bind:key="index" :item="item"></product>
            </div>
        </div>
    </div>
</template>

<script>
import Jumbotron from '../components/home/Jumbotron.vue';
import Product from '../components/home/Product.vue';
import ProductAdd from '../components/home/ProductAdd.vue';
import ShopStore from '../store/Shop';
export default {
    name: 'Home',
    components: { Jumbotron, Product, ProductAdd },
    data() {
        return {
            currentUser: [],
            items: [],
        };
    },
    async created() {
        await this.fetchItemsData();
    },
    methods: {
        async fetchItemsData() {
            this.items = await ShopStore.dispatch('fetchItems');
        },

        getCurrectUser() {
            if (ShopStore.getters.isAuthen) this.currentUser = ShopStore.getters.getCurrentUser;
        },

        getEndPoint() {
            this.endPoint = ShopStore.getters.getEndPoint;
        },

        isAdmin() {
            return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
        },

        isAuthen() {
            return ShopStore.getters.isAuthen;
        },
    },
};
</script>

<style lang="scss" scoped>
#flex {
    display: flex;
    flex-wrap: wrap;
}
</style>
