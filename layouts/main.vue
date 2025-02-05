<template>
  <div>
    <!-- <TheHeader /> -->
    <VuexyHeader></VuexyHeader>
    <Nuxt />
  </div>
</template>

<script>
import { CursorFx } from "@luxdamore/vue-cursor-fx";
import TheHeader from "../components/layout/TheHeader.vue";
import VuexyHeader from "../components/layout/VuexyHeader.vue";
// import 'themify-icons/css/themify-icons.css';

export default {
  components: { CursorFx, TheHeader, VuexyHeader },
};
</script>

<style src="@luxdamore/vue-cursor-fx/dist/CursorFx.css"></style>
