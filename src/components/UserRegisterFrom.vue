<template>
    <div class="main-container">
        <h2 class="title">Register</h2>
        <form @submit.prevent="register" class="custom-form">
            <div class="container">
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        name="email"
                        v-model="registerForm.email"
                        autocomplete="off"
                        placeholder="email"
                    />
                </div>
                <div style="width: 435px;"></div>
                <div>
                    <label>Password :</label>
                    <input
                        type="password"
                        name="password"
                        v-model="registerForm.password"
                        autocomplete="off"
                        placeholder="password"
                    />
                </div>
                <div>
                    <label>Confrim Password :</label>
                    <input
                        type="password"
                        name="confrimPass"
                        v-model="confirm_password"
                        autocomplete="off"
                        placeholder="confirm password"
                    />
                </div>

                <div>
                    <label>Firstname :</label>
                    <input
                        type="text"
                        name="firstname"
                        v-model="registerForm.firstname"
                        autocomplete="off"
                        placeholder="firstname"
                    />
                </div>
                <div>
                    <label>Lastname :</label>
                    <input
                        type="text"
                        name="lastname"
                        v-model="registerForm.lastname"
                        autocomplete="off"
                        placeholder="lastname"
                    />
                </div>
                <div>
                    <label>Address :</label>
                    <input
                        type="text"
                        name="lastname"
                        v-model="registerForm.address"
                        autocomplete="off"
                        placeholder="address"
                    />
                </div>
            </div>
            <div class="btn">
                <button>Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';
export default {
    data() {
        return {
            currentUser: '',
            confirm_password: '',
            registerForm: {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                address: '',
            },
        };
    },
    methods: {
        async register() {
            // if (this.checkNull()) {
            if (this.registerForm.password === this.confirm_password) {
                let res = await ShopStore.dispatch('register', this.registerForm);
                if (res.success) {
                    this.$swal('Register Success', `Welcome ${res.user.email}`, 'success');
                    this.$router.push('/');
                } else {
                    let errorMsg = '';
                    for (const key in res.error) {
                        res.error[key].forEach(msg => (errorMsg += `${msg}\n`));
                    }
                    this.$swal('Register Failed', errorMsg, 'error');
                }
            } else {
                this.$swal(
                    'Register Failed',
                    'Your password and confirm password is not match!',
                    'error',
                );
            }
            // } else {
            //     this.$swal(
            //         'Register Failed',
            //         'Please check that the information you have entered is complete.',
            //         'error',
            //     );
            // }
        },
        checkNull() {
            return (
                this.registerForm.email !== '' &&
                this.registerForm.password !== '' &&
                this.registerForm.address !== '' &&
                this.registerForm.firstname !== '' &&
                this.registerForm.lastname !== ''
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
}
.custom-form {
    padding: 0;
    div {
        margin: 0;
    }
    .btn {
        display: block;
        text-align: center;
        margin: 0;
        button {
            margin: 0 0 0.5em 0;
        }
    }
}
.container {
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    div {
        display: flex;
        flex-direction: column;
        margin: 0.4em auto;

        input {
            width: 100%;
        }
        &:last-child {
            padding: 0 1em;
            width: 100%;
            input {
                width: 435px;
            }
        }
        label {
            margin: 0;
        }
    }
}</style
>>
