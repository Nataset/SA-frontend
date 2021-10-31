<template>
    <div class="container d-flex justify-content-center  mt-5">
        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="true"
            :paginate-elements-by-height="1400"
            filename="hee hee"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="800px"
            @progress="onProgress($event)"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
        >
            <section slot="pdf-content">
                <!-- PDF Content Here -->
                <div class="d-flex justify-content-center  mt-2 ">
                    <div class=" p-4 px-5 " style="width: 95%;">
                        <div class="row mt-1">
                            <div class="col align-self-center text-center">
                                <img
                                    src="../../public/logo.png"
                                    width="250"
                                    height="75"
                                    class="border rounded-3"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-3">
                            <div class="col-2">
                                <h4>ใบสั่งซื้อ</h4>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-7 border border-dark rounded-3 me-1 p-2">
                                <div class="row">
                                    <div class="col-3">
                                        <label><b>ชื่อผู้ขาย</b></label>
                                    </div>
                                    <div class="col">
                                        <label>{{ resOrder ? resOrder.supplier.name : '' }}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3">
                                        <label><b>ชื่อผู้ติดต่อ</b></label>
                                    </div>
                                    <div class="col">
                                        <label>_______________________</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3">
                                        <label><b>ที่อยู่</b></label>
                                    </div>
                                    <div class="col">
                                        <label
                                            >________________________________________
                                            ________________________________________</label
                                        >
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3 ">
                                        <label><b>โทร</b></label>
                                    </div>
                                    <div class="col ">
                                        <label>________________________</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 pe-0">
                                        <label><b>เลขประจำตัวผู้เสียภาษี</b></label>
                                    </div>
                                    <div class="col p-0">
                                        <label>___________________________</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col border border-dark rounded-3 ms-1 pt-2">
                                <div class="row">
                                    <div class="col-4">
                                        <label><b>เลขที่</b></label>
                                    </div>
                                    <div class="col">
                                        <label>{{ resOrder ? resOrder.id : '' }}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <label><b>วันที่ออก</b></label>
                                    </div>
                                    <div class="col">
                                        <label>{{
                                            resOrder ? dateFormat(resOrder.created_at) : ''
                                        }}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4 pe-0">
                                        <label><b>ที่อยู่จัดส่ง</b></label>
                                    </div>
                                    <div class="col">
                                        <label
                                            >50 ถนนงามวงศ์วาน ลาดยาว จตุจักร กรุงเทพฯ 10900</label
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table
                            class="table table-bordered border-dark mt-2 text-center mb-0"
                            style="font-size: 15px"
                        >
                            <thead>
                                <tr>
                                    <th class="col-1" scope="col">รหัส</th>
                                    <th class="col-6" scope="col">รายการ</th>
                                    <th class="col-1" scope="col">จำนวน</th>
                                    <th class="col-2" scope="col">ราคา/หน่วย</th>
                                    <th class="col-2" scope="col">จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        {{ resOrder ? resOrder.items[0].id : '' }}
                                    </th>
                                    <td class="text-start ps-3">
                                        {{ resOrder ? resOrder.items[0].name : '' }}
                                    </td>
                                    <td class="text-end">
                                        {{ resOrder ? resOrder.items[0].pivot.amount : '' }}
                                    </td>
                                    <td class="text-end">
                                        {{
                                            resOrder
                                                ? resOrder.items[0].pivot.buyPrice.toFixed(2)
                                                : ''
                                        }}
                                    </td>
                                    <td class="text-end">
                                        {{
                                            resOrder
                                                ? resOrder.items[0].pivot.total_item_price.toFixed(
                                                      2,
                                                  )
                                                : ''
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td class="text-start ps-3 fs-6">ค่าขนส่ง</td>
                                    <td class="text-end"></td>
                                    <td class="text-end"></td>
                                    <td class="text-end">
                                        {{ resOrder ? resOrder.ship_price : '' }}
                                    </td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row justify-content-center mt-2 ">
                            <div class="col text-start border border-dark">
                                หมายเหตุ
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="col-3 border-top border-end border-bottom border-dark">
                                <div>&nbsp;</div>
                                <div class="text-center"><b>จำนวนเงินทั้งสิ้น</b></div>
                                <div>&nbsp;</div>
                            </div>
                            <div class="col-3 border-top border-end border-bottom border-dark">
                                <div>&nbsp;</div>
                                <div class="text-end">
                                    {{ resOrder ? resOrder.total_restock_price : '' }}
                                </div>
                                <div>&nbsp;</div>
                            </div>
                        </div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>

                        <div class="row justify-content-center mt-3">
                            <div class="col">&nbsp;</div>
                            <div class="col">&nbsp;</div>
                            <div class="col border border-dark text-center">
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                                <div>&nbsp;</div>
                                <div>ผู้มีอำนาจลงนาม</div>
                                <div>วันที่ ...............................</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </vue-html2pdf>

        <div class="bg-light p-5 border border-secondary rounded-3" style="width: 60%;" ref="test">
            <h3 class="text-center row justify-content-center">RESTOCK</h3>
            <div class="row justify-content-center mt-5">
                <img
                    v-bind:src="getValidImageUrl(item.image_path)"
                    class="border border-2 item-img"
                />
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
                        placeholder="Amount"
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
                <button class="btn btn-success d-inline w-25 mx-5" @click="onAdd">
                    ยืนยัน
                </button>
                <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">
                    ยกเลิก
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ShopStore from '@/store/Shop';
import VueHtml2pdf from 'vue-html2pdf';

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
            resOrder: '',
        };
    },
    components: {
        VueHtml2pdf,
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
                        let res = await this.createNewRestockOrder(payload);
                        res.status == 'success'
                            ? this.uploadSccessHandler(res.data)
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

        uploadSccessHandler(resOrder) {
            this.resOrder = resOrder;
            this.$swal('สั่ง Stock สำเร็จ', '', 'success').then(() => {
                this.$swal({
                    title: 'คุณจะดาวน์โหลดใบสั่งซื้อ stock สินค้าไหม',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                }).then(result => {
                    if (result) {
                        this.generateReport();
                        this.$router.push('/');
                    } else {
                        this.$router.push('/');
                    }
                });
            });
        },

        onCancel() {
            this.$swal({
                title: 'คุณแน่ใจที่จะยกเลิกการสั่ง stock สินค้า',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(result => {
                if (result) {
                    this.$router.push('/');
                }
            });
        },

        hasDecimal(num) {
            return !!(num % 1);
        },

        generateReport() {
            this.$refs.html2Pdf.generatePdf();
        },

        dateFormat(date) {
            const d = new Date(date);
            return `${d.toLocaleDateString()}`;
        },
    },
};
</script>

<style scoped>
.item-img {
    object-fit: contain;
    width: 300px;
    height: 300px;
}
</style>
