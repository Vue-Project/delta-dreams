<template>
  <div>
    <form id="formBlockRoom" class="p-2" @submit.prevent="submitFormBlockRoom" ref="emptyForm">
      <div class="row">
        <div class="col-12">
          <label for="flatpickr-date-01" class="form-label">Date Range</label>
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker5" v-model="formBlock.dateStartAndEnd" aria-label="input Text to Date" disabled />
          <div class="text-danger small" v-if="$v.formBlock.dateStartAndEnd.$error">
            Date range is required
          </div>
        </div>
        <div class="col-12">
          <label for="formBlockRoomRoom" class="form-label">Room</label>
          <input type="text" class="form-control" id="formBlockRoomRoom" v-model="formBlock.roomType" placeholder="Room ID" disabled />
          <div class="text-danger small" v-if="$v.formBlock.roomType.$error">
            Room is required
          </div>
        </div>
        <div class="col-12">
          <label for="formBlockRoomReason" class="form-label">Reason</label>
          <select class="form-select" id="formBlockRoomReason" v-model="formBlock.reason" @blur="$v.formBlock.reason.$touch()">
            <option disabled value="">Select</option>
            <option v-for="reason in reasonsSources" :key="reason.id" :value="reason.id">
              {{ reason.name }}
            </option>
          </select>
          <div class="text-danger small" v-if="$v.formBlock.reason.$error">
            Please select a reason
          </div>
        </div>
      </div>
      <div class="gap-2 d-flex justify-content-end position-absolute" style="right: 15px; bottom: 10px;">
        <button @click="$emit('close-sidebar')" class="btn btn-secondary waves-effect waves-light">
          Close
        </button>
        <button type="submit" class="btn btn-primary waves-effect waves-light">
          Apply
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import flatpickrMixin from '../Mixin/flatpickrMixin';
import { blockRoomService, getReasonsSources } from '../../Api/CalenderApi';
import { dateUtils } from '../../Api/utils/data';
import { formUtils } from '../../Api/utils/form';
import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

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

  data ()
  {
    return {
      reasonsSources: [],
      flatpickrInstance: null,
      isSubmitting: false,
      isSidebarOpen: false,
      formBlock: {
        dateStartAndEnd: "",
        roomType: "",
        room: "",
        reason: "",
      },
    };
  },

  validations: {
    formBlock: {
      dateStartAndEnd: { required },
      roomType: { required },
      reason: { required }
    }
  },

  methods: {
    getFirstAndLastDates (dates)
    {
      if (!dates || dates.length === 0) return [];

      if (dates[0].dateTime) {
        const firstDate = dates[0].dateTime.split(",")[0];
        const lastDate = dates[dates.length - 1].dateTime.split(",")[0];
        return [firstDate, lastDate];
      }

      return dates.map(date =>
      {
        if (date instanceof Date) {
          return this.formatDate(date);
        }
        return date;
      });
    },

    formatDate (date)
    {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },

    splitResourceId ()
    {
      if (this.selectedResourceId) {
        const parts = this.selectedResourceId.split("-");


        if (parts.length >= 3) {
          // Show "UNIT-5480" in the input field
          this.formBlock.roomType = `${parts[0]}`;

          // Get the last number from the last part (e.g., "7" from "21-7")
          const lastPart = parts[parts.length - 1].split("-");
          this.formBlock.room = lastPart[lastPart.length - 1];
        }
      }
    },

    initFlatpickr ()
    {
      const dates = this.getFirstAndLastDates(this.selectedDates);
      this.formBlock.dateStartAndEnd = dates.join(' to ');

      this.flatpickrInstance = flatpickr(this.$refs.rangePicker5, {
        mode: "range",
        dateFormat: "d-m-Y",
        defaultDate: dates,
        onReady: (selectedDates) =>
        {
          if (selectedDates.length > 0) {
            const formattedDates = this.getFirstAndLastDates(selectedDates);
            this.formBlock.dateStartAndEnd = formattedDates.join(' to ');
          }
        },
        onChange: (selectedDates) =>
        {
          if (selectedDates.length > 0) {
            const formattedDates = selectedDates.map(date => this.formatDate(date));
            this.formBlock.dateStartAndEnd = formattedDates.join(' to ');
          }
        },
      });
    },

    async submitFormBlockRoom ()
    {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      try {
        const [startDate, endDate] = this.formBlock.dateStartAndEnd.split(' to ');
        const blockRoomData = {
          unit_id: this.formBlock.room,
          reason_id: this.formBlock.reason,
          start_date: dateUtils.formatForApi(startDate),
          end_date: dateUtils.formatForApi(endDate),
        };

        const responseBlockRoom = await blockRoomService(blockRoomData);
        await showSuccessAlert("Room blocked successfully!");
        this.$emit('close-sidebar');
        location.reload();
      } catch (error) {
        handleSubmissionError(error, "Please fill in all required fields");
      }
    },

    closeSidebar ()
    {
      this.$emit('close-sidebar');
    },
  },

  async mounted ()
  {
    try {
      const reasonsResponse = await getReasonsSources();
      this.reasonsSources = reasonsResponse.data.data;
    } catch (error) {
      console.error("Error loading data:", error);
    }

    this.splitResourceId();
    this.initFlatpickr();
  },

  beforeUnmount ()
  {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  },

  mixins: [flatpickrMixin, validationMixin],
};
</script>

<style scoped>
.text-danger {
  margin-top: 5px;
  font-size: 15px;
}
</style>
