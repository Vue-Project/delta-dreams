<template>
  <div>
    <form action="" class="p-2">
      <div class="row">
        <div class="col-12  ">
          <label for="flatpickr-date-01" class="form-label">Date Range</label>
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker5" aria-label="input Text to Date" />
        </div>
        <div class="col-12">
          <label for="businessSource" class="form-label">Room Type</label>
          <select class="form-select" id="businessSource" v-model="selectedOptionBusiness">
            <option disabled value="">Select</option>
            <option v-for="source in businessSources" :key="source.id" :value="source.id">
              {{ source.name }}
            </option>
          </select>
        </div>
        <div class="col-12">
          <label for="businessSource" class="form-label">Room </label>
          <select class="form-select" id="businessSource" v-model="selectedOptionBusiness">
            <option disabled value="">Select</option>
            <option v-for="source in businessSources" :key="source.id" :value="source.id">
              {{ source.name }}
            </option>
          </select>
        </div>
        <div class="col-12">
          <label for="businessSource" class="form-label">Reason</label>
          <select class="form-select" id="businessSource" v-model="selectedOptionBusiness">
            <option disabled value="">Select</option>
            <option v-for="source in businessSources" :key="source.id" :value="source.id">
              {{ source.name }}
            </option>
          </select>
        </div>
      </div>
      <div class=" gap-2 d-flex justify-content-end position-absolute  " style="right: 15px ;bottom: 10px;">
        <button class="btn btn-secondary waves-effect waves-light">
          Clear
        </button>
        <button type="submit" class="btn btn-primary waves-effect waves-light">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import flatpickrMixin from '../Mixin/flatpickrMixin';

flatpickrMixin
export default {
  name: "BlockRoomForm",
  layout: "Component",

  mixins: [flatpickrMixin],
};
</script>
