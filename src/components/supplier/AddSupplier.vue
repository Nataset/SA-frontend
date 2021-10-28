<template>
  <div>
    <div>
      <h1>ADD NEW SUPPLIER</h1>
      <div>
        Name :
        <input type="text" name="name" placeholder="Name" v-model="form.name" />
      </div>
      <div><button @click="addSupplier">Add</button></div>
      <div>
        <router-link to="/supplier"><button>Cancel</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SupplierStore from "../../store/supplier";
export default {
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    async addSupplier() {
      if (this.form.name != "") {
        let payload = {
          name: this.form.name,
        };
        await SupplierStore.dispatch("addSupplier", payload);
        this.$swal({ title: "Add Success!", icon: "success" });
        this.$router.push("/supplier");
      } else {
        this.$swal("Add Failed", "Please complete your form", "error");
      }
    },
  },
};
</script>