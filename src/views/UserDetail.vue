<template>
  <div>
    <div>ชื่อ-นามสกุล : {{ user.firstname + " " + user.lastname }}</div>
    <div>Email : {{ user.email }}</div>
    <div>ที่อยู่ : {{ user.address }}</div>
    <router-link to="/orderlist/all"><button>ย้อนกลับ</button></router-link>
  </div>
</template>

<script>
import axios from "axios";
import ShopStore from "@/store/Shop";

export default {
  name: "UserDetail",
  data() {
    return {
      user_id: "",
      endPoint: ShopStore.getters.endPoint,
      placeholder: "https://via.placeholder.com/200x200",
      user: {},
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
    this.user_id = this.$route.params.id;
    await this.fetchUserDetail();
    console.log(this.user);
  },
  methods: {
    isAdmin() {
      return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
    },

    async fetchUserDetail() {
      let url = this.endPoint + "/api/auth/user/" + this.user_id;
      let res = await axios(url);
      this.user = res.data;
    },
  },
};
</script>

<style></style>