<template>
  <div class="container">
    <div class="mt-5">
      <div
        class="card mb-3 mx-5"
        v-for="(item, index) in order.items"
        v-bind:key="index"
      >
        <div class="row g-0">
          <div class="col-md-3">
            <img
              v-bind:src="getValidImageUrl(item.image_path)"
              class="img-fluid rounded-start"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title mt-2">
                {{ item.name }}
              </h4>
              <div
                style="margin-top: 80px"
                class="
                  text-end
                  w-100
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <h5 class="card-text d-inline">
                  ราคา :
                  <label class="text-muted ms-3">{{ item.price }} </label>
                  <label class="text-muted ms-2"> บาท</label>
                </h5>
                <h5 class="card-text d-inline d-flex align-items-center">
                  จำนวนสินค้า :

                  <label class="mx-2 p-2 text-muted">{{
                    item.pivot.amount
                  }}</label>
                </h5>
                <h5 class="card-text d-inline">
                  ราคารวม :
                  <label class="text-muted ms-3"
                    >{{ item.pivot.total_item_price }}
                  </label>
                  <label class="text-muted ms-2"> บาท</label>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-5">
      <h3 class="d-flex align-items-center">
        <router-link to="/orderlist">
          <button class="btn btn-warning fs-4 ms-3">ย้อนกลับ</button>
        </router-link>
      </h3>
      <h3 class="d-flex align-items-center p-2">
        <label class="me-3"
          >ราคาของสินค้าทั้งหมด :
          <label class="text-success">{{ order.total_order_price }}</label>
          บาท</label
        >
      </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShopStore from "@/store/Shop";

export default {
  name: "OrderDetail",
  data() {
    return {
      order_id: "",
      endPoint: ShopStore.getters.endPoint,
      placeholder: "https://via.placeholder.com/200x200",
      order: {},
    };
  },
  async created() {
    if (!this.isAuthen()) {
      this.$swal(
        "You are not logged.",
        "Please login and go to this page again",
        "error"
      );
      this.$router.push("/login");
    }
    this.order_id = this.$route.params.id;
    await this.fetchOrderDetail();
  },
  methods: {
    isAuthen() {
      return ShopStore.getters.isAuthen && !ShopStore.getters.isAdmin;
    },

    getValidImageUrl(url) {
      return url ? url : this.placeholder;
    },

    async fetchOrderDetail() {
      let url = this.endPoint + "/api/orders/" + this.order_id;
      let res = await axios(url);
      this.order = res.data;
      console.dir(this.order);
    },
  },
};
</script>

<style></style>
