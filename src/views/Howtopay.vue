<template>
  <div class="container">
    <div class="p-2 mb-4">
      <img src="./../../public/pay.jpg" class="pay" />
    </div>
    <div id="pay-space"></div>
    <div class="p-2 mb-4">
      <img src="./../../public/howtopay.png" class="howtopay" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Howtopay",
  data() {
    return {
      state: "test",
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
.pay {
  margin-top: 5%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 40%;
  width: 40%;

  background-repeat: no-repeat;
  background-position: center;
}
.howtopay {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 90%;
  width: 90%;

  background-repeat: no-repeat;
  background-position: center;
}
#pay-space {
  width: 100%;
  height: 30px;
}
</style>
