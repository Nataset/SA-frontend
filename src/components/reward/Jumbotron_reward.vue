<template>
  <div class="position-relative">
    <div class="position-absolute p-5 mb-4" id="jumbotron"></div>
    <div id="jumbotron-space"></div>
  </div>
</template>

<script>
export default {
  name: "Jumbotron_reward",
};
</script>

<style lang="scss" scoped>
#jumbotron {
  left: 0px;
  top: -30px;
  z-index: -1;
  height: 550px;
  width: 100%;
  background-image: url("./../../../public/jumbotron_reward.jpg");
  background-repeat: no-repeat;
  background-position: center;
}

#jumbotron-space {
  width: 100%;
  height: 465px;
}
</style>