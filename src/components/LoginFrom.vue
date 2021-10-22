<template>
    <div class="main-container">
        <h2 class="title">Login</h2>
        <form @submit.prevent="login" class="custom-form">
            <div>
                <label>Email :</label>
                <input type="text" v-model="loginFrom.email" placeholder="email" />
            </div>
            <div>
                <label>Password :</label>
                <input type="password" v-model="loginFrom.password" placeholder="password" />
            </div>
            <button>Login</button>
        </form>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';
export default {
    data() {
        return {
            allUser: [],
            loginFrom: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        async login() {
            let res = await ShopStore.dispatch('login', this.loginFrom);
            if (res.success) {
                this.$swal('Login Success', `Welcome, ${res.user.email}`, 'success');
                this.$router.push('/');
            } else {
                let errorMsg = '';
                for (const key in res.error) {
                    res.error[key].forEach(msg => (errorMsg += `${msg}\n`));
                }
                this.$swal('Login Failed', errorMsg, 'error');
            }
        },
        clearFrom() {
            this.loginFrom.username = '';
            this.loginFrom.password = '';
        },
    },
};
</script>

<style lang="scss" scoped>
.main-container {
    text-align: center;
    .custom-form {
        width: 400px;
        label {
            width: 90px;
        }
    }
}</style
>>
