<template>
  <div class="container">
    <div class="row justify-content-end mt-4">
      <div class="dropdown col-3 text-center">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          เลือก Sort
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <a class="dropdown-item btn" @click="fetchOrderData('all')">All</a>
          <a class="dropdown-item btn" @click="fetchOrderData('pending')"
            >Pending</a
          >
          <a class="dropdown-item btn" @click="fetchOrderData('confirm')"
            >Confirm</a
          >
          <a class="dropdown-item btn" @click="fetchOrderData('shifting')"
            >Shifting</a
          >
          <a class="dropdown-item btn" @click="fetchOrderData('finished')"
            >Finished</a
          >
        </ul>
      </div>
    </div>
    <table class="table container mt-4 table-secondary text-center">
      <thead class="table-dark">
        <tr>
          <th class="col-1" scope="col">Order ID</th>
          <th class="col-1" scope="col">ประเภทสินค้า</th>
          <th class="col-2" scope="col ">ราคาของสินค้าทั้งหมด</th>
          <th class="col-2 text-start" scope="col">วันที่สร้างคำสั่งซื้อ</th>
          <th class="col-1" scope="col">สถานะ</th>
          <th class="col-2" scope="col "></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderList" v-bind:key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.items.length }}</td>
          <td>{{ order.total_order_price.toFixed(2) }} บาท</td>
          <td class="text-start">{{ dateFormat(order.created_at) }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="infoHandler(order.id)" class="btn btn-primary">
              เพิ่มเติม
            </button>
            <button
              @click="receiptHandler(order.id)"
              class="btn btn-warning ms-1"
              v-if="order.status != 'finished'"
            >
              ยืนยันการโอนเงิน
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import ShopStore from "@/store/Shop";
export default {
  name: "orderList",
  data() {
    return {
      endpoint: ShopStore.getters.endPoint,
      placeholder: "https://via.placeholder.com/200x200",
      orderList: [],
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
    await this.fetchOrderData("all");
  },
  methods: {
    isAuthen() {
      return ShopStore.getters.isAuthen && !ShopStore.getters.isAdmin;
    },
    async fetchOrderData(status) {
      let user_id = ShopStore.getters.currentUser.user.id;
      let url = `${this.endpoint}/api/user/orders/${user_id}`;
      try {
        let res = await axios.post(url, { status: status });
        this.orderList = res.data;
      } catch (err) {
        console.log("error at fetchOrderData");
        console.error(err);
      }
    },
    dateFormat(date) {
      const d = new Date(date);
      return `${d.toLocaleString()}`;
    },

    infoHandler(order_id) {
      this.$router.push("/orderlist/order/" + order_id);
    },

    receiptHandler(order_id) {
      this.$router.push("/orderlist/order/" + order_id + "/receipt");
    },
  },
};
</script>
<style></style>
