<template>
  <div class="container d-flex justify-content-center mt-5">
    <div
      class="bg-light p-5 border border-secondary rounded-3"
      style="width: 60%"
    >
      <div class="text-center row justify-content-center">
        <h1>เพิ่ม SUPPLIER ใหม่</h1>
        <div class="row justify-content-center mt-5">
          <label class="col-2 form-label align-self-center">
            ชื่อ Supplier :
          </label>
          <div class="col-5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              v-model="form.name"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
          <div>
            <button
              class="btn btn-success px-5 mx-5"
              @click="addSupplier"
            >
              Add
            </button>
          </div>
          <div>
            <router-link to="/supplier"
              ><button class="btn btn-danger px-5 mx-5">
                Cancel
              </button></router-link
            >
          </div>
        </div>
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
        this.$swal({
          title: "คุณแน่ใจที่เพิ่ม Supplier ใช่ไหม",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (result) => {
          if (result) {
            await SupplierStore.dispatch("addSupplier", payload);
            this.$swal({ title: "เพิ่มสำเร็จ!", icon: "success" });
            this.$router.push("/supplier");
          }
        });
      } else {
        this.$swal("เพิ่มไม่สำเร็จ", "กรุณากรอกชื่อ", "error");
      }
    },
  },
};
</script>