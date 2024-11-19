<template>
  <div class="row p-3">

    <div class="col-md-12">
      <CalenderDate/>
    </div>
  </div>
</template>
<style scoped></style>

<script>
import CalenderDate from '../components/CalenderReservation/CalenderDate.vue';

export default {
  name: "IndexPage",
  layout: "main",
  components: {
    CalenderDate

  }
};

</script>
