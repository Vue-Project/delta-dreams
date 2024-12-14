<template>
  <section class="card">
    <HeaderCalender />
    <nuxt-link to="/addreservation" class="text-decoration-none">
      <div class="room-grid">
        <div class="card mb-3 text-left" v-for="room in rooms" :key="room.id" :class="['room', room.status]">
          <div class="card-header cursor-move p-1 ">{{ room.number }}

            <i class="fa-solid fa-ban-smoking"></i>
          </div>
          <div class="card-body p-1">
            <p class=" fs-5 ">{{ room.type }} <span>{{ room.occupant }}</span></p>
            <i class="fa-solid fa-broom"></i>
          </div>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>

import HeaderCalender from "../CalenderReservation/HeaderCalender.vue";

export default {
  components: {
    HeaderCalender,
  },
  data ()
  {
    return {
      rooms: [
        { id: 1, number: "101", type: "(Single الفندق غرفه وصاله)", status: "available" },
        { id: 2, number: "102", type: "(Single الفندق غرفه وصاله)", status: "unavailable", },
        { id: 3, number: "13", type: "(Single الفندق غرفه وصاله)", status: "Block", },
        { id: 4, number: "10", type: "(Single الفندق غرفه وصاله)", status: "danger", occupant: "Mr. Mustafa" },
        { id: 5, number: "101", type: "(Single الفندق غرفه وصاله)", status: "available" },
        { id: 6, number: "102", type: "(Single الفندق غرفه وصاله)", status: "unavailable", },
        { id: 7, number: "13", type: "(Single الفندق غرفه وصاله)", status: "Block", },
        { id: 8, number: "10", type: "(Single الفندق غرفه وصاله)", status: "danger", occupant: "Mr. Mustafa" },
        { id: 9, number: "101", type: "(Single الفندق غرفه وصاله)", status: "available" },
        { id: 10, number: "102", type: "(Single الفندق غرفه وصاله)", status: "unavailable", },
        { id: 11, number: "13", type: "(Single الفندق غرفه وصاله)", status: "Block", },
        { id: 12, number: "10", type: "(Single الفندق غرفه وصاله)", status: "danger", occupant: "Mr. Mustafa" },
        { id: 13, number: "101", type: "(Single الفندق غرفه وصاله)", status: "available" },
        { id: 14, number: "102", type: "(Single الفندق غرفه وصاله)", status: "unavailable", },
        { id: 15, number: "13", type: "(Single الفندق غرفه وصاله)", status: "Block", },
        { id: 16, number: "10", type: "(Single الفندق غرفه وصاله)", status: "danger", occupant: "Mr. Mustafa" },
      ],
    };
  },

};
</script>

<style scoped></style>
