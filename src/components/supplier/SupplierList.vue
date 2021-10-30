<template>
  <div class="container">
    <div>
      <router-link to="/supplier/add"
        ><button class="btn btn-primary my-5 px-5" id="suppBtn">
          เพิ่ม Supplier
        </button></router-link
      >
    </div>
    <div>
      <table class="table container table-secondary text-center">
        <thead class="table-dark">
          <tr>
            <th class="col-1" scope="col">Supplier Id</th>
            <th class="col-3" scope="col">ชื่อ Supplier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(supplier, index) in suppliers" :key="index">
            <td>{{ supplier.id }}</td>
            <td>{{ supplier.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SupplierStore from "../../store/supplier";
export default {
  data() {
    return {
      suppliers: [],
    };
  },
  async created() {
    await this.fetchSuppliers();
  },
  methods: {
    async fetchSuppliers() {
      await SupplierStore.dispatch("fetchSuppliers");
      this.suppliers = SupplierStore.getters.suppliers;
    },
  },
};
</script>
<style scoped>
#suppBtn {
  margin-left: 10%;
}
</style>