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
                  <label class="text-muted ms-3"
                    >{{ item.price.toFixed(2) }}
                  </label>
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
                    >{{ item.pivot.total_item_price.toFixed(2) }}
                  </label>
                  <label class="text-muted ms-2"> บาท</label>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order.status != 'pending'" class="container-fluid text-center">
      <label class="w-100 fs-1 my-2">รูปหลักฐานการโอนเงิน</label>
      <img :src="picURL" alt="" class="img my-2 w-100" />
      <button
        class="btn btn-warning fs-4 ms-3 my-2"
        v-if="order.status == 'confirm'"
        @click="changeStatus('shifting')"
      >
        ยืนยันการโอนเงิน
      </button>
      <button
        class="btn btn-warning fs-4 ms-3 my-2"
        v-if="order.status == 'shifting'"
        @click="changeStatus('finished')"
      >
        ปิดคำสั่งซื้อ
      </button>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-5">
      <h3 class="d-flex align-items-center">
        <router-link to="/orderlist/all">
          <button class="btn btn-warning fs-4 ms-3">ย้อนกลับ</button>
        </router-link>
        <button
          class="btn btn-danger fs-4 ms-3"
          @click="deleteOrder()"
          v-if="order.status != 'finished'"
        >
          ยกเลิก
        </button>
      </h3>
      <h3 class="d-flex align-items-center p-2">
        <label class="me-3"
          >ราคาของสินค้าทั้งหมด :
          <label class="text-success">{{ total_price }}</label>
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
      total_price: "",
      endPoint: ShopStore.getters.endPoint,
      placeholder: "https://via.placeholder.com/200x200",
      order: {},
      picURL: "",
    };
  },
  async mounted() {
    if (!this.isAdmin()) {
      this.$swal(
        "You are not admin.",
        "Please login and go to this page again",
        "error"
      );
      this.$router.push("/login");
    }
    this.order_id = this.$route.params.id;
    await this.fetchOrderDetail();
    this.total_price = this.order.total_order_price.toFixed(2);
  },
  methods: {
    isAdmin() {
      return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
    },

    getValidImageUrl(url) {
      return url ? url : this.placeholder;
    },

    async fetchOrderDetail() {
      let url = this.endPoint + "/api/orders/" + this.order_id;
      let res = await axios(url);
      this.order = res.data;
      this.picURL = this.order.receipt_image
        ? // edit url to product image
          this.endPoint + "/" + this.order.receipt_image
        : this.placeholder;
    },
    async changeStatus(status) {
      this.$swal({
        title: "คุณแน่ใจที่จะเปลี่ยนสถานะคำสั่งซื้อนี้ใช่ไหม",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          let url = this.endPoint + "/api/user/orders/status/" + this.order_id;
          let payload = {
            status: status,
          };
          let res = await axios.put(url, payload);

          this.$swal("เปลี่ยนสถานะคำสั่งซื้อสำเร็จ", "", "success").then(() => {
            this.$router.push("/orderlist/all");
          });
        }
      });
    },
    async deleteOrder() {
      this.$swal({
        title: "คุณแน่ใจที่จะลบคำสั่งซื้อนี้ใช่ไหม",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          let url = this.endPoint + "/api/user/orders/" + this.order_id;
          let res = await axios.delete(url);
          if (res.data.status === "success") {
            this.$swal("ลบคำสั่งซื้อสำเร็จ", "", "success").then(() => {
              this.$router.push("/orderlist/all");
            });
          } else if (res.data.status == "fail") {
            this.$swal("เกิดข้อผิดพลาดขึ้น", res.data.message, "error");
          } else {
            this.$swal("เกิดข้อผิดพลาดขึ้น", "กรุณาลองอีกครั้ง", "error");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.img {
  object-fit: scale-down;
  width: 500px;
  height: 500px;
}
</style>