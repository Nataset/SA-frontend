<template>
    <div class="d-flex justify-content-center  mt-2 ">
        <div class=" p-4 px-5 " style="width: 95%;" ref="test">
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
                            <label>{{ resOrder.supplier.name }}</label>
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
                            <label>{{ resOrder.id }}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <label><b>วันที่ออก</b></label>
                        </div>
                        <div class="col">
                            <label>{{ dateFormat(resOrder.created_at) }}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 pe-0">
                            <label><b>ที่อยู่จัดส่ง</b></label>
                        </div>
                        <div class="col">
                            <label>50 ถนนงามวงศ์วาน ลาดยาว จตุจักร กรุงเทพฯ 10900</label>
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
                        <th>1</th>
                        <td class="text-start ps-3 fs-6">{{ resOrder.items[0].id }}</td>
                        <td class="text-end">
                            {{ resOrder.items[0].name ? resOrder.items[0].name : '' }}
                        </td>
                        <td class="text-end">{{ resOrder.items[0].pivot.amount }}</td>
                        <td class="text-end">{{ resOrder.items[0].pivot.buyPrice }}</td>
                        <td class="text-end">
                            {{ resOrder.items[0].pivot.total_item_price }}
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td class="text-start ps-3 fs-6">ค่าขนส่ง</td>
                        <td class="text-end"></td>
                        <td class="text-end"></td>
                        <td class="text-end"></td>
                        <td class="text-end">
                            {{ resOrder.ship_price.toFixed(2) }}
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
                    <div class="text-end">10000.00</div>
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
</template>

<script>
export default {};
</script>

<style></style>
