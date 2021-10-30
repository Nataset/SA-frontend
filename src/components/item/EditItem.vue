<template>
    <div class="container d-flex justify-content-center  mt-5">
        <div class="bg-light p-5 border border-secondary rounded-3" style="width: 60%;">
            <h3 class="text-center row justify-content-center">แก้ไขข้อมูลสินค้า</h3>
            <div class="row justify-content-center mt-5">
                <label class="col-2 form-label align-self-center"> ชื่อสินค้า :</label>
                <div class="col-5">
                    <input
                        type="text"
                        class="col-4 form-control"
                        name="name"
                        placeholder="Name"
                        v-model="item.name"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-2 form-label align-self-center">จำนวน :</label>
                <div class="col-5">
                    <input
                        type="number"
                        class="form-control"
                        name="amount"
                        placeholder="Amount"
                        v-model="item.amount"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-2 form-label align-self-center">ราคา :</label>
                <div class="col-5">
                    <input
                        type="number"
                        class="form-control"
                        name="price"
                        placeholder="Price"
                        v-model="item.price"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-2 form-label align-self-center">จำนวนที่จะแจ้งเตือน :</label>
                <div class="col-5">
                    <input
                        type="number"
                        name="min_item"
                        placeholder="Min stock"
                        v-model="item.min_item"
                        class="form-control"
                    />
                </div>
            </div>

            <div class="row justify-content-center mt-3">
                <div class="dropdown col-3 text-center">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        เลือก Supplier
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li v-for="supplier in suppliers" :key="supplier.id">
                            <a
                                class="dropdown-item btn"
                                @click="selectSuppliersHandler(supplier)"
                                >{{ supplier.name }}</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row justify-content-center mt-4 pb-2" v-if="selectSuppliers.length !== 0">
                <div class="col-5 align-self-center">
                    <label class="form-label ">Supplier ที่ถูกเลือกแล้ว :</label>

                    <ul
                        class="list-group"
                        v-for="(supplier, index) in selectSuppliers"
                        :key="index"
                    >
                        <li class="list-group-item">{{ supplier.name }}</li>
                    </ul>
                </div>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success d-inline w-25 mx-5" @click="editItem">ยืนยัน</button>
                <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">ยกเลิก</button>
            </div>
        </div>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';
import SupplierStore from '@/store/supplier';
import axios from 'axios';

export default {
    props: {
        id: '',
    },
    data() {
        return {
            item: {},
            selectSuppliers: [],
            suppliers: [],
        };
    },
    async created() {
        await this.fetchItem();
        await this.fetchSuppliers();
        console.log(this.item);
        console.log(this.selectSuppliers);
    },
    methods: {
        async editItem() {
            if (
                this.item.name != '' &&
                this.item.amount >= 1 &&
                this.item.price >= 1 &&
                this.item.min_item >= 1 &&
                this.selectSuppliers.length >= 1
            ) {
                let payload = {
                    name: this.item.name,
                    amount: this.item.amount,
                    price: this.item.price,
                    min_item: this.item.min_item,
                    id: this.id,
                    selectSuppliers: this.selectSuppliers,
                };
                await ShopStore.dispatch('editItem', payload);
                this.$swal({ title: 'แก้ไขสินค้าสำเร็จ!', icon: 'success' });
                this.$router.push('/');
            } else {
                this.$swal(
                    'แก้ไขสินค้าไม่สำเร็จ',
                    'กรุณาใส่ข้อมูลให้ครบ หรือ ข้อมูลผิดพลาด',
                    'error',
                );
            }
        },

        onCancel() {
            this.$swal({
                title: 'คุณแน่ใจที่จะยกเลิกการแก้ไขสินค้า',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(result => {
                if (result) {
                    this.$router.push('/');
                }
            });
        },

        async fetchItem() {
            await ShopStore.dispatch('getItemById', this.id);
            this.item = ShopStore.getters.editItem;
            this.selectSuppliers = JSON.parse(JSON.stringify(this.item.suppliers));
        },

        async fetchSuppliers() {
            await SupplierStore.dispatch('fetchSuppliers');
            this.suppliers = SupplierStore.getters.suppliers;
        },

        selectSuppliersHandler(supplier) {
            let find = false;
            this.selectSuppliers.forEach(seleted => {
                if (seleted.id === supplier.id) {
                    find = true;
                }
            });
            find
                ? (this.selectSuppliers = this.selectSuppliers.filter(e => e.id !== supplier.id))
                : this.selectSuppliers.push(supplier);
        },
    },
};
</script>
