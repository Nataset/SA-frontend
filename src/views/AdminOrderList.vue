<template>
  <div class="container">
    <table class="table container mt-5 table-secondary text-center">
      <thead class="table-dark">
        <tr>
          <th class="col-1" scope="col">Order Id</th>
          <th class="col-2" scope="col ">ชื่อลูกค้า</th>
          <th class="col-2" scope="col "></th>
          <th class="col-1" scope="col">ประเภทสินค้า</th>
          <th class="col-2" scope="col ">ราคาของสินค้าทั้งหมด</th>
          <th class="col-2 text-start" scope="col">วันที่สร้างคำสั้งซื้อ</th>
          <th class="col-1" scope="col">Status</th>
          <th class="col-2" scope="col "></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orderList" :key="index">
          <td>{{ order.id }}</td>
          <td>{{ order.user.firstname + " " + order.user.lastname }}</td>
          <td>
            <button
              @click="userInfoHandler(order.user.id)"
              class="btn btn-primary"
            >
              ข้อมูลลูกค้า
            </button>
          </td>
          <td>{{ order.items.length }}</td>
          <td>{{ order.total_order_price }} บาท</td>
          <td class="text-start">{{ dateFormat(order.created_at) }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="infoHandler(order.id)" class="btn btn-primary">
              เพิ่มเติม
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
  name: "AdminOrderList",
  data() {
    return {
      endpoint: ShopStore.getters.endPoint,
      placeholder: "https://via.placeholder.com/200x200",
      orderList: [],
    };
  },
  async created() {
    if (!this.isAdmin()) {
      this.$swal(
        "You are not admin.",
        "Please login and go to this page again",
        "error"
      );
      this.$router.push("/login");
    }
    await this.fetchOrderData("all");
  },
  methods: {
    isAdmin() {
      return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
    },

    async fetchOrderData(status) {
      let url = `${this.endpoint}/api/orders/all`;
      try {
        let res = await axios.post(url, { status: status });
        this.orderList = res.data;
      } catch (err) {}
    },
    dateFormat(date) {
      const d = new Date(date);
      return `${d.toLocaleString()}`;
    },

    infoHandler(order_id) {
      this.$router.push("/orderlist/order/" + order_id);
    },
    userInfoHandler(user_id) {
      this.$router.push("/user/" + user_id);
    },
  },
};
</script>
<style></style>
