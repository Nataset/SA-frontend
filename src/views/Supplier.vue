<template>
  <div>
    <supplier-list></supplier-list>
  </div>
</template>

<script>
import SupplierList from "@/components/supplier/SupplierList.vue";
import ShopStore from "@/store/Shop";
export default {
  components: { SupplierList },
  async created() {
    if (!this.isAdmin()) {
      this.$swal(
        "You are not admin.",
        "Please login and go to this page again",
        "error"
      );
      this.$router.push("/login");
    }
  },
  methods: {
    isAdmin() {
      return ShopStore.getters.isAuthen ? ShopStore.getters.isAdmin : false;
    },
  },
};
</script>
