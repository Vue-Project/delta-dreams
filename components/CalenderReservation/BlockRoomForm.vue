<template>
  <div>
    <form id="formBlockRoom" class="p-2" @submit.prevent="submitFormBlockRoom" ref="emptyForm">
      <div class="row">
        <div class="col-12">
          <label for="flatpickr-date-01" class="form-label">Date Range</label>
          <input
            type="text"
            class="form-control flatpickr-input"
            placeholder="YYYY-MM-DD to YYYY-MM-DD"
            id="flatpickr-range-01"
            ref="rangePicker5"
            v-model="formBlock.dateStartAndEnd"
            aria-label="input Text to Date"
            disabled
          />
        </div>
        <div class="col-12">
          <label for="formBlockRoomRoomType" class="form-label">Room Type</label>
          <input type="text" class="form-control" id="formBlockRoomRoomType" v-model="formBlock.roomType" placeholder="Room Type of building ID"             disabled
          />
        </div>
        <div class="col-12">
          <label for="formBlockRoomRoom" class="form-label">Room</label>
          <input type="text" class="form-control" id="formBlockRoomRoom" v-model="formBlock.room" placeholder="Second part of Room ID"             disabled
          />
        </div>
        <div class="col-12">
          <label for="formBlockRoomReason" class="form-label">Reason</label>
          <select class="form-select" id="formBlockRoomReason" v-model="formBlock.reason">
            <option disabled value="">Select</option>
            <option v-for="reason in reasonsSources" :key="reason.id" :value="reason.id">
              {{ reason.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="gap-2 d-flex justify-content-end position-absolute" style="right: 15px; bottom: 10px;">
        <button type="submit" class="btn btn-primary waves-effect waves-light">
          Apply
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { getReasonsSources } from '../Api/api';
import flatpickrMixin from '../Mixin/flatpickrMixin';
import { blockRoomService } from '../Api/api';
import { dateUtils } from '../Api/utils/data';
import { formUtils } from '../Api/utils/form';


export default {
  name: "BlockRoomForm",
  layout: "Component",
  props: {
    selectedDates: {
      type: Array,
      required: true
    },
    selectedResourceId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      reasonsSources: [],
      flatpickrInstance: null,
      formBlock: {
        dateStartAndEnd: "",
        roomType: "",
        room: "",
        reason: "",
      },
    };
  },

  methods: {
    getFirstAndLastDates(dates) {
      if (!dates || dates.length === 0) return [];

      // Handle dates array with dateTime property
      if (dates[0].dateTime) {
        const firstDate = dates[0].dateTime.split(",")[0];
        const lastDate = dates[dates.length - 1].dateTime.split(",")[0];
        return [firstDate, lastDate];
      }

      // Handle Date objects
      return dates.map(date => {
        if (date instanceof Date) {
          return this.formatDate(date);
        }
        return date;
      });
    },

    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },

    splitResourceId() {
      if (this.selectedResourceId) {
        const [roomType, room] = this.selectedResourceId.split("-");
        this.formBlock.roomType = roomType;
        this.formBlock.room = room;
      }
    },

    initFlatpickr() {
      const dates = this.getFirstAndLastDates(this.selectedDates);
      this.formBlock.dateStartAndEnd = dates.join(' to ');

      this.flatpickrInstance = flatpickr(this.$refs.rangePicker5, {
        mode: "range",
        dateFormat: "d-m-Y",
        defaultDate: dates,
        onReady: (selectedDates) => {
          if (selectedDates.length > 0) {
            const formattedDates = this.getFirstAndLastDates(selectedDates);
            this.formBlock.dateStartAndEnd = formattedDates.join(' to ');
          }
        },
        onChange: (selectedDates) => {
          if (selectedDates.length > 0) {
            const formattedDates = selectedDates.map(date => this.formatDate(date));
            this.formBlock.dateStartAndEnd = formattedDates.join(' to ');
          }
        },
      });
    },

    async submitFormBlockRoom() {
      try {
        formUtils.validateBlockRoomForm(this.formBlock);

        this.isSubmitting = true;

        const [startDate, endDate] = this.formBlock.dateStartAndEnd.split(' to ');

        const blockRoomData = {
          unit_id: `${this.formBlock.roomType}-${this.formBlock.room}`,
          reason_id: this.formBlock.reason,
          start_date: dateUtils.formatForApi(startDate),
          end_date: dateUtils.formatForApi(endDate),
        };

        // Make API call
        const responseBlockRoom = await blockRoomService(blockRoomData);

        if (responseBlockRoom.success) {
          await formUtils.showSuccess('Room blocked successfully!');
          this.$emit('block-saved', responseBlockRoom);
          this.resetForm();
        } else {
          throw new Error(responseBlockRoom.message || 'Failed to block room');
        }

      } catch (error) {
        console.error('Error submitting form:', error);
        const errorMessage = error.response?.data?.message ||
                           Object.values(error.response?.data?.errors || {}).flat().join(', ') ||
                           error.message ||
                           'Failed to block room. Please try again.';

        await formUtils.showError(errorMessage);
      }
    },

    resetForm() {
      this.formBlock = {
        dateStartAndEnd: "",
        roomType: "",
        room: "",
        reason: "",
      };
      if (this.flatpickrInstance) {
        this.flatpickrInstance.clear();
      }
    },



  },

  async mounted() {
    try {
      const reasonsResponse = await getReasonsSources();
      this.reasonsSources = reasonsResponse.data.data.data;
    } catch (error) {
      console.error("Error loading data:", error);
    }

    this.splitResourceId();
    this.initFlatpickr();
  },

  beforeUnmount() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  },

  mixins: [flatpickrMixin],
};
</script>
