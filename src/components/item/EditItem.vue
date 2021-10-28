<template>
  <div>
    <div>
      <h1>EDIT ITEM</h1>
      <div>
        Name :
        <input type="text" v-model="item.name" />
      </div>
      <div>
        Amount :
        <input type="number" v-model="item.amount" />
      </div>
      <div>
        Price :
        <input type="number" v-model="item.price" />
      </div>
      <div>
        Min stock :
        <input type="number" v-model="item.min_stock" />
      </div>
      <div><button>Upload Image</button></div>
      <div><button @click="editItem">Edit</button></div>
      <div>
        <router-link to="/"><button>Cancel</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ShopStore from "@/store/Shop";
export default {
  props: {
    id: "",
  },
  data() {
    return {
      item: {},
    };
  },
  async created() {
    console.log(this.id);
    await ShopStore.dispatch("getItemById", this.id );
    this.item = ShopStore.getters.editItem;
  },
  methods: {
    async editItem() {
      if (
        this.form.name != "" &&
        this.form.amount >= 1 &&
        this.form.price >= 1 &&
        this.form.min_stock >= 1
      ) {
        let payload = {
          name: this.item.name,
          amount: this.item.amount,
          price: this.item.price,
          min_item: this.item.min_stock,
        };
        await ShopStore.dispatch("addItem", payload);
        this.$swal({ title: "Edit Success!", icon: "success" });
        this.$router.push("/");
      } else {
        this.$swal("Edit Failed", "Please complete your form", "error");
      }
    },
  },
};
</script>