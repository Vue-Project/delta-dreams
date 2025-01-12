<template>
  <div class="row p-3">

    <div class="col-md-12">

      <BookingCalendar />
    </div>
  </div>
</template>
<script>
import BookingCalendar from '../components/CalenderReservation/BookingCalendar.vue';

export default {
  name: "IndexPage",
  layout: "main",
  components: {
    BookingCalendar,

  }
};

</script>
