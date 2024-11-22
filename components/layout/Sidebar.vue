<template>
  <div>
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content">
        <h3>{{ title }}</h3>
        <slot>
          <p>This is the default content inside the sidebar.</p>
        </slot>
        <button @click="$emit('close-sidebar')" class="btn btn-danger">Close</button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isSidebarOpen" class="overlay" @click="$emit('close-sidebar')"></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  layout: "component",
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Sidebar Title',
    },
    width: {
      type: String,
      default: '1000px',
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: -1000px;
  height: 100%;
  background-color: #fff;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  z-index: 1060;
}

.sidebar-open {
  right: 0;
}

.sidebar-content {
  padding: 20px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}
</style>
