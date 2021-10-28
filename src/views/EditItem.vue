<template>
  <div>
    <edit-item :id="this.id" />
  </div>
</template>

<script>
import EditItem from "@/components/item/EditItem.vue";
import ShopStore from "@/store/Shop";

export default {
  components: {
    EditItem,
  },
  data() {
    return {
      id: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
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