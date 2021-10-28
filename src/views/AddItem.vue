<template>
  <div>
    <add-item></add-item>
  </div>
</template>

<script>
import AddItem from "@/components/item/AddItem.vue";
import ShopStore from "@/store/Shop";
export default {
  components: { AddItem },
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