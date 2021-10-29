<template>
    <div class="container">
        <form class="container mt-3" v-on:submit.prevent="onAdd">
            <div class="ml-2 col-5 mx-auto mt-4">
                <div class="input-group my-3">
                    <input
                        type="file"
                        id="img"
                        ref="img"
                        class="file"
                        name="image"
                        accept="image/*"
                        @change="uploadImageFinish"
                    />
                    <input
                        type="text"
                        class="form-control"
                        disabled
                        placeholder="Upload File"
                        id="file"
                        :value="imageName"
                    />
                    <div class="input-group-append">
                        <button type="button" class="browse btn btn-primary" @click="uploadImage">
                            Browse...
                        </button>
                    </div>
                </div>
            </div>
            <div class="ml-2 col-6 mx-auto mb-3 d-flex justify-content-center">
                <img
                    v-bind:src="getValidImageUrl(orders.receipt_image)"
                    ref="preview"
                    class="img-thumbnail"
                />
            </div>
        </form>
        <div class="d-flex justify-content-center mt-5">
            <button class="btn btn-success d-inline w-25 mx-5" @click="onAdd">ยืนยัน</button>
            <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">ยกเลิก</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ShopStore from '@/store/Shop';

export default {
    name: 'OrderReceipt',
    data() {
        return {
            imageName: '',
            imageFile: '',
            order_id: '',
            placeholder: 'https://via.placeholder.com/500x500',
            endPoint: ShopStore.getters.endPoint,
            orders: {},
        };
    },
    async created() {
        if (!this.isAuthen()) {
            this.$swal('You are not logged.', 'Please login and go to this page again', 'error');
            this.$router.push('/login');
        }
        this.order_id = this.$route.params.id;
        await this.fetchOrderDetail();
        console.log(this.orders);
    },
    methods: {
        isAuthen() {
            return ShopStore.getters.isAuthen && !ShopStore.getters.isAdmin;
        },

        getValidImageUrl(url) {
            return url ? `${this.endPoint}/${url}` : this.placeholder;
        },

        async fetchOrderDetail() {
            let url = this.endPoint + '/api/orders/' + this.order_id;
            let res = await axios(url);
            this.orders = res.data;
        },

        async uploadReceipt(imageFile) {
            let url = this.endPoint + '/api/user/orders/' + this.order_id + '/receiptUpload';
            let formData = new FormData();
            formData.append('image', imageFile);
            try {
                let res = await axios.post(url, formData);
                return res.data;
            } catch (err) {
                console.log('WTF');
                console.log('upload receipt fail');
                console.error(err);
                return { status: 'fail' };
            }
        },

        uploadImageFinish(event) {
            const file = event.target.files[0];
            this.imageName = file.name;
            var reader = new FileReader();
            const self = this;
            reader.onload = function(event) {
                // get loaded data and render thumbnail.
                self.setImage(event);
            };
            // read the image file as a data URL.
            reader.readAsDataURL(file);
            this.imageFile = file;
        },

        uploadImage() {
            this.$refs.img.click();
        },

        setImage(event) {
            this.$refs.preview.src = event.target.result;
        },

        async onAdd() {
            this.$swal({
                title: 'คุณแน่ใจที่จะ upload รูปใบเสร็จแล้วใช่ไหม',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(async result => {
                if (result) {
                    let res = await this.uploadReceipt(this.imageFile);
                    res.status == 'success' ? this.uploadSccessHandler() : this.uploadFailHandler();
                }
            });
        },

        onCancel() {
            this.$swal({
                title: 'คุณแน่ใจที่จะยกเลิกการ upload รูปใบเสร็จแล้วใช่ไหม',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(result => {
                if (result) {
                    this.$router.push('/orderlist');
                }
            });
        },

        uploadFailHandler() {
            this.$swal('ผิดพลาด', 'การ upload รูปมีความผิดพลาดโปรดลองใหม่', 'error');
        },

        uploadSccessHandler() {
            this.$swal('สำเร็จ', 'การ upload รูปสำเร็จ โปรดรอทางร้านยืนยันใบเสร็จ', 'success').then(
                () => {
                    this.$router.push('/orderlist');
                },
            );
        },
    },
};
</script>

<style scoped>
img {
    object-fit: scale-down;
    width: 500px;
    height: 500px;
}

#flex-content {
    position: relative;
    width: 29%;
    display: flex;
    margin-left: 4%;
    text-align: center;
    font-family: 'Questrial', sans-serif;
}

#add-button:hover {
    background-color: white;
}

.file {
    visibility: hidden;
    position: absolute;
}
</style>
