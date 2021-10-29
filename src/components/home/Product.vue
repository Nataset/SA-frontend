<template>
  <div class="mb-4 bg-white" id="flex-content">
    <img
      src="../../../public/box.png"
      class="mt-4"
      width="250"
      height="250"
      v-if="isItemPicNull()"
    />
    <img
      v-bind:src="picURL"
      class="mt-4"
      width="250"
      height="250"
      v-if="!isItemPicNull()"
    />
    <h4 class="mt-3">{{ title }}</h4>
    <h5 class="mt-1">Amount: {{ amount }}</h5>
    <h5 class="mt-1">Price: {{ price.toFixed(2) }} Baht</h5>
    <div class="d-grid gap-2 col-8 mx-auto">
      <button type="button" class="btn btn-danger mb-2" v-if="isAdmin()">
        Restock
      </button>
      <button
        type="button"
        class="btn btn-danger mb-4"
        v-if="isAdmin()"
        @click="edit(item)"
      >
        Edit</button
      ><button
        type="button"
        class="btn btn-danger mb-4"
        @click="addItemToCart"
        v-if="!isAdmin()"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import ShopStore from "@/store/Shop";
import userCart from "@/store/Cart";

export default {
  name: "Item",
  props: ["item"],
  data() {
    return {
      currentUser: "",
      placeholder: "https://via.placeholder.com/250x250",
      title: "",
      amount: "",
      price: "",
      picURL: "",
    };
  },
  created() {
    this.validProductData();
    // this.fetchCurrentUserdata();
  },
  methods: {
    isAuthen() {
      return ShopStore.getters.isAuthen;
    },

    addItemToCart() {
      userCart.commit("addItemInCart", this.item);
      this.$swal(
        `เพิ่มสินค้าสำเร็จ`,
        `เพิ่ม ${this.title} 1 จำนวนลงใน Cart`,
        "success"
      );
    },
    isAdmin() {
      return ShopStore.getters.isAdmin;
    },
    // Check If image exists
    checkImage(url) {
      return axios.get(url).then((result) => {
        url = this.endPoint + url;
        return result.status == 200 ? true : false;
      });
    },
    async getValidImageUrl(url) {
      return (await this.checkImage(url)) ? url : this.placeholder;
    },
    async validProductData() {
      this.title = this.item.name || "Item TITLE";
      this.price = this.item.price ? this.item.price : "Item PRICE";
      this.amount = this.item.amount ? this.item.amount : "Item AMOUNT";
      this.picURL = this.item.image_path
        ? // edit url to product image
          await this.getValidImageUrl(this.product.photo.formats.small.url)
        : this.placeholder;
    },
    fetchCurrentUserdata() {
      this.currentUser = ShopStore.getters.getCurrentUser;
    },
    isItemPicNull() {
      return this.item.image_path === null;
    },
    buyItem() {
      console.log("THIS IS FROM BUY ITEM FUNCTION");
    },
    edit(item) {
      if (this.isAdmin()) {
        this.$router.push({
          name: "EditItem",
          params: { id: item.id },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Questrial&display=swap");

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
