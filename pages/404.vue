<template>
  <div>
    <div class="container-xxl container-p-y text-center">
      <div class="misc-wrapper">
        <h2 class="mb-1 mt-4">Page Not Found :(</h2>
        <p class="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
        <button @click="goToHome" class="btn btn-primary mb-4 waves-effect waves-light">Back to home</button>
        <div class="mt-4">
          <img src="../assets/images/page-misc-error.png" alt="page-misc-error" width="225" class="img-fluid">
        </div>
      </div>
    </div>
    <div class="avatar-image"></div>

  </div>
</template>

<script>


export default {
  name: "NotFound",
  layout: "component",
  methods: {
    goToHome() {
      this.$router.push("/");
    }
  }


};
</script>

<style scoped>
.avatar-image {
  background: url(../assets/images/bg-shape-image-dark.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 400px;
  bottom: -54px;
  left: -10px;
  position: absolute;
}

.misc-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}
</style>
