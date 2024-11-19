<template>
  <div>
    <TheHeader />

    <Nuxt />
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
import { CursorFx } from "@luxdamore/vue-cursor-fx";
import TheHeader from "../components/layout/TheHeader.vue";

export default {
  components: { CursorFx, TheHeader },





};
</script>

<style src="@luxdamore/vue-cursor-fx/dist/CursorFx.css"></style>
