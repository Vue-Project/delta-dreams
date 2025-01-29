<template>
  <section class="checkIn-reservations">
    <p>{{unitsTypes}}</p>
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
                    <span class="input-group-text total-nights bg-primary waves-effect waves-light" id="basic-addon13">{{ totalNights }} Nights</span>
                  </div>
                </div>

                <!-- Check-out Date Picker-->
                <div class="col-md-3 col-12 px-0">
                  <label for="flatpickr-date-02" class="form-label ms-3">Check-out</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-02" ref="datePicker2" v-model="formAddReservation.checkOutDate" aria-label="input Text to Check-out Date" />
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
                <!-- <div class="col-md-3 col-12">
                  <label for="roomCount" class="form-label">Room(s)</label>
                  <input class="form-control" type="number" id="roomCount" v-model="roomCount" min="1" @input="updateRepeater" />
                </div> -->
                <div class="col-md-3 col-12">
                  <label for="roomCount" class="form-label">Room(s)</label>
                  <input class="form-control" type="number" id="roomCount" v-model="formAddReservation.numberRooms" min="1" max="1" />
                </div>
                <div class="col-md-9 col-12 mb-4">
                  <label for="reservationType" class="form-label">Reservation Type</label>
                  <select class="form-select" id="reservationType" v-model="formAddReservation.reservationType" ref="reservationType" :class="{ 'input-error': validationMessages.reservationType }">
                    <option disabled value="">Select</option>
                    <option v-for="source in reservationTypes" :key="source.id" :value="source.id">
                      {{ source.name }}
                    </option>
                  </select>
                  <span v-if="validationMessages.reservationType" class="error-message">{{ validationMessages.reservationType }}</span>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-12 mb-4 p-0">
                <div class="row">
                  <div class="col-md-6">
                    <label for="bookingSource" class="form-label">Booking Source</label>
                    <select class="form-select" id="bookingSource" v-model="formAddReservation.bookingSource" ref="bookingSource" :class="{ 'input-error': validationMessages.bookingSource }">
                      <option disabled value="">Select</option>
                      <option v-for="source in bookingSources" :key="source.id" :value="source.id">
                        {{ source.name }}
                      </option>
                    </select>
                    <span v-if="validationMessages.bookingSource" class="error-message">{{ validationMessages.bookingSource }}</span>
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
                        <th class="border-0 w-20">Rate(EGP)(Tax Inc.)</th>
                      </tr>
                    </thead>
                    <!--  ! table Header -->
                    <!--  ! table body -->
                    <tbody>
                      <tr v-for="(item, index) in formData" :key="index" class="mb-2 selectStyle">
                        <td>
                          <input type="text" class="form-control" v-model="formAddReservation.units[0].roomType" disabled aria-label="Room Type of building ID" />

                        </td>
                        <td style="width: 185px">
                          <select class="form-select" v-model="formAddReservation.units[0].rateType" ref="rateType" :class="{ 'input-error': validationMessages.rateType }">
                            <option value="">Rate Type</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="nobreakfast">NoBreakfast</option>

                          </select>
                          <span class="error-message" v-if="validationMessages.rateType">{{ validationMessages.rateType }}</span>

                        </td>
                        <td>
                          <input type="text" class="form-control" v-model="formAddReservation.units[0].room" disabled aria-label="Room  of building ID" />

                        </td>
                        <td>
                          <input type="number" class="form-control" v-model="formAddReservation.units[0].adults" placeholder="Number of adults" aria-label="Number of adults" min="0" ref="adults" :class="{ 'input-error': validationMessages.adults }" />
                          <span class="error-message" v-if="validationMessages.children">{{ validationMessages.children }}</span>

                        </td>
                        <td>
                          <input type="number" class="form-control" v-model="formAddReservation.units[0].children" placeholder="Number of children" aria-label="Number of children" min="0" ref="children" :class="{ 'input-error': validationMessages.children }" />
                          <span class="error-message" v-if="validationMessages.children">{{ validationMessages.children }}</span>
                        </td>
                        <td>
                          <div class="row">
                            <div class="col-md-10">
                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="0.00" id="rateAmount" v-model="formAddReservation.units[0].rateAmount" aria-label="number of rateAmount" ref="rateAmount" :class="{ 'input-error': validationMessages.rateAmount }" />
                                <span class="input-group-text groupStyle">EGP</span>
                              </div>
                              <span class="error-message" v-if="validationMessages.rateAmount">{{ validationMessages.rateAmount }}</span>
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
                  <!-- <button class="btn btn-primary waves-effect waves-light mt-3" type="button" @click="addItem">
                    Add Room
                  </button> -->
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
                    <div class="col-md-7 col-12 px-0">
                      <label for="flatpickr-date-03" class="form-label">Hold Release Date & Time</label>
                      <input type="text" placeholder="YYYY-MM-DD" id="flatpickr-date-03" class="form-control flatpickr-input" ref="datePicker3" v-model="formAddReservation.releaseDate" />
                      <i class="fa-solid fa-calendar-days icon-date"></i>
                    </div>
                    <div class="col-md-5 col-12 px-0 mt">
                      <input type="text" placeholder="HH:MM" id="flatpickr-time-03" class="form-control flatpickr-input" ref="timePicker3" aria-label="input Text to Time" v-model="formAddReservation.releaseTime" />
                      <i class="fa-regular fa-clock icon-time right"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <label for="releaseTerm" class="form-label">Release Term</label>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Value" id="releaseTerm" v-model="formAddReservation.releaseTerm" />
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
                    <input type="number" class="form-control" placeholder="0" id="releaseTerm" v-model="formAddReservation.remindGuest" />
                    <span class="input-group-text groupStyle">Days</span>
                  </div>
                </div>
                <div class="col-md-8 col-12">
                  <div class="d-flex mt-4">
                    <div class="form-check mr-2">
                      <input type="radio" id="hold-release" name="optionRadioDate" class="form-check-input" v-model="formAddReservation.holdRelease" />
                      <label class="form-check-label" for="hold-release">Hold Release Date</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" id="arrival-date" name="optionRadioDate" class="form-check-input" v-model="formAddReservation.arrivalDate" />
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
                  <input type="text" class="form-control w-100" v-model="formAddReservation.guestInformation.name" @input="handleSearch" @focus="showDropdown = true" @blur="handleBlur" ref="name" :class="{ 'input-error': validationMessages.name }" />

                  <!-- Suggestions Dropdown -->
                  <div v-if="showDropdown" class="position-absolute w-100 mt-1 bg-white border rounded shadow z-5 cursor-pointer" style="max-height: 200px; overflow-y: auto" @scroll.passive="handleScroll">
                    <div v-if="isLoading" class="p-2 text-muted">Loading...</div>
                    <div v-else>
                      <div v-for="name in filteredNames" :key="name.id" class="p-2 cursor-pointer hover:bg-light" @mousedown.prevent="selectName(name)">
                        {{ name.name }}
                      </div>
                      <div v-if="!hasMore && filteredNames.length === 0" class="p-2 text-muted">
                        No results found
                      </div>
                      <div v-if="hasMore && filteredNames.length > 0" class="p-2 text-muted">
                        Loading more...
                      </div>
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
                <input class="form-control" type="text" id="countryGuest" placeholder="country" v-model="formAddReservation.guestInformation.country" />
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
          <!-- <hr class="my-4" /> -->
          <!-- <h6 class="mb-3">Other Information</h6>
          <div class="row">
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationEmailBooking" v-model="showSelect" />
              <label class="form-check-label" for="otherInformationEmailBooking">
                Email Booking Vouchers
              </label>
            </div>
            <div v-if="showSelect" class="mb-3">
              <select id="otherInformationEmailBookingOption" class="form-select" v-model="formAddReservation.otherInformation.emailBookingOption">
                <option value="" disabled selected>select</option>
                <option value="0">Thank You email to Guest/Booker upon checking out from Hotel</option>
                <option value="1">Guest Portal Access email to Guest on Direct checkin in Hotel</option>
              </select>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationSendEmail" v-model="showInput" />
              <label class="form-check-label" for="otherInformationSendEmail">
                Send email at Check-out
              </label>
            </div>
            <div v-if="showInput" class="mb-3">
              <div class="input-group">
                <input type="email" id="emailInput" class="form-control" placeholder="Use comma to add multiple email address" aria-label="send email to check" v-model="formAddReservation.otherInformation.emailAddressCheckout" />
                <button class="btn btn-primary" type="button">
                  Preview Voucher
                </button>
              </div>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationGuestPortal" v-model="formAddReservation.otherInformation.accessToGuestPortal" />
              <label class="form-check-label" for="otherInformationGuestPortal">
                Access To Guest Portal
              </label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="otherInformationRegistrationCard" v-model="formAddReservation.otherInformation.suppressRateOnRegistrationCard" />
              <label class="form-check-label" for="otherInformationRegistrationCard">
                Supress Rate on Registration Card
              </label>
            </div>
          </div> -->
          <!--  ! Other Information -->
          <hr class="my-4" />
          <div class="row">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-lg btn-secondary waves-effect waves-light" @click="goBack">
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
import { getBookingSources, getBusinessSources, getReservationTypes, getGuestsInfo, postAddReservationData, getUnitTypes } from "../../Api/addResvertionApi";
import flatpickrMixin from "../Mixin/flatpickrMixin";
import SidebarAddGuest from "../layout/AddGuestSidebar.vue";


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
      selectedTitle: "MR.",
      showDropdown: false,
      titles: ["MR.", "DR.", "JN.", "MAM.", "MRS.", "MS.", "SIR.", "SR."],
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
      unitsTypes:[],
      formAddReservation: {
        checkInDate: "",
        checkInTime: "",
        checkOutDate: "",
        checkOutTime: "",
        numberRooms: "1",
        reservationType: "",
        businessSource: "",
        rateOffered: {
          rateOfferedContract: false,
          bookAll: false,
          quickGroup: false,
          complimentaryRoom: false,
        },
        units: [{
          // roomType: "",
          rateType: "",
          room: "",
          adults: "",
          children: "",
          rateAmount: "",
          unitTypeId: "",
          unitId: "",
        }],
        releaseDate: "",
        releaseTime: "",
        releaseTerm: "",
        releaseTermValue: "",
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
        },
        otherInformation: {
          emailBookingOption: '', // Selected booking option
          emailAddressCheckout: '', // Email addresses input
          accessToGuestPortal: false, // Toggle for Access To Guest Portal
          suppressRateOnRegistrationCard: false, // Toggle for Suppress Rate on Registration Card
        },
      },
      validationMessages: {
        businessSource: '',
        reservationType: '',
        name: '',
        mobile: '',
        adults: '',
        children: '',
        rateType: '',

      },
      selectedNameId: null, // ID to send to the server
      showDropdown: false,
      filteredNames: [], // List of objects with { id, name }
      currentPage: 1,
      totalPages: 1,
      hasMore: false,
      isLoading: false,
      searchQuery: '',
    };
  },

  methods: {
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
      // Fetch or filter names based on the input
      this.fetchNames(this.formAddReservation.guestInformation.name);
    },
    //  handleBlur ()
    //   {
    //     // Hide dropdown after a small delay to allow selection
    //     setTimeout(() =>
    //     {
    //       this.showDropdown = false;
    //     }, 200);
    //   },
    //   selectName (name)
    //   {
    //     // Set the name for display and store the ID
    //     this.formAddReservation.guestInformation.name = name.name;
    //     this.selectedNameId = name.id;
    //     this.showDropdown = false;
    //   },
    //   fetchNames (query)
    //   {
    //     // Fetch or filter names dynamically
    //     // Replace with your API call
    //     const allNames = this.filteredNames
    //     this.filteredNames = allNames.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    //   },

    // Reset validation messages
    resetValidationMessages ()
    {
      this.validationMessages = {};
    },

    // Reset the form
    resetForm ()
    {
      this.formAddReservation = {
        checkInDate: "",
        checkInTime: "",
        checkOutDate: "",
        checkOutTime: "",
        numberRooms: "1",
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
          room: "",
          adults: "",
          children: "",
          rateAmount: "",
          unitTypeId: "",
          unitId: "",
        }],
        releaseDate: "",
        releaseTime: "",
        releaseTerm: "",
        releaseTermValue: "",
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
      }
    },

    async submitFormReservation ()
    {

      const requiredFields = [
        { field: "businessSource", message: "Business Source is required" },
        { field: "bookingSource", message: "Booking Source is required" },
        { field: "reservationType", message: "Reservation Type is required" },
        { field: "name", message: "Guest Name is required" },
        { field: "mobile", message: "Guest Mobile is required" },
        { field: "adults", message: "Adults count is required" },
        { field: "children", message: "Children count is required" },
        { field: "rateType", message: "Rate Type is required" },
        { field: "rateAmount", message: "Rate Amount is required" },
      ];

      // Reset validation messages before checking
      this.resetValidationMessages();

      let hasError = false;

      // Validate each required field
      for (const { field, message } of requiredFields) {
        let value;

        // Handle fields related to `units[0]`
        if (["adults", "children", "rateType", "rateAmount"].includes(field)) {
          value = this.formAddReservation.units[0]?.[field];
        } else if (field === "name" || field === "mobile") {
          value = this.formAddReservation.guestInformation[field];
        } else {
          value = this.formAddReservation[field];
        }

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
        checkin_date: this.formAddReservation.checkInDate,
        checkin_time: this.formAddReservation.checkInTime,
        checkout_date: this.formAddReservation.checkOutDate,
        checkout_time: this.formAddReservation.checkOutTime,
        rooms: this.formAddReservation.numberRooms,
        booking_source_id: this.formAddReservation.bookingSource,
        business_source_id: this.formAddReservation.businessSource,
        reservation_type_id: this.formAddReservation.reservationType,
        units: this.formAddReservation.units.map(unit => ({
          unit_id: unit.unitId,
          unit_type_id: unit.unitTypeId,
          rate_type: unit.rateType,
          adults: unit.adults,
          children: unit.children,
          rate_amount: unit.rateAmount,
        })),
        is_quick_group_booking: this.formAddReservation.rateOffered.quickGroup,
        is_complimentary: this.formAddReservation.rateOffered.complimentaryRoom,
        book_all_available: this.formAddReservation.rateOffered.bookAll,
        hold_release_date: this.formAddReservation.releaseDate,
        hold_release_time: this.formAddReservation.releaseTime,
        release_term_value: this.formAddReservation.releaseTermValue || 24,
        release_term_type: this.formAddReservation.releaseTerm || "24 hours",
        remind_before_days: this.formAddReservation.remindGuest,
        user_id: this.selectedNameId,
        mobile: this.formAddReservation.guestInformation.mobile,
        address: this.formAddReservation.guestInformation.address,
        country: this.formAddReservation.guestInformation.country,
        state: this.formAddReservation.guestInformation.state,
        city: this.formAddReservation.guestInformation.city,
        zip: this.formAddReservation.guestInformation.zip,
        booking: this.showSelect,
        booking_option: this.formAddReservation.otherInformation.emailBookingOption,
        send_email_checkout: this.showInput,
        email_address_checkout: this.formAddReservation.otherInformation.emailAddressCheckout,
        access_guest_portal: this.formAddReservation.otherInformation.accessToGuestPortal,
        suppress_rate_registration_card: this.formAddReservation.otherInformation.suppressRateOnRegistrationCard,
        room_charges: this.paymentData.roomCharges,
        taxes: this.paymentData.taxes,
        total_amount: this.paymentData.totalAmount,
        due_amount: this.paymentData.dueAmount,
        bill_to: this.paymentData.billTo,
        tax_exempt: this.paymentData.taxExempt,
        payment_mode: this.paymentData.paymentMode,
        payment_method: this.paymentData.paymentMethod,
        selected_payment_method: this.paymentData.selectedPaymentMethod
      };
      console.log(bookingData);



      // If no errors, send the data to the server
      try {
        const response = await postAddReservationData(bookingData);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Reservation submitted successfully.",
          confirmButtonText: "OK",
        }).then(() =>
        {
          // Navigate to index.vue (or a route associated with it)
          this.$router.push({ name: 'index' }); // Replace 'index' with the actual route name
        });

      } catch (error) {
        // Handle the error response from the server
        // Check if there are validation errors from the server in the response
        if (error.response && error.response.data && error.response.data.errors) {
          // Join the validation errors into a single string
          const validationErrors = error.response.data.errors.join(', ');

          // Show the validation errors in the SweetAlert
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: validationErrors,
            confirmButtonText: "OK",
          });
        } else {
          // Show a generic error message if there are no specific validation errors
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an issue submitting the booking. Please try again.",
            confirmButtonText: "OK",
          });
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
        bookingSource: '',
        reservationType: '',
        adults: '',
        children: '',
        rateAmount: '',
        rateType: '',
      };
    },
    formatDate (date)
    {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },

    formatTime (date)
    {
      return date.toTimeString().slice(0, 5);
    },
    goBack ()
    {
      this.$router.go(-1);
    },
    spliceSelectedResourceName ()
    {
      if (this.selectedResourceName) {
        // Split the selectedResourceName by ' - ' to get unit and roomType
        const [unitWithPrefix, room] = this.selectedResourceName.split(' - ');

        // The unit with the prefix remains as it is, and room is assigned as roomType
        const roomType = room || '';  // Default to empty if room is missing
        const unit = unitWithPrefix.trim();  // Keep 'UNIT-' part intact

        // Extract the ID part after 'ID: '
        const idPart = this.selectedResourceName.split('ID: ')[1] || '';

        // Split the ID part into two values (21 and 1 in this case)
        const [unitTypeId, unitId] = idPart.split('-');

        // Assign values to formAddReservation
        this.formAddReservation.units[0].roomType = roomType;
        this.formAddReservation.units[0].room = unit;

        // Assign the separate ID parts to the form (unitTypeId = 21, unitId = 1)
        this.formAddReservation.units[0].unitTypeId = unitTypeId || ''; // 21
        this.formAddReservation.units[0].unitId = unitId || ''; // 1

        // For display, you can combine unit and roomType
        this.selectedResourceNameForDisplay = `${unit} - ${roomType}`;
      }
    },
    formatRateAmount ()
    {
      const value = this.formAddReservation.units[0].rateAmount;
      if (isNaN(value) || value < 0) {
        this.validationMessages.rateAmount = "Rate amount must be a positive number.";
        this.formAddReservation.units[0].rateAmount = 0;
      } else {
        this.validationMessages.rateAmount = "";
        // Format the value to two decimal places
        this.formAddReservation.units[0].rateAmount = parseFloat(value).toFixed(2);
      }
    },


    async handleSearch ()
    {
      this.currentPage = 1
      this.searchQuery = this.formAddReservation.guestInformation.name
      await this.fetchNames()
    },

    async fetchNames ()
    {
      if (this.isLoading) return

      this.isLoading = true
      try {
        const response = await getGuestsInfo({
          params: {
            query: this.searchQuery,
            page: this.currentPage,
            perPage: 10
          }
        })

        if (this.currentPage === 1) {
          this.filteredNames = response.data.data
        } else {
          this.filteredNames = [...this.filteredNames, ...response.data.data]
        }

        this.totalPages = response.data.last_page
        this.hasMore = this.currentPage < this.totalPages
      } catch (error) {
        console.error('Error fetching names:', error)
      } finally {
        this.isLoading = false
      }
    },

    handleScroll (event)
    {
      const element = event.target
      const bottom = element.scrollHeight - element.scrollTop === element.clientHeight
      if (bottom && this.hasMore && !this.isLoading) {
        this.currentPage++
        this.fetchNames()
      }
    },

    selectName (name)
    {
      this.formAddReservation.guestInformation.name = name.name
      this.showDropdown = false
      this.selectedNameId = name.id;

      // Optionally fetch other guest details if needed
    },

    handleBlur ()
    {
      setTimeout(() =>
      {
        this.showDropdown = false
      }, 200)
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
        unitTypesResponse,
      ] = await Promise.all([
        getBusinessSources(),
        getBookingSources(),
        getReservationTypes(),
        getGuestsInfo(),
        getUnitTypes(),
      ]);

      this.businessSources = businessSourcesResponse.data.data;
      this.bookingSources = bookingSourcesResponse.data.data;
      this.reservationTypes = reservationTypesResponse.data.data;
      this.filteredNames = usersResponse.data.data;
      this.unitsTypes =unitTypesResponse.data;
    } catch (error) {
      console.error("Error loading data:", error);
    }
    this.spliceSelectedResourceName();

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
              this.formAddReservation.checkInDate = this.formatDate(selectedDates[0]);
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
              this.formAddReservation.checkOutDate = this.formatDate(selectedDates[0]);
            }
          }
        });

        // Set initial values
        this.formAddReservation.checkInDate = this.formatDate(this.firstDate);
        this.formAddReservation.checkOutDate = this.formatDate(this.lastDate);


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
    formattedRateAmount: {
      get ()
      {
        // Safely handle undefined or null values by defaulting to 0
        const rateAmount = this.formAddReservation.units[0].rateAmount || 0;
        return Number(rateAmount).toFixed(2); // Ensure it's a number before applying toFixed
      },
      set (value)
      {
        // Strip non-numeric characters except for the decimal point
        const sanitizedValue = value.replace(/[^0-9.]/g, '');
        this.formAddReservation.units[0].rateAmount = parseFloat(sanitizedValue) || 0;
      }
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
      const [checkInYear, checkInMonth, checkInDay] = this.formAddReservation.checkInDate.split('-');
      const [checkOutYear, checkOutMonth, checkOutDay] = this.formAddReservation.checkOutDate.split('-');

      const checkIn = new Date(checkInYear, checkInMonth - 1, checkInDay);
      const checkOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);

      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },


  },
  beforeDestroy ()
  {
    this.datePicker1Instance?.destroy();
    this.datePicker2Instance?.destroy();
    this.timePicker1Instance?.destroy();
    this.timePicker2Instance?.destroy();

    // console.log('Component is being destroyed:', this.formAddReservation.units);


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
  mixins: [flatpickrMixin],
  props: {
    selectedDates: {
      type: Array,
      required: true,


    },
    selectedResourceName: {
      type: String,
      required: true,


    },
    paymentData: {
      type: Object,
      required: true,
    },
  },
  middleware: 'restrict-access', // Apply the middleware

};
</script>

<style scoped></style>
