<template>
  <div v-if="showAlert" class="rotate-alert">
    <div class="rotate-message">
      📱 Please rotate your device to landscape mode!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showAlert = ref(false);
let mediaQuery = null;
let orientationHandler = null;

onMounted(() => {
  mediaQuery = window.matchMedia('(orientation: portrait)');
  orientationHandler = (e) => {
    showAlert.value = e.matches;
  };

  // Add listener for orientation changes
  mediaQuery.addEventListener('change', orientationHandler);

  // Initial check
  showAlert.value = mediaQuery.matches;
});

onBeforeUnmount(() => {
  if (mediaQuery && orientationHandler) {
    mediaQuery.removeEventListener('change', orientationHandler);
  }
});
</script>

<style scoped>
.rotate-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 9999;
  font-size: 24px;
  padding: 20px;
}

.rotate-message {
  max-width: 80%;
}

/* Optional: Hide on desktop */
@media (min-width: 768px) {
  .rotate-alert {
    display: none;
  }
}
</style>
