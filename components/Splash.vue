<template>
  <div class="splash-bg d-flex flex-column justify-content-center align-items-center">
    <div>
      <b-spinner variant="white" style="width: 3rem; height: 3rem;" />
    </div>
    <div class="mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.splash-bg {
  background: linear-gradient(#2193b0, #6dd5ed);
  height: 100vh;
  margin: 0;
  background-attachment: fixed;
  color: white;
}
</style>
