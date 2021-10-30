<template>
    <div class="container d-flex justify-content-center  mt-5">
        <div class="bg-light p-5 border border-secondary rounded-3" style="width: 60%;">
            <h3 class="text-center row justify-content-center">เพิ่มสินค้าใหม่</h3>
            <div class="row justify-content-center mt-5">
                <label class="col-2 form-label align-self-center"> ชื่อสินค้า :</label>
                <div class="col-5">
                    <input
                        type="text"
                        class="col-4 form-control"
                        name="name"
                        placeholder="Name"
                        v-model="form.name"
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
                        v-model="form.amount"
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
                        v-model="form.price"
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
                        v-model="form.min_item"
                        class="form-control"
                    />
                </div>
            </div>
            <div class="row justify-content-center mt-5">
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

                    <ul class="list-group" v-for="supplier in selectSuppliers" :key="supplier.id">
                        <li class="list-group-item">{{ supplier.name }}</li>
                    </ul>
                </div>
            </div>

            <div class="container mt-5">
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
                            <button
                                type="button"
                                class="browse btn btn-primary"
                                @click="uploadImage"
                            >
                                Browse...
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ml-2 col-6 mx-auto mb-3 d-flex justify-content-center">
                    <img v-bind:src="getValidImageUrl(null)" ref="preview" class="img-thumbnail" />
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
import SupplierStore from '../../store/supplier';
export default {
    data() {
        return {
            form: {
                name: '',
                amount: '',
                price: '',
                min_item: '',
            },
            endPoint: ShopStore.getters.endPoint,
            suppliers: [],
            selectSuppliers: [],
            imageName: '',
            imageFile: '',
            placeholder: 'https://via.placeholder.com/300x300',
        };
    },
    async created() {
        await this.fetchSuppliers();
    },
    methods: {
        async fetchSuppliers() {
            await SupplierStore.dispatch('fetchSuppliers');
            this.suppliers = SupplierStore.getters.suppliers;
        },

        async uploadItem(imageFile) {
            //upload image first
            let image_path = null;
            if (imageFile) {
                let formData = new FormData();
                formData.append('image', imageFile);
                let url = this.endPoint + '/api/uploadImage';
                try {
                    let res = await axios.post(url, formData);
                    image_path = res.data.imagePath;
                } catch (err) {
                    console.log('fail at upload item image');
                    console.error(err);
                    return { status: 'fail' };
                }
            }

            let url = this.endPoint + '/api/items/add';
            let payload = {
                name: this.form.name,
                amount: this.form.amount,
                price: this.form.price,
                min_item: this.form.min_item,
                image: image_path,
                suppliers: this.selectSuppliers,
            };

            try {
                let res = await axios.post(url, payload);
                return { status: 'success' };
            } catch (err) {
                console.log('upload item fail');
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
                title: 'คุณแน่ใจที่เพิ่มสินค้าใช่ไหม',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(async result => {
                if (result) {
                    if (this.validFrom()) {
                        let res = await this.uploadItem(this.imageFile);
                        res.status == 'success'
                            ? this.uploadSccessHandler()
                            : this.uploadFailHandler();
                    } else {
                        this.$swal(
                            'เพิ่มสินค้าไม่สำเร็จ',
                            'โปรดใส่ข้อมูลที่จำเป็นให้ครบก่อนกดยืนยัน หรือข้อมูลผิดพลาด',
                            'error',
                        );
                    }
                }
            });
        },

        onCancel() {
            this.$swal({
                title: 'คุณแน่ใจที่จะยกเลิกการเพิ่มสินค้า',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(result => {
                if (result) {
                    this.$router.push('/');
                }
            });
        },

        uploadFailHandler() {
            this.$swal('เพิ่มสินค้าไม่สำเร็จ', 'เพิ่มสินค้าผิดพลาดโปรดลองใหม่', 'error');
        },

        uploadSccessHandler() {
            this.$swal('เพิ่มสินค้าสำเร็จ', '', 'success').then(() => {
                this.$router.push('/');
            });
        },

        getValidImageUrl(url) {
            return url ? `${this.endPoint}/${url}` : this.placeholder;
        },

        validFrom() {
            if (
                this.form.name != '' &&
                this.form.amount >= 1 &&
                this.form.price >= 1 &&
                this.form.min_item >= 1 &&
                this.selectSuppliers
            ) {
                return true;
            } else {
                return false;
            }
        },

        selectSuppliersHandler(supplier) {
            let find = false;
            this.selectSuppliers.forEach(seleted => {
                if (seleted === supplier) {
                    find = true;
                }
            });
            find
                ? (this.selectSuppliers = this.selectSuppliers.filter(e => e !== supplier))
                : this.selectSuppliers.push(supplier);
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
