<template>
  <div class="row p-3">

    <div class="col-md-12">
      <a href="http://localhost:3000?code=mR6Q8cgZHkSFtTfv&type=admin" class="menu-link">
        <div data-i18n="Email">Reservation</div>
      </a>
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
