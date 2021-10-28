<template>
  <div>
    <add-supplier></add-supplier>
  </div>
</template>

<script>
import AddSupplier from "@/components/supplier/AddSupplier.vue";
import ShopStore from "@/store/Shop";
export default {
  components: { AddSupplier },
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