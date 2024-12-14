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

<style scoped>
.fa-ban-smoking {
  position: absolute;
  top: -11px;
  right: 5px;
  border-radius: 50%;
  color: black;
  cursor: pointer;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  background: #FFCFCF;
  cursor: pointer;

}

.fa-broom {
  position: absolute;
  bottom: 7px;
  left: 5px;
  color: #cacaca;
  cursor: pointer;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  border: 1px solid #FFCFCF;

}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 10px;
}

.room {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}

.room.available {
  background-color: #DBF1DB;
  color: #4CD120 !important;
}

.room.unavailable {
  background-color: white;
  color: #262626 !important;
}

.room.Block {
  background-color: #DBF1DB;
  color: #000065 !important;
}

.room.danger {
  background-color: #DBF1DB;
  color: #FF6666 !important;
}

.room-number {
  font-weight: bold;
  margin-bottom: 5px;
}

.room-type {
  font-size: 0.9em;
  color: #555;
}

.room-occupant {
  margin-top: 5px;
  font-style: italic;
  color: #333;
}
</style>
