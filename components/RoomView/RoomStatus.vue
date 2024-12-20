<template>
  <section class="card">
    <HeaderCalender />
    <nuxt-link to="/add-reservation" class="text-decoration-none mt-4">
      <div class="room-grid">
        <div class="card mb-3 text-left" v-for="room in rooms" :key="room.id" :class="['room', room.status]">
          <div class="card-header cursor-move p-1">
            {{ room.name }}
            <span class="icon-position">
              <i class="fa-solid" :class="room.is_smooking === 1 ? 'fa-smoking' : 'fa-ban-smoking'" style="color:#9F9CA8 ;"></i>

            </span>
          </div>
          <div class="card-body p-1">
            <p class="fs-5">
              {{ room.unit_type || 'Not specified' }}
              <span>{{ room.status_description || 'No description' }}</span>
            </p>
            <i class="fa-solid" :class="room.is_clean ? 'fa-broom' : 'fa-dust'" style="color: #9F9CA8;"></i>
          </div>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>

import HeaderCalender from "../CalenderReservation/HeaderCalender.vue";
import { getRooms } from '../Api/api';

export default {
  components: {
    HeaderCalender,
  },
  data ()
  {
    return {
      rooms: [

      ],
    };
  },
  async mounted ()
  {
    try {
      const response = await getRooms();
      console.log('API Response:', response); // Debugging
      this.rooms = response.data.data;
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  },



};
</script>

<style scoped></style>
