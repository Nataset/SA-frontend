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
            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success d-inline w-25 mx-5" @click="editItem">ยืนยัน</button>
                <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">ยกเลิก</button>
            </div>
        </div>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';
export default {
    props: {
        id: '',
    },
    data() {
        return {
            item: {},
        };
    },
    async created() {
        await ShopStore.dispatch('getItemById', this.id);
        this.item = ShopStore.getters.editItem;
    },
    methods: {
        async editItem() {
            if (
                this.item.name != '' &&
                this.item.amount >= 1 &&
                this.item.price >= 1 &&
                this.item.min_item >= 1
            ) {
                let payload = {
                    name: this.item.name,
                    amount: this.item.amount,
                    price: this.item.price,
                    min_item: this.item.min_item,
                    id: this.id,
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
    },
};
</script>
