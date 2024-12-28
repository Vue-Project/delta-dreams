<template>
  <section class="card px-3">
    <HeaderCalender :statistics="statisticsHeaderRoomView" />
    <nuxt-link to="/add-reservation" class="text-decoration-none mt-4">
      <div class="room-grid">
        <div class="card mb-3 text-left" v-for="room in rooms" :key="room.id" :class="['room', room.status]">
          <div class="card-header cursor-move p-1">
            {{ room.name }}
            <div class="icon-wrapper float-end" @mouseenter="hoveredIcon = { type: 'smoking', id: room.id }" @mouseleave="hoveredIcon = null">
              <i class="fa-solid" :class="room.is_smooking === 1 ? 'fa-smoking' : 'fa-ban-smoking'
                " style="color: #9f9ca8"></i>

              <div v-if="
                hoveredIcon &&
                hoveredIcon.type === 'smoking' &&
                hoveredIcon.id === room.id
              " class="popover-content position-absolute p-2 bg-light shadow rounded" style="top: 10px; right: 60px">
                <span>
                  {{
                    room.is_smooking === 1
                      ? "Smoking allowed"
                      : "No smoking allowed"
                  }}
                </span>
              </div>
            </div>
          </div>
          <div class="card-body p-1 position-relative">
            <p class="fs-5">
              <!-- {{ room.unit_type || "Not specified" }} -->
              <!-- <span>{{ room.status_description || "No description" }}</span> -->
              (Single الفندق غرفه وصاله)
            </p>

            <div class="icon-wrapper" @mouseenter="hoveredIcon = { type: 'clean', id: room.id }" @mouseleave="hoveredIcon = null">
              <i class="fa-solid" :class="room.is_clean === 1 ? 'fa-broom' : 'fa-dust'" style="color: #9f9ca8"></i>

              <div v-if="
                hoveredIcon &&
                hoveredIcon.type === 'clean' &&
                hoveredIcon.id === room.id
              " class="popover-content position-absolute p-2 bg-light shadow rounded" style="bottom: 15px; left: 20px">
                <span>
                  {{
                    room.is_clean === 1
                      ? "This room needs cleaning"
                      : " This room is clean"
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
import HeaderCalender from "../CalenderReservation/HeaderCalender.vue";
import { getRooms } from "../Api/api";

export default {
  components: {
    HeaderCalender,
  },
  data ()
  {
    return {
      hoveredIcon: null, // To track the hovered icon

      rooms: [],
      statisticsHeaderRoomView: {},
    };
  },
  async mounted ()
  {
    try {
      const response = await getRooms();
      console.log("API Response:", response);
      this.rooms = response.data.data;
      this.statisticsHeaderRoomView = response.data.statistics;
    } catch (error) {
      console.error("Error loading rooms:", error);
    }
  },
};
</script>

<style scoped>
.popover-content {
  z-index: 10;
  white-space: nowrap;
  pointer-events: none;
}
</style>
