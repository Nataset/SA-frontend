<template>
    <div class="container d-flex justify-content-center  mt-5">
        <div class="bg-light p-5 border border-secondary rounded-3" style="width: 60%;">
            <h3 class="text-center row justify-content-center">RESTOCK</h3>
            <div class="row justify-content-center mt-5">
                <img v-bind:src="getValidImageUrl(item.image_path)" class="border border-2" />
            </div>
            <div class="row justify-content-center mt-5">
                <label class="col-3 form-label align-self-center"> ชื่อสินค้า :</label>
                <div class="col-5">
                    <input
                        type="text"
                        class="col-5 form-control"
                        name="name"
                        placeholder="Name"
                        v-model="item.name"
                        disabled
                        readonly
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-3 form-label align-self-center">จำนวนปัจจุบัน :</label>
                <div class="col-5">
                    <input
                        type="number"
                        class="form-control"
                        name="amount"
                        placeholder="Amount"
                        v-model="item.amount"
                        disabled
                        readonly
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-3 form-label align-self-center">ราคาที่จะซื้อต่อชิ้น :</label>
                <div class="col-5">
                    <input
                        type="number"
                        class="form-control"
                        name="price"
                        placeholder="Price"
                        v-model="buyPrice"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-3 form-label align-self-center">จำนวนที่จะซื้อเพิ่ม :</label>
                <div class="col-5">
                    <input
                        type="number"
                        name="Buy Amount"
                        placeholder="Min stock"
                        class="form-control"
                        v-model="buyAmount"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <label class="col-3 form-label align-self-center">ค่าจัดส่ง :</label>
                <div class="col-5">
                    <input
                        type="number"
                        name="min_item"
                        placeholder="Transport cost"
                        class="form-control"
                        v-model="shipCost"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <div class="dropdown col-5 text-center d-flex align-items-center">
                    <label class="me-3  form-label">Supplier :</label>
                    <button
                        class="btn btn-secondary dropdown-toggle d-inline"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{ supplierWord }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li v-for="(supplier, index) in item.suppliers" :key="index">
                            <a class="dropdown-item btn" @click="onSelectSupplier(supplier)">{{
                                supplier.name
                            }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success d-inline w-25 mx-5" @click="onAdd">ยืนยัน</button>
                <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">ยกเลิก</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ShopStore from '@/store/Shop';

export default {
    name: 'Restock',
    data() {
        return {
            item_id: '',
            item: [],
            supplier: '',
            supplierWord: 'เลือก Supplier',
            buyPrice: '',
            buyAmount: '',
            shipCost: '',
            endPoint: ShopStore.getters.endPoint,
            placeholder: require('@/assets/box.png'),
        };
    },
    async created() {
        if (!this.isAdmin()) {
            this.$route.push('/');
        }
        this.item_id = this.$route.params.id;
        await this.fetchItem();
    },
    methods: {
        isAdmin() {
            return ShopStore.getters.isAdmin;
        },
        async fetchItem() {
            let url = this.endPoint + '/api/items/' + this.item_id;
            let res = await axios(url);
            this.item = res.data;
            console.log(res.data);
        },

        onSelectSupplier(supplier) {
            this.supplierWord = supplier.name;
            this.supplier = supplier;
        },

        getValidImageUrl(url) {
            return url ? `${this.endPoint}/${url}` : this.placeholder;
        },

        async createNewRestockOrder({
            ship_price,
            supplier_id,
            total_restock_price,
            item_id,
            buyAmount,
            buyPrice,
            total_item_price,
        }) {
            let url = this.endPoint + '/api/restock/add';
            console.log(url);
            let body = {
                supplier_id: supplier_id,
                ship_price: ship_price,
                total_restock_price: total_restock_price,
                item_id: item_id,
                buyAmount: buyAmount,
                buyPrice: buyPrice,
                total_item_price: total_item_price,
            };

            try {
                let res = await axios.post(url, body);
                console.log(res.data);
                return { status: 'success', data: res.data };
            } catch (err) {
                console.log('fail to create new Restock Order');
                console.error(err);
                return { status: 'fail' };
            }
        },

        async onAdd() {
            this.$swal({
                title: 'คุณแน่ใจที่สั่ง Stock เพิ่มใช่ไหม',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(async result => {
                if (result) {
                    if (this.validateData()) {
                        let total_restock_price = (
                            this.buyAmount * this.buyPrice +
                            parseFloat(this.shipCost)
                        ).toFixed(2);
                        let total_item_price = (this.buyAmount * this.buyPrice).toFixed(2);
                        let payload = {
                            ship_price: parseFloat(this.shipCost).toFixed(2),
                            supplier_id: this.supplier.id,
                            total_restock_price: total_restock_price,
                            item_id: this.item_id,
                            buyAmount: this.buyAmount,
                            buyPrice: parseFloat(this.buyPrice).toFixed(2),
                            total_item_price: total_item_price,
                        };
                        console.log(payload);
                        let res = await this.createNewRestockOrder(payload);
                        res.status == 'success'
                            ? this.uploadSccessHandler()
                            : this.uploadFailHandler();
                    } else {
                        this.$swal(
                            'สั่ง Stock ไม่สำเร็จ',
                            'โปรดใส่ข้อมูลที่จำเป็นให้ครบก่อนกดยืนยัน หรือข้อมูลผิดพลาด',
                            'error',
                        );
                    }
                }
            });
        },

        onCancel() {},

        validateData() {
            return (
                this.supplier.id &&
                !this.hasDecimal(this.buyAmount) &&
                this.buyAmount > 0 &&
                this.buyPrice > 0 &&
                this.item_id &&
                this.shipCost >= 0
            );
        },

        uploadFailHandler() {
            this.$swal('สั่ง Stock ไม่สำเร็จ', 'สั่ง Stock ไม่สำเร็จผิดพลาดโปรดลองใหม่', 'error');
        },

        uploadSccessHandler() {
            this.$swal('สั่ง Stock สำเร็จ', '', 'success').then(() => {
                this.$router.push('/');
            });
        },

        hasDecimal(num) {
            return !!(num % 1);
        },
    },
};
</script>

<style scoped>
img {
    object-fit: contain;
    width: 300px;
    height: 300px;
}
</style>
