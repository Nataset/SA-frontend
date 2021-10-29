<template>
  <div>
    <div class="container-fluid text-center">
      <jumbotron></jumbotron>
      <div
        class="container border border-danger bg-danger p-3"
        id="flex"
        v-if="isAdmin()"
      >
        <div class="fs-1 text-white w-100">Need to Restock</div>
        <br />
        <product
          v-for="(item, index) in min_items"
          v-bind:key="index"
          :item="item"
        ></product>
      </div>
      <div class="container" id="flex" v-if="isAdmin()">
        <div class="mb-4" id="flex-content">
          <router-link to="/item/add"
            ><img
              src="../../public/plus.png"
              alt="plus"
              class="mt-4"
              width="280"
              height="320"
          /></router-link>
        </div>
        <product
          v-for="(item, index) in cut_items"
          v-bind:key="index"
          :item="item"
        ></product>
      </div>
      <div class="container" id="flex">
        <product
          v-for="(item, index) in items"
          v-bind:key="index"
          :item="item"
        ></product>
      </div>
    </div>
</template>

<script>
import Jumbotron from "../components/home/Jumbotron.vue";
import Product from "../components/home/Product.vue";

import ShopStore from "../store/Shop";
export default {
  name: "Home",
  components: { Jumbotron, Product },
  data() {
    return {
      currentUser: [],
      items: [],
      cut_items: [],
      min_items: [],
    };
  },
  async created() {
    await this.fetchItemsData();
    if (this.isAdmin()) {
      this.fetchMinItems();
    }
  },
  methods: {
    async fetchItemsData() {
      this.items = await ShopStore.dispatch("fetchItems");
    },

    getCurrectUser() {
      if (ShopStore.getters.isAuthen)
        this.currentUser = ShopStore.getters.getCurrentUser;
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
    async fetchMinItems() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].amount < this.items[i].min_item) {
          this.min_items.push(this.items[i]);
        }
      }
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].amount < this.items[i].min_item) {
          this.items.splice(i, 1);
          i--;
        }
      }
      this.cut_items = this.items;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  font-family: "Questrial", sans-serif;
  cursor: pointer;
}
#flex-content:hover {
  transform: scale(1.05);
  transition: 0.25s;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
}

#flex-content::before {
  content: "";
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
