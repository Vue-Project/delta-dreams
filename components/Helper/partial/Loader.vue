<template>
  <div v-if="visible" class="loader-overlay">
    <button class="btn btn-primary waves-effect waves-light" type="button" style="position: relative; z-index: 999999;">
      <span class="spinner-grow me-1" role="status" aria-hidden="true"></span>
      Loading...
    </button>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 13, 13, 0.7);
  z-index: 1000;
}
</style>
