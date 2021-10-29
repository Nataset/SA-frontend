<template>
    <div class="container">
        <table class="table container mt-5 table-secondary text-center">
            <thead class="table-dark">
                <tr>
                    <th class="col-1" scope="col">Order ID</th>
                    <th class="col-1" scope="col">ประเภทสินค้า</th>
                    <th class="col-2" scope="col ">ราคาของสินค้าทั้งหมด</th>
                    <th class="col-2 text-start" scope="col">วันที่สร้างคำสั้งซื้อ</th>
                    <th class="col-1" scope="col">Status</th>
                    <th class="col-2" scope="col "></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderList" v-bind:key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.items.length }}</td>
                    <td>{{ order.total_order_price }} บาท</td>
                    <td class="text-start">{{ dateFormat(order.created_at) }}</td>
                    <td>{{ order.status }}</td>
                    <td>
                        <button @click="infoHandler(order.id)" class="btn btn-primary">
                            เพิ่มเติม
                        </button>
                        <button @click="receiptHandler(order.id)" class="btn btn-warning ms-1">
                            ยืนยันการโอนเงิน
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import ShopStore from '@/store/Shop';
export default {
    name: 'orderList',
    data() {
        return {
            endpoint: ShopStore.getters.endPoint,
            placeholder: 'https://via.placeholder.com/200x200',
            orderList: [],
        };
    },
    async created() {
        if (!this.isAuthen()) {
            this.$swal('You are not logged.', 'Please login and go to this page again', 'error');
            this.$router.push('/login');
        }
        await this.fetchOrderData('all');
    },
    methods: {
        isAuthen() {
            return ShopStore.getters.isAuthen && !ShopStore.getters.isAdmin;
        },
        async fetchOrderData(status) {
            let user_id = ShopStore.getters.currentUser.user.id;
            let url = `${this.endpoint}/api/user/orders/${user_id}`;
            try {
                let res = await axios.post(url, { status: status });
                this.orderList = res.data;
                console.log(res.data);
            } catch (err) {
                console.log('error at fetchOrderData');
                console.error(err);
            }
        },
        dateFormat(date) {
            const d = new Date(date);
            return `${d.toLocaleString()}`;
        },

        infoHandler(order_id) {
            this.$router.push('/orderlist/order/' + order_id);
        },

        receiptHandler(order_id) {
            this.$router.push('/orderlist/order/' + order_id + '/receipt');
        },
    },
};
</script>
<style></style>
