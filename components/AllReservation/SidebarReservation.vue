<template>
    <div>
      <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
        <div class="sidebar-content">
            <h3>{{ title }}</h3>
            <hr class="my-2" />
        </div>
      </div>
      <div v-if="isSidebarOpen" class="overlay" @click="$emit('close-sidebar')"></div>
  </div>
</template>

<script>


export default {
  name: "Sidebar",
  layout: "component",
  

  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: " Add Guest",
    },
    width: {
      type: String,
      default: "1000px",
    },
  },
};
</script>