<template>
    <div class="row">
        <div class="col-md-12">
            <HeaderReservation />
        </div>
    </div>


</template>

<script>
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";


export default {
  name: "reservations",
  layout: "main",
  components: {
    HeaderReservation,
  },
};
</script>

<style></style>
