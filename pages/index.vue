<template>
  <div class="row p-3">

    <div class="col-md-12">

      <CalenderDate />
      <!-- <DataTable /> -->
    </div>
  </div>
</template>
<style scoped></style>

<script>
import CalenderDate from '../components/CalenderReservation/CalenderDate.vue';
import DataTable from '../components/CalenderReservation/DataTable.vue';

export default {
  name: "IndexPage",
  layout: "main",
  components: {
    CalenderDate,
    DataTable

  }
};

</script>
