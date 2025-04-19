<template>
    <div class="row px-3">
      <div class="col-md-12 py-4">
        <room-status />
      </div>
    </div>
  </template>
  <style scoped></style>
  
  <script>
  import roomStatus from '../components/RoomView/room-status.vue';
  
  export default {
    name: "RoomViewPage",
    layout: "main",
    components: {
        roomStatus
  
    }
  };
  
  </script>
  