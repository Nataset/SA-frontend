<template>
  <div>
    <div>
      <h1>ADD NEW ITEM</h1>
      <div>
        Name :
        <input type="text" name="name" placeholder="Name" v-model="form.name" />
      </div>
      <div>
        Amount :
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          v-model="form.amount"
        />
      </div>
      <div>
        Price :
        <input
          type="number"
          name="price"
          placeholder="Price"
          v-model="form.price"
        />
      </div>
      <div>
        Min stock :
        <input
          type="number"
          name="min_stock"
          placeholder="Min stock"
          v-model="form.min_stock"
        />
      </div>
      <div><button>Upload Image</button></div>
      <div><button @click="addItem">Add</button></div>
      <div>
        <router-link to="/"><button>Cancel</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ShopStore from "@/store/Shop";
export default {
  data() {
    return {
      form: {
        name: "",
        amount: "",
        price: "",
        min_stock: "",
      },
    };
  },
  methods: {
    async addItem() {
      if (
        this.form.name != "" &&
        this.form.amount >= 1 &&
        this.form.price >= 1 &&
        this.form.min_stock >= 1
      ) {
        let payload = {
          name: this.form.name,
          amount: this.form.amount,
          price: this.form.price,
          min_item: this.form.min_stock,
        };
        await ShopStore.dispatch("addItem", payload);
        this.$swal({ title: "Add Success!", icon: "success" });
        this.$router.push("/");
      } else {
        this.$swal("Add Failed", "Please complete your form", "error");
      }
    },
  },
};
</script>