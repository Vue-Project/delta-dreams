<template>
  <div>
    <form id="formBlockRoom" action="" class="p-2">

      <div class="row">
        <div class="col-12  ">
          <label for="flatpickr-date-01" class="form-label">Date Range</label>
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker5" aria-label="input Text to Date" :value="selectedDates" />
        </div>
        <div class="col-12">
          <label for="formBlockRoomRoomType" class="form-label">Room Type</label>
          <input type="text" class="form-control" id="formBlockRoomRoomType" v-model="roomType" placeholder="Room Type of building ID" />
        </div>

        <div class="col-12">
          <label for="formBlockRoomRoom" class="form-label">Room</label>
          <input type="text" class="form-control" id="formBlockRoomRoom" v-model="room" placeholder="Second part of Room ID" />
        </div>
        <div class="col-12">
          <label for="formBlockRoomReason" class="form-label">Reason</label>
          <select class="form-select" id="formBlockRoomReason" v-model="selectedOptionReasons">
            <option disabled value="">Select</option>
            <option v-for="reason in reasonsSources" :key="reason.id" :value="reason.id">
              {{ reason.name }}
            </option>
          </select>
        </div>
      </div>
      <div class=" gap-2 d-flex justify-content-end position-absolute  " style="right: 15px ;bottom: 10px;">

        <button type="submit" class="btn btn-primary waves-effect waves-light">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { getReasonsSources } from '../Api/api';
import flatpickrMixin from '../Mixin/flatpickrMixin';

export default {
  name: "BlockRoomForm",
  layout: "Component",
  props: {
    selectedDates: Array,
    selectedResourceId: Array,
  },
  data ()
  {
    return {
      roomType: "", // To store the first part (e.g., 21)
      room: "", // To store the second part (e.g., 1)
      reasonsSources: [],
      selectedDates: [], // Array to store the selected dates

      selectedOptionReasons: "",
    };
  },

  methods: {

    splitResourceId ()
    {
      if (this.selectedResourceId) {
        const parts = this.selectedResourceId.split("-"); // Split by '-'
        this.roomType = parts[0]; // First part (e.g., 21)
        this.room = parts[1]; // Second part (e.g., 1)
      }
    },

  },
  async mounted ()
  {
    try {
      const [reasonsResponse] = await Promise.all([getReasonsSources(),]);

      this.reasonsSources = reasonsResponse.data.data.data;

    } catch (error) {
      console.error("Error loading data:", error);
    }
    this.splitResourceId(); // Split the ID when the component is mounted


  },


  mixins: [flatpickrMixin],
};
</script>
