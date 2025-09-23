<template>
  <div class="row px-3">
    <div class="col-md-12 py-4">
      <RoomStatus />
    </div>
  </div>
</template>
<style scoped></style>

<script>
import RoomStatus from '../components/RoomView/RoomStatus.vue';

export default {
  name: "RoomViewPage",
  layout: "main",
  components: {
    RoomStatus

  }
};

</script>
