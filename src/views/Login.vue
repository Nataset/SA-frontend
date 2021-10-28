<template>
    <div>
        <login-form class="center mb-5"></login-form>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
export default {
    components: { LoginForm },
};
</script>

<style>
.center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
