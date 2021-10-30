<template>
    <div class="container">
        <h1 class="text-center mt-5" v-if="!restockOrder">ไม่มี restock order อยู่ในระบบ</h1>
        <table v-if="restockOrder" class="table container mt-5 table-secondary text-center">
            <thead class="table-dark">
                <tr>
                    <th class="col-1" scope="col">Order ID</th>
                    <th class="col-1" scope="col">ชื่อสินค้า</th>
                    <th class="col-1" scope="col ">จำนวนที่สั้งเพิ่ม</th>
                    <th class="col-2" scope="col ">ราคารวม</th>
                    <th class="col-2 text-start" scope="col">วันที่สร้างคำสั้งซื้อ</th>
                    <th class="col-1" scope="col">สถานะ</th>
                    <th class="col-2" scope="col "></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in restockOrder" v-bind:key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.items[0].name }}</td>
                    <td>{{ order.items[0].pivot.amount }}</td>
                    <td>{{ order.total_restock_price.toFixed(2) }} บาท</td>
                    <td class="text-start">{{ dateFormat(order.created_at) }}</td>
                    <td>{{ order.status }}</td>
                    <td>
                        <button @click="infoHandler(order.id)" class="btn btn-primary">
                            เพิ่มเติม
                        </button>
                        <button @click="statusHandler(order.id)" class="btn btn-warning ms-1">
                            เปลี่ยนสถานะ
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';
import axios from 'axios';

export default {
    name: 'RestockOrder',
    data() {
        return {
            endPoint: ShopStore.getters.endPoint,
            restockOrder: '',
        };
    },
    async created() {
        await this.fetchRestockOrder();
    },
    methods: {
        async fetchRestockOrder() {
            let url = this.endPoint + '/api/restock';
            try {
                let res = await axios.post(url, { status: 'all' });
                console.log(res.data);
                this.restockOrder = res.data;
                return { status: 'success', data: res.data };
            } catch (err) {
                console.log('fail to fetch restock order');
                console.error(err);
                return { status: 'fail' };
            }
        },

        dateFormat(date) {
            const d = new Date(date);
            return `${d.toLocaleString()}`;
        },

        infoHandler(order_id) {
            let orderShow = '';
            this.restockOrder.forEach(order => {
                if (order.id == order_id) {
                    orderShow = order;
                }
            });
            this.$swal({
                icon: 'info',
                title: 'Order ID : ' + orderShow.id,
                text: `สถานะ : ${orderShow.status}\n
                ชื่อสินค้า : ${orderShow.items[0].name}\n
                ชื่อ Supplier : ${orderShow.supplier.name}\n
                จำนวนสินค้าที่สั้ง : ${orderShow.items[0].pivot.amount}\n
                ราคาของสินค้าต่อชิ้น : ${orderShow.items[0].pivot.buyPrice.toFixed(2)} บาท\n
                ราคาของสินค้าทั้งหมด : ${orderShow.items[0].pivot.total_item_price.toFixed(2)} บาท\n
                ค่าขนส่ง : ${orderShow.ship_price.toFixed(2)} บาท\n
                ราคารวมทั้งหมด : ${orderShow.total_restock_price.toFixed(2)} บาท\n
                วันที่สร้างคำสั้งซื้อ : ${this.dateFormat(orderShow.created_at)}`,
            });
        },

        async statusHandler(order_id) {
            this.$swal({
                title: 'คุณแน่ใจที่จะเปลี่ยนสถานะคำสั้งซื้อ',
                icon: 'warning',
                text: 'ถ้าเปลี่ยนสถานะแล้วจะไม่สามารถเปลี่ยนกลับได้!!',
                buttons: true,
                dangerMode: true,
            }).then(async result => {
                if (result) {
                    let res = await this.updateStatus(order_id);
                    res.status == 'success' ? this.updateSccessHandler() : this.updateFailHandler();
                }
            });
        },

        async updateStatus(order_id) {
            let url = this.endPoint + '/api/restock/status/' + order_id;
            try {
                let res = await axios.put(url, { status: 'finished' });
                console.log(res.data);
                return { status: 'success', data: res.data };
            } catch (err) {
                console.log('fail to updata status');
                console.error(err);
                return { status: 'fail' };
            }
        },

        updateFailHandler() {
            this.$swal('เปลี่ยนสถานะไม่สำเร็จ', 'เพิ่มสินค้าผิดพลาดโปรดลองใหม่', 'error');
        },

        updateSccessHandler() {
            this.$swal('เปลี่ยนสถานะสำเร็จ', '', 'success').then(() => {
                this.restockOrder = undefined;
                this.fetchRestockOrder();
            });
        },
    },
};
</script>

<style></style>
