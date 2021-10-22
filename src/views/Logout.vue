<template>
    <div></div>
</template>

<script>
// import AuthService from '@/services/AuthService'
import ShopStore from '@/store/Shop';
export default {
    mounted() {
        ShopStore.dispatch('logout');
        this.$swal({ title: 'Log out Success!', icon: 'success' });
        this.$router.push('/');
    },
};
</script>

<style></style>
