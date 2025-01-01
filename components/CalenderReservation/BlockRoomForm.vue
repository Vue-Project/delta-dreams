<template>
  <div>
    <form id="formBlockRoom" action="" class="p-2">
      <p>{{ selectedDates }}</p>
      <div class="row">
        <div class="col-12">
          <label for="flatpickr-date-01" class="form-label">Date Range</label>
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker5" aria-label="input Text to Date" />
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
      selectedDates: "2025-01-01 to 2025-01-09",


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


    const getFirstAndLastDates = (dates) =>
    {
      if (!dates || dates.length === 0) return [];

      // Extracting the first and last date from the dateTime property
      const firstDate = dates[0].dateTime.split(",")[0];  // Get the date part (e.g., "03/01/2025")
      const lastDate = dates[dates.length - 1].dateTime.split(",")[0];  // Get the date part (e.g., "13/01/2025")

      return [firstDate, lastDate];
    };

    const firstAndLastDates = getFirstAndLastDates(this.selectedDates);

    flatpickr(this.$refs.rangePicker5, {
      mode: "range",
      dateFormat: "d-m-Y",  // Use day-month-year format (or adjust to your preference)
      defaultDate: firstAndLastDates,  // Dynamically show the first and last date
      onReady: (selectedDates, dateStr, instance) =>
      {
        // Ensure picker shows only the first and last day from selectedDates
        instance.setDate(getFirstAndLastDates(this.selectedDates), false);
      },
      onChange: (selectedDates, dateStr, instance) =>
      {
        if (selectedDates.length > 0) {
          // Format the selected dates to be in the correct format (d-m-Y)
          const updatedDates = getFirstAndLastDates(selectedDates.map(date => date.toISOString().split("T")[0]));
          instance.setDate(updatedDates, false);
          this.selectedDates = updatedDates;
        }
      },
    });

  },


  mixins: [flatpickrMixin],
};
</script>
