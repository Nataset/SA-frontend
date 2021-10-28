<template>
  <div>
    <div>
      <router-link to="/supplier/add"
        ><button>Add new supplier</button></router-link
      >
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>NO.</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(supplier, index) in suppliers" :key="index">
            <td>{{ index + 1 }}</td>
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