<template>
  <section class="checkIn-reservations">
    <!-- {{ selectedDates }} -->
    <div class="card">
      <h5 class="card-header">
        <NuxtLink to="/"><i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d"></i> </NuxtLink>Add Reservation
      </h5>
      <hr class="m-0" />
      <div class="card-body">
        <form id="formReservation" class=" g-3" @submit.prevent="submitFormReservation" ref="emptyForm">
          <!--  ! Reservation  Details -->
          <!-- change in size and icons -->

          <div class="row">
            <div class="col-md-8">
              <div class="row align-items-center">
                <!-- Check-in Date Picker-->
                <div class="col-md-3 col-12 px-0">
                  <label for="flatpickr-date-01" class="form-label">Check-in</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" v-model="formAddReservation.checkInDate" aria-label="input Text to Check-in Date" />
                  <i class="fa-solid fa-calendar-days icon-date"></i>
                </div>

                <!-- Check-in Time Picker-->
                <div class="col-md-3 col-12 px-0">
                  <div class="input-group mt-4">
                    <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-01" ref="timePicker1" v-model="formAddReservation.checkInTime" aria-label="input Text to Check-in Time" />
                    <i class="fa-regular fa-clock icon-time"></i>
                    <span class="input-group-text total-nights" id="basic-addon13">{{ totalNights }} Nights</span>
                  </div>
                </div>

                <!-- Check-out Date Picker-->
                <div class="col-md-3 col-12 px-0">
                  <label for="flatpickr-date-02" class="form-label ms-3">Check-out</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-02" ref="datePicker2" v-model="formAddReservation.checkOutDate" />
                  <i class="fa-solid fa-calendar-days icon-date"></i>
                </div>

                <!-- Check-out Time Picker-->
                <div class="col-md-3 col-12 mt-4 px-0">
                  <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-02" ref="timePicker2" v-model="formAddReservation.checkOutTime" aria-label="input Text to Check-out Time" />
                  <i class="fa-regular fa-clock icon-time right"></i>
                </div>
              </div>

            </div>
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-3 col-12">
                  <label for="roomCount" class="form-label">Room(s)</label>
                  <input class="form-control" type="number" id="roomCount" v-model="roomCount" min="1" @input="updateRepeater" />
                </div>
                <div class="col-md-9 col-12 mb-4">
                  <label for="reservationType" class="form-label">Reservation Type</label>
                  <select class="form-select" id="reservationType" v-model="formAddReservation.reservationType">
                    <option disabled value="">Select</option>
                    <option v-for="source in reservationTypes" :key="source.id" :value="source.id">
                      {{ source.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-12 mb-4 p-0">
                <div class="row">
                  <div class="col-md-6">
                    <label for="bookingSource" class="form-label">Booking Source</label>
                    <select class="form-select" id="bookingSource" v-model="formAddReservation.bookingSource">
                      <option disabled value="">Select</option>
                      <option v-for="source in bookingSources" :key="source.id" :value="source.id">
                        {{ source.name }}
                      </option>
                    </select>

                  </div>
                  <div class="col-md-6">
                    <label for="businessSource" class="form-label">Business Source</label>
                    <select class="form-select" id="businessSource" v-model="formAddReservation.businessSource" ref="businessSource" :class="{ 'input-error': validationMessages.businessSource }">
                      <option disabled value="">Select</option>
                      <option v-for="source in businessSources" :key="source.id" :value="source.id">
                        {{ source.name }}
                      </option>
                    </select>
                    <span class="error-message" v-if="validationMessages.businessSource">{{ validationMessages.businessSource }}</span>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="my-4" />
          <!--   ! check inputs and repeater -->
          <div class="row mb-3">
            <div class="row">
              <div class="col-md-4">
                <div class="row">
                  <div class="col-md-4">Rate Offered:</div>
                  <div class="col-md-8">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedContract" v-model="formAddReservation.rateOffered.contract" />
                      <label class="form-check-label" for="rateOfferedContract">Contract</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedBookAll" v-model="formAddReservation.rateOffered.bookAll" />
                      <label class="form-check-label" for="rateOfferedBookAll">Book All Available Rooms</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedQuickGroup" v-model="formAddReservation.rateOffered.quickGroup" />
                      <label class="form-check-label" for="rateOfferedQuickGroup">Quick Group Booking</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedComplimentary" v-model="formAddReservation.rateOffered.complimentaryRoom" />
                      <label class="form-check-label" for="rateOfferedComplimentary">Complimentary Room</label>
                    </div>
                  </div>
                </div>
              </div>
              <!--  ! table Header -->
              <!-- change width delete border color  -->
              <div class="card mt-3 border-0">
                <div class="card-datatable table-responsive">
                  <table class=" table overflow-hidden">
                    <thead>
                      <tr class="rounded-1">
                        <th class="border-0">Room Type</th>
                        <th class="border-0">Rate Type</th>
                        <th class="border-0">Room</th>
                        <th class="border-0">Adult</th>
                        <th class="border-0">Child</th>
                        <th class="border-0 w-20">Rate(£)(Tax Inc.)</th>
                      </tr>
                    </thead>
                    <!--  ! table Header -->
                    <!--  ! table body -->
                    <tbody>
                      <tr v-for="(item, index) in formData" :key="index" class="mb-2 selectStyle">
                        <td>
                          <select :id="'form-repeater-0-' + index + '-1'" class="form-select" v-model="formAddReservation.units.roomType">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-2'" class="form-select" v-model="formAddReservation.units.rateType">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-3'" class="form-select" v-model="formAddReservation.units.room">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-4'" class="form-select" v-model="formAddReservation.units.adult">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-5'" class="form-select" v-model="formAddReservation.units.child">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <div class="row">
                            <div class="col-md-10">
                              <select :id="'form-repeater-0-' + index + '-6'" class="form-select" v-model="formAddReservation.units.rate">
                                <option value="select">select</option>
                                <option value="Developer">Developer</option>
                                <option value="Tester">Tester</option>
                                <option value="Manager">Manager</option>
                              </select>
                            </div>
                            <div class="col-md-2 p-0">
                              <button class="btn btn-label-danger" type="button" v-if="index >= existingItemsCount" @click="removeItem(index)">
                                <i class="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <!--  ! table body -->
                    <!--  ! table footer -->
                    <!-- <tfoot> -->
                    <!--change style button  -->
                    <!--  ! table footer -->
                  </table>
                  <button class="btn btn-primary waves-effect waves-light mt-3" type="button" @click="addItem">
                    Add Room
                  </button>
                </div>
              </div>
              <!--   ! check inputs and repeater -->
            </div>
          </div>
          <hr class="my-4" />
          <!--  ! Hold Release Date & Time -->
          <div class="row">
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-6 col-12 px-0">
                      <label for="flatpickr-date-03" class="form-label">Hold Release Date & Time</label>
                      <input type="text" placeholder="YYYY-MM-DD" id="flatpickr-date-03" class="form-control flatpickr-input" ref="datePicker3" v-model="formAddReservation.releaseDate" />
                      <i class="fa-solid fa-calendar-days icon-date"></i>
                    </div>
                    <div class="col-md-6 col-12 px-0 mt">
                      <input type="text" placeholder="HH:MM" id="flatpickr-time-03" class="form-control flatpickr-input" ref="timePicker3" aria-label="input Text to Time" v-model="formAddReservation.releaseTime" />
                      <i class="fa-regular fa-clock icon-time right"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <label for="releaseTerm" class="form-label">Release Term</label>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Value" id="releaseTerm" v-modal="formAddReservation.releaseTerm" />
                    <span class="input-group-text groupStyle">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 col-12">
                  <label for="releaseTerm" class="form-label">Remind Guest before</label>
                  <div class="input-group">
                    <input type="number" class="form-control" placeholder="0" id="releaseTerm" v-modal="formAddReservation.remindGuest" />
                    <span class="input-group-text groupStyle">Days</span>
                  </div>
                </div>
                <div class="col-md-8 col-12">
                  <div class="d-flex mt-4">
                    <div class="form-check mr-2">
                      <input type="radio" id="hold-release" name="optionRadioDate" class="form-check-input" v-modal="formAddReservation.holdRelease" />
                      <label class="form-check-label" for="hold-release">Hold Release Date</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" id="arrival-date" name="optionRadioDate" class="form-check-input" v-modal="formAddReservation.arrivalDate" />
                      <label class="form-check-label" for="arrival-date">Arrival Date</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  ! Hold Release Date & Time -->
          <hr class="my-4" />
          <!--  ! Guest Information -->
          <h6 class="mb-2">Guest Information</h6>
          <div class="row">
            <div class="col-md-5">
              <label for="nameGuest" class="col-form-label">Guest Name</label>
              <div class="input-group">
                <select class="form-select" id="nameGuest">
                  <option value="" disabled>MR.</option>
                  <option v-for="title in titles" :key="title" :value="title">
                    {{ title }}
                  </option>
                </select>

                <div class="position-relative flex-grow-1">
                  <input type="text" class="form-control w-100" v-model="formAddReservation.guestInformation.name" @input="handleInput" @focus="showDropdown = true" @blur="handleBlur" ref="name" :class="{ 'input-error': validationMessages.name }" />


                  <!-- Suggestions Dropdown -->
                  <div v-if="showDropdown && filteredNames.length > 0" class="position-absolute w-100 mt-1 bg-white border rounded shadow z-5 cursor-pointer">
                    <div v-for="name in filteredNames" :key="typeof name === 'object' ? name.id : name" class="p-2 cursor-pointer hover:bg-light" @mousedown.prevent="selectName(name)">
                      {{ typeof name === "object" ? name.name : name }}
                    </div>
                  </div>

                </div>



                <button class="btn btn-outline-primary waves-effect" type="button" @click="toggleSidebar">
                  <i class="fa-solid fa-user-plus"></i>
                </button>
              </div>
              <span class="error-message" v-if="validationMessages.name">{{ validationMessages.name }}</span>


              <SidebarAddGuest :is-sidebar-open="isSidebarOpen" @close-sidebar="toggleSidebar" />
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-6">
                  <label for="emailGuest" class="col-form-label">Email</label>
                  <input class="form-control" type="email" id="emailGuest" placeholder="Email" v-model="formAddReservation.guestInformation.email" />
                </div>
                <div class="col-md-6">
                  <div class="mb-3 row">
                    <label for="mobileGuest" class="col-form-label">Mobile</label>
                    <input class="form-control" type="tel" id="mobileGuest" placeholder="Mobile" v-model="formAddReservation.guestInformation.mobile" ref="mobile" :class="{ 'input-error': validationMessages.mobile }" />
                    <span class="error-message" v-if="validationMessages.mobile">{{ validationMessages.mobile }}</span>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <label for="addressGuest" class="col-form-label">Address</label>
              <input class="form-control" type="text" id="addressGuest" placeholder="Address" v-model="formAddReservation.guestInformation.address" />
            </div>
            <div class="row">
              <div class="col-md-3">
                <label for="countryGuest" class="col-form-label">Country</label>
                <input class="form-control" type="text" id="countryGuest" placeholder="country" v-modal="formAddReservation.guestInformation.country" />
              </div>
              <div class="col-md-3">
                <label for="stateGuest" class="col-form-label">State</label>
                <input class="form-control" type="text" id="stateGuest" placeholder="state" v-model="formAddReservation.guestInformation.state" />
              </div>
              <div class="col-md-3">
                <label for="cityGuest" class="col-form-label">City</label>
                <input class="form-control" type="text" id="cityGuest" placeholder="city" v-model="formAddReservation.guestInformation.city" />
              </div>
              <div class="col-md-3">
                <label for="ZipGuest" class="col-form-label">Zip</label>
                <input class="form-control" type="text" id="ZipGuest" placeholder="Zip" v-model="formAddReservation.guestInformation.zip" />
              </div>
            </div>
          </div>

          <!--  ! Guest Information -->
          <!--  ! Other Information -->
          <hr class="my-4" />
          <h6 class="mb-3">Other Information</h6>
          <div class="row">
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationCheck01" v-model="showSelect" />
              <label class="form-check-label" for="otherInformationCheck01">
                Email Booking Vouchers
              </label>
            </div>
            <div v-if="showSelect" class="mb-3">
              <select id="bookingOptions" class="form-select">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationCheck02" v-model="showInput" />
              <label class="form-check-label" for="otherInformationCheck02">
                Send email at Check-out
              </label>
            </div>
            <div v-if="showInput" class="mb-3">
              <div class="input-group">
                <input type="email" id="emailInput" class="form-control" placeholder="Use comma to add multiple email address" aria-label="send email to check" />
                <button class="btn btn-primary" type="button">
                  Preview Voucher
                </button>
              </div>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationCheck03" />
              <label class="form-check-label" for="otherInformationCheck03">
                Access To Guest Portal
              </label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationCheck04" />
              <label class="form-check-label" for="otherInformationCheck04">
                Supress Rate on Registration Card
              </label>
            </div>
          </div>
          <!--  ! Other Information -->
          <hr class="my-4" />
          <div class="row">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-lg btn-secondary waves-effect waves-light">
                Cancel
              </button>
              <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light">
                Reserver
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import Swal from 'sweetalert2';  // Import SweetAlert2
import { getBookingSources, getBusinessSources, getReservationTypes, getUsers } from "../Api/api";
import flatpickrMixin from "../Mixin/flatpickrMixin";
import SidebarAddGuest from "../layout/Sidebar.vue";
import axios from 'axios';


export default {
  name: "CheckIn",
  layout: "component",
  components: { SidebarAddGuest },

  data ()
  {
    return {
      showSelect: false,
      showInput: false,
      isSidebarOpen: false,
      roomCount: 1,
      users: [],
      selectedTitle: "MR.",
      inputValue: "",
      showDropdown: false,
      titles: ["MR.", "DR.", "JN.", "MAM.", "MRS.", "MS.", "SIR.", "SR."],
      names: [],
      formData: [{ rooms: 1 }],
      existingItemsCount: 1,
      selectedOptionBusiness: "",
      datePicker1Instance: null,
      datePicker2Instance: null,
      timePicker1Instance: null,
      timePicker2Instance: null,
      businessSources: [],
      bookingSources: [],
      reservationTypes: [],
      formAddReservation: {
        checkInDate: "",
        checkInTime: "",
        checkOutDate: "",
        checkOutTime: "",
        numberRooms: "",
        reservationType: "",
        businessSource: "",
        rateOffered: {
          rateOfferedContract: false,
          bookAll: false,
          quickGroup: false,
          complimentaryRoom: false,
        },
        units: [{
          roomType: "",
          rateType: "",
          adults: "",
          children: "",
          rate: "",

        }],
        releaseDate: "",
        releaseTime: "",
        releaseTerm: "",
        remindGuest: "",
        holdRelease: false,
        arrivalDate: false,
        guestInformation: {
          name: "",
          email: "",
          mobile: "",
          address: "",
          country: "",
          state: "",
          city: "",
          zip: "",
        }
      },
      validationMessages: {
        businessSource: '',
        name: '',
        mobile: '',
      },
    };
  },
  watch: {

    roomCount (newValue)
    {
      this.formAddReservation.numberRooms = newValue;
    }, selectedDates: {
      handler (newValue)
      {
        if (newValue.length > 0) {
          // Update enabled dates when selectedDates changes
          this.datePicker1Instance?.set('enable', [this.firstDate]);
          this.datePicker2Instance?.set('enable', [this.lastDate]);

          // Update time pickers
          this.timePicker1Instance?.setDate(this.firstDate);
          this.timePicker2Instance?.setDate(this.lastDate);
        }
      },
      deep: true
    }

  },
  methods: {
    handleInput ()
    {
      this.showDropdown = true;
    },
    handleBlur ()
    {
      setTimeout(() =>
      {
        this.showDropdown = false;
      }, 200);
    },
    selectName (name)
    {
      this.inputValue = name;
      this.showDropdown = false;
    },
    updateRepeater ()
    {
      const currentCount = this.formData.length;
      if (currentCount < this.roomCount) {
        for (let i = currentCount; i < this.roomCount; i++) {
          this.formData.push({
            rooms: 1,
          });
        }
      } else if (currentCount > this.roomCount) {
        this.formData.splice(this.roomCount);
      }
    },
    addItem ()
    {
      this.formData.push({
        rooms: 1,
      });
      this.roomCount = this.formData.length;
    },
    removeItem (index)
    {
      if (this.formData.length > 1) {
        this.formData.splice(index, 1);
        this.roomCount = this.formData.length;
      }
    },

    isNewItem (index)
    {
      return index >= this.existingItemsCount;
    },
    toggleSidebar ()
    {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleInput ()
    {
      this.showDropdown = true;
    },
    handleBlur ()
    {
      // Small delay to allow for mousedown on suggestion
      setTimeout(() =>
      {
        this.showDropdown = false;
      }, 20000);
    },
    selectName (name)
    {
      this.inputValue = name;
      this.showDropdown = false;
    },
    selectName (name)
    {
      this.inputValue = typeof name === "object" ? name.name : name;
      this.showDropdown = false;
    },
     // Reset validation messages
     resetValidationMessages() {
      this.validationMessages = {};
    },

    // Reset the form
    resetForm() {
      this.formAddReservation = {
        businessSource: '',
        guestInformation: {
          name: '',
          mobile: '',
        },
        // Reset other fields as needed...
      };
    },

    async submitFormReservation() {
      // Define required fields and their messages
      const requiredFields = [
        { field: "businessSource", message: "Business Source is required" },
        { field: "name", message: "Guest Name is required" },
        { field: "mobile", message: "Guest Mobile is required" },
      ];

      // Reset validation messages before checking
      this.resetValidationMessages();

      let hasError = false;

      // Validate each required field
      for (const { field, message } of requiredFields) {
        const value =
          field === "name" || field === "mobile"
            ? this.formAddReservation.guestInformation[field]
            : this.formAddReservation[field];

        if (!value) {
          hasError = true;
          this.$set(this.validationMessages, field, message); // Set validation message
        } else {
          this.$delete(this.validationMessages, field); // Remove validation message if input is valid
        }
      }

      // Stop submission if there are errors
      if (hasError) return;

      // Prepare the data to send to the server
      const bookingData = {
  checkin_date: this.formAddReservation.checkin_date || "2024-12-19",
  checkin_time: this.formAddReservation.checkin_time || "14:00",
  checkout_date: this.formAddReservation.checkout_date || "2024-12-24",
  checkout_time: this.formAddReservation.checkout_time || "12:00",
  number_of_rooms: this.formAddReservation.number_of_rooms || 2,
  booking_source_id: this.formAddReservation.booking_source_id || 1,
  business_source_id: this.formAddReservation.business_source_id || 1,
  units: this.formAddReservation.units.map(unit => ({
    unit_id: unit.unit_id || 1,
    unit_type_id: unit.unit_type_id || 1,
    rate_type: unit.rate_type || "standard",
    adults: unit.adults || 2,
    children: unit.children || 0,
    rate_amount: unit.rate_amount || 150.0,
  })),
  is_quick_group_booking: this.formAddReservation.is_quick_group_booking || false,
  is_complimentary: this.formAddReservation.is_complimentary || false,
  book_all_available: this.formAddReservation.book_all_available || false,
  hold_release_date: this.formAddReservation.hold_release_date || "2024-03-08",
  release_term_value: this.formAddReservation.release_term_value || 24,
  release_term_type: this.formAddReservation.release_term_type || "hours",
  remind_before_days: this.formAddReservation.remind_before_days || 2,
  user_id: this.formAddReservation.user_id || 1,
  guest_mobile: this.formAddReservation.guestInformation.mobile || "1234567890",
  guest_address: this.formAddReservation.guestInformation.address || "123 Main Street",  // Replace with dynamic form data
  guest_country: this.formAddReservation.guestInformation.country || "Egypt",
  guest_state: this.formAddReservation.guestInformation.state || "Cairo",
  guest_city: this.formAddReservation.guestInformation.city || "Cairo",
  guest_zip: this.formAddReservation.guestInformation.zip || "12345",
  reservation_type_id: this.formAddReservation.reservation_type_id || 1,
};


      // If no errors, send the data to the server
      try {
        const response = await axios.post("https://deltadream.swevey.com/api/reservations", bookingData);
        console.log("Booking submitted successfully:", response.data);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Guest added successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          // Reset the form after user clicks OK
          this.resetForm();
        });

      } catch (error) {
        console.error("Error submitting booking:", error.response?.data || error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an issue submitting the booking.",
          confirmButtonText: "OK",
        });
      }
    },

    // Reset form data and validation messages
    resetForm ()
    {
      this.formAddReservation = {
        checkInDate: "",
        checkInTime: "",
        checkOutDate: "",
        checkOutTime: "",
        numberRooms: "",
        bookingSource: "",
        name: "",
        mobile: "",
        reservationType: "",
        businessSource: "",
        rateOffered: {
          contract: false,
          bookAll: false,
          quickGroup: false,
          complimentaryRoom: false,
        },
        units: {
          roomType: "",
          rateType: "",
          adults: "",
          children: "",
          rate: "",

        },
        releaseDate: "",
        releaseTime: "",
        releaseTerm: "",
        remindGuest: "",
        holdRelease: false,
        arrivalDate: true,
        guestInformation: {
          name: "",
          email: "",
          mobile: "",
          address: "",
          country: "",
          state: "",
          city: "",
          zip: "",
        }
      }


      this.resetValidationMessages();

      // Remove error classes from inputs
      for (const refKey in this.$refs) {
        const element = this.$refs[refKey];
        if (element && element.classList) {
          element.classList.remove("input-error");
        }
      }
    },

    // Reset all validation messages
    resetValidationMessages ()
    {
      this.validationMessages = {
        name: '',
        mobile: '',
        businessSource: '',
      };
    },
    formatDateToDDMMYYYY (date)
    {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    formatTime (date)
    {
      return date.toTimeString().slice(0, 5);
    }

  },
  async mounted ()
  {
    try {
      const [
        businessSourcesResponse,
        bookingSourcesResponse,
        reservationTypesResponse,
        usersResponse,
      ] = await Promise.all([
        getBusinessSources(),
        getBookingSources(),
        getReservationTypes(),
        getUsers(),
      ]);

      this.businessSources = businessSourcesResponse.data.data;
      this.bookingSources = bookingSourcesResponse.data.data;
      this.reservationTypes = reservationTypesResponse.data.data;
      this.names = usersResponse.data.data;
    } catch (error) {
      console.error("Error loading data:", error);
    }
    this.$nextTick(() =>
    {
      if (this.firstDate && this.lastDate) {
        // Initialize date pickers with correct format
        this.datePicker1Instance = flatpickr(this.$refs.datePicker1, {
          enableTime: false,
          dateFormat: "d/m/Y",
          defaultDate: this.firstDate,
          enable: [this.firstDate],
          disableMobile: true,
          onChange: (selectedDates) =>
          {
            if (selectedDates[0]) {
              this.formAddReservation.checkInDate = this.formatDateToDDMMYYYY(selectedDates[0]);
            }
          }
        });

        this.datePicker2Instance = flatpickr(this.$refs.datePicker2, {
          enableTime: false,
          dateFormat: "d/m/Y",
          defaultDate: this.lastDate,
          enable: [this.lastDate],
          disableMobile: true,
          onChange: (selectedDates) =>
          {
            if (selectedDates[0]) {
              this.formAddReservation.checkOutDate = this.formatDateToDDMMYYYY(selectedDates[0]);
            }
          }
        });

        // Set initial values
        this.formAddReservation.checkInDate = this.formatDateToDDMMYYYY(this.firstDate);
        this.formAddReservation.checkOutDate = this.formatDateToDDMMYYYY(this.lastDate);

        // Initialize time pickers
        this.timePicker1Instance = flatpickr(this.$refs.timePicker1, {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          defaultDate: this.firstDate,
          onChange: (selectedDates) =>
          {
            this.formAddReservation.checkInTime = selectedDates[0] ?
              this.formatTime(selectedDates[0]) : '';
          }
        });

        this.timePicker2Instance = flatpickr(this.$refs.timePicker2, {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          defaultDate: this.lastDate,
          onChange: (selectedDates) =>
          {
            this.formAddReservation.checkOutTime = selectedDates[0] ?
              this.formatTime(selectedDates[0]) : '';
          }
        });

        // Set initial times
        this.formAddReservation.checkInTime = this.formatTime(this.firstDate);
        this.formAddReservation.checkOutTime = this.formatTime(this.lastDate);
      }
    });
  },
  computed: {
    filteredNames ()
    {
      if (!this.inputValue) return [];
      const searchTerm = this.inputValue.toLowerCase();

      return this.names.filter((name) =>
      {
        // Handle both string and object formats
        const nameValue = typeof name === "object" ? name.name : name;
        return nameValue.toLowerCase().startsWith(searchTerm);
      });
    },
    parsedDates ()
    {
      return this.selectedDates.map(item =>
      {
        const [datePart, timePart] = item.dateTime.split(', ');
        const [day, month, year] = datePart.split('/');
        return new Date(`${year}-${month}-${day}T${timePart}`);
      });
    },

    firstDate ()
    {
      return this.parsedDates[0] || null;
    },

    lastDate ()
    {
      return this.parsedDates[this.parsedDates.length - 1] || null;
    },

    totalNights ()
    {
      if (!this.formAddReservation.checkInDate || !this.formAddReservation.checkOutDate) {
        return 0;
      }
      const [checkInDay, checkInMonth, checkInYear] = this.formAddReservation.checkInDate.split('/');
      const [checkOutDay, checkOutMonth, checkOutYear] = this.formAddReservation.checkOutDate.split('/');

      const checkIn = new Date(checkInYear, checkInMonth - 1, checkInDay);
      const checkOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);

      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    guestNameModel: {
      // Getter: Retrieve the current value
      get ()
      {
        return this.inputValue || this.formAddReservation.guestInformation.title;
      },
      // Setter: Update both values when changed
      set (value)
      {
        this.inputValue = value;
        this.formAddReservation.guestInformation.title = value;
      },
    },
  },
  beforeDestroy ()
  {
    this.datePicker1Instance?.destroy();
    this.datePicker2Instance?.destroy();
    this.timePicker1Instance?.destroy();
    this.timePicker2Instance?.destroy();
  },
  mixins: [flatpickrMixin],
  props: {
    selectedDates: {
      type: Array,
      required: true,
      default: () => []

    },
  },
};
</script>

<style scoped></style>
