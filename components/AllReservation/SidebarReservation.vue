<template>
  <div>
    <div
      v-if="isSidebarOpen"
      :class="['sidebar', { 'sidebar-open': isSidebarOpen }]"
      :style="{ width: width }"
    >
      <slot name="SidebarContent"></slot>
    </div>
    <div
      v-if="isSidebarOpen"
      class="overlay"
      @click="$emit('close-sidebar')"
    ></div>
  </div>
</template>

<script>


export default {
  name: "Side",
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
      default: "500px",
    },
  },
};
</script>
