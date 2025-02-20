<template>
  <section class="update-reservations">
    <!-- MAIN CARD CONTAINER -->

    <div class="card">
      <!-- CARD HEADER -->
      <h5 class="card-header">

        Update Reservation
      </h5>
      <hr class="m-0" />
      <!-- FORM CONTAINER -->
      <div class="card-body">

        <form id="formReservation" class=" g-3" @submit.prevent="FormUpdateReservation" ref="emptyForm">
          <!-- *************************** -->
          <!-- RESERVATION DETAILS SECTION -->
          <!-- *************************** -->

          <div class="row">
            <!-- DATE/TIME SELECTION -->
            <div class="col-md-8">
              <div class="row align-items-center">
                <!-- CHECK-IN DATE/TIME -->

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
                    <span class="input-group-text total-nights bg-primary" id="basic-addon13">{{ totalNights }} Nights</span>
                  </div>
                </div>

                <!-- CHECK-OUT DATE/TIME -->
                <div class="col-md-3 col-12 px-0">
                  <label for="flatpickr-date-02" class="form-label ms-3">Check-out</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-02" ref="datePicker2" v-model="formAddReservation.checkOutDate" aria-label="input Text to Check-out Date" />
                  <i class="fa-solid fa-calendar-days icon-date"></i>
                </div>

                <div class="col-md-3 col-12 mt-4 px-0">
                  <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-02" ref="timePicker2" v-model="formAddReservation.checkOutTime" aria-label="input Text to Check-out Time" />
                  <i class="fa-regular fa-clock icon-time right"></i>
                </div>
              </div>

            </div>
            <!-- ROOM & RESERVATION TYPE -->

            <div class="col-md-4">
              <div class="row">
                <!-- <div class="col-md-3 col-12">
                  <label for="roomCount" class="form-label">Room(s)</label>
                  <input class="form-control" type="number" id="roomCount" v-model="roomCount" min="1" @input="updateRepeater" />
                </div> -->
                <!-- ROOM & RESERVATION TYPE -->

                <div class="col-md-3 col-12">
                  <label for="roomCount" class="form-label">Room(s)</label>
                  <input class="form-control" type="number" id="roomCount" v-model="formAddReservation.numberRooms" min="1" max="10" @input="updateRepeater" disabled />
                </div>

                <!-- Room details repeater -->


                <!-- RESERVATION TYPE DROPDOWN -->

                <div class="col-lg-9 col-12 mb-4 col-md-6 ps-sm-2 p-0 pe-md-0">
                  <label for="reservationType" class="form-label">Reservation Type</label>
                  <select class="form-select" id="reservationType" v-model="formAddReservation.reservationType" ref="reservationType" :class="{ 'input-error': validationMessages.reservationType }">
                    <option disabled value="">Select</option>
                    <option v-for="(type, index) in getReservationTypes" :key="index" :value="type">
                      {{ type }}
                    </option>
                  </select>
                  <span v-if="validationMessages.reservationType" class="error-message">{{ validationMessages.reservationType }}</span>

                </div>
              </div>
            </div>
            <div class="row">
              <!-- BOOKING SOURCE SELECTION -->

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
                  <!-- BUSINESS SOURCE SELECTION -->

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
          <!-- *********************** -->
          <!-- RATE OFFERED SECTION -->
          <!-- *********************** -->
          <div class="row mb-3">
            <div class="row">
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
                      <tr v-for="(item, index) in formAddReservation.units" :key="index" class="mb-2 selectStyle">
                        <td>
                          <select class="form-select" id="unitsTypes" v-model="item.roomType" @change="() => handleUnitTypeChange(index, item.roomType)" :disabled="index > 0">
                            <option disabled value="">Select</option>
                            <option v-for="unitType in unitsTypes" :key="unitType.id" :value="unitType.id">
                              {{ unitType.name }}
                            </option>
                          </select>
                        </td>
                        <td>
                          <select class="form-select" v-model="item.rateType" ref="rateType" :class="{ 'input-error': validationMessages.rateType }" :disabled="index > 0">
                            <option disabled value="">select</option>
                            <option v-for="(type, index) in getRateTypes" :key="index" :value="index">
                              {{ type }}
                            </option>
                          </select>
                          <span class="error-message" v-if="validationMessages.rateType">{{ validationMessages.rateType }}</span>
                        </td>
                        <td>
                          <select class="form-select" v-model="item.unitId" :disabled="!availableUnitsByRoom[index]?.length || index > 0">
                            <option disabled value="">Select Unit</option>
                            <option v-for="unit in availableUnitsByRoom[index] || []" :key="unit.id" :value="unit.id">
                              {{ unit.code }}
                            </option>
                          </select>
                        </td>
                        <td>
                          <input type="number" class="form-control" v-model="item.adults" placeholder="1" aria-label="1" min="1" max="10" ref="adults" :class="{ 'input-error': validationMessages.adults }" :disabled="index > 0" />
                          <span class="error-message" v-if="validationMessages.adults">{{ validationMessages.adults }}</span>
                        </td>
                        <td>
                          <input type="number" class="form-control" v-model="item.children" placeholder="1" aria-label="1" value="1" min="1" max="10" ref="children" :class="{ 'input-error': validationMessages.children }" :disabled="index > 0" />
                          <span class="error-message" v-if="validationMessages.children">{{ validationMessages.children }}</span>
                        </td>
                        <td>
                          <div class="row">
                            <div class="col-lg-10">
                              <div class="input-group">
                                <input
                                  @change="(value) => $emit('change', value.target.value)"
                                  class="form-control"
                                  placeholder="0.00"
                                  id="rateAmount"
                                  v-model="item.rateAmount"
                                  aria-label="number of rateAmount"
                                  ref="rateAmount"
                                  :class="{ 'input-error': validationMessages.rateAmount }"
                                  :disabled="index > 0"
                                />
                                <span class="input-group-text groupStyle">EGP</span>
                              </div>
                              <span class="error-message" v-if="validationMessages.rateAmount">{{ validationMessages.rateAmount }}</span>
                            </div>
                            <div class="col-md-2 p-0 d-flex">
                              <button
                                class="btn btn-label-danger"
                                type="button"
                                v-if="index > 0"
                                @click="cancelReservation(index)"
                              >
                                <i class="fa-solid fa-xmark"></i>
                              </button>
                              <button
                                class="btn btn-label-info ml-2"
                                type="button"
                                v-if="index > 0"
                                @click="navigateToEditReservation(item.reservationId)"
                              >
                                <i class="fa-regular fa-pen-to-square me-1"></i>
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
                  <!-- <button class="btn btn-primary waves-effect waves-light mt-3" type="button" @click="addItem">
                    Add Unit
                  </button> -->
                </div>
              </div>
            </div>

            <!-- ROOM ALLOCATION TABLE -->

          </div>
          <hr class="my-4" />
          <!-- *************************** -->
          <!-- RATE OFFERED SECTION -->
          <!-- *********************** -->

          <!-- HOLD RELEASE SECTION -->
          <!-- *************************** -->
          <div class="row">
            <div class="col-md-5">
              <!-- HOLD RELEASE DATE/TIME -->

              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12 col-xl-6 col-12 px-0">
                      <label for="flatpickr-date-03" class="form-label">Hold Release Date & Time</label>
                      <input type="text" placeholder="YYYY-MM-DD" id="flatpickr-date-03" class="form-control flatpickr-input" ref="datePicker3" v-model="formAddReservation.releaseDate" />
                      <i class="fa-solid fa-calendar-days icon-date"></i>
                    </div>
                    <div class="col-md-12 col-xl-6 col-12 px-0 mt">
                      <input type="text" placeholder="HH:MM" id="flatpickr-time-03" class="form-control flatpickr-input" ref="timePicker3" aria-label="input Text to Time" v-model="formAddReservation.releaseTime" />
                      <i class="fa-regular fa-clock icon-time right"></i>
                    </div>
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
                <div class="col-lg-8 col-12">
                  <label for="remindGuestType" class="form-label">Remind Guest Type</label>
                  <select class="form-select" v-model="formAddReservation.remindGuestType">
                    <option disabled value="">Select Remind Guest Type</option>
                    <option v-for="(remindGuestType, index) in getRemindGuestType" :key="index" :value="index">
                      {{ remindGuestType }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-4" />
          <!-- *************************** -->
          <!-- GUEST INFORMATION SECTION -->
          <!-- *************************** -->
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

              </div>
              <span class="error-message" v-if="validationMessages.name">{{ validationMessages.name }}</span>


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
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">
                  <label for="addressGuest" class="col-form-label">Address</label>
                  <input class="form-control" type="text" id="addressGuest" placeholder="Address" v-model="formAddReservation.guestInformation.address" />
                </div>
                <div class="col-md-4">
                  <label for="insurance" class="col-form-label">Insurance</label>
                  <input class="form-control" type="text" id="insurance" placeholder="insurance" v-model="formAddReservation.BillingSummary.insurance" />
                </div>
                <div class="col-md-4">
                  <label for="insurance_by" class="col-form-label">Insurance_by</label>
                  <select class="form-select" id="paymentInsuranceBy" v-model="formAddReservation.BillingSummary.insurance_by">
                    <option disabled value="">Select</option>
                    <option v-for="account in accounts" :key="account.id" :value="account.id">
                      {{ account.name }}
                    </option>
                  </select>
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-md-3">

                <label for="countryGuest" class="col-form-label">Country</label>
                <select class="form-select" v-model="formAddReservation.guestInformation.country" :class="{ 'input-error': validationMessages.country }">
                  <option disabled value="">Select Country</option>
                  <option v-for="(country, index) in getCountries" :key="index" :value="index">
                    {{ country }}
                  </option>
                </select>

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
          <!-- *************************** -->
          <!-- BILLING SUMMARY SECTION -->
          <!-- *************************** -->
          <hr class="my-4" />

          <h6 class="mb-3">BillingSummary</h6>
          <div class="row">
            <div class="col-md-4">
              <li class="mb-4 pb-1 d-flex justify-content-between align-items-center">
                <div class="badge bg-label-success rounded p-2"><i class="fa-solid fa-money-bills"></i></div>
                <div class="d-flex justify-content-between w-100 flex-wrap">
                  <h6 class="mb-0 ms-3">Total</h6>
                  <div class="d-flex">
                    <p class="mb-0 fw-medium">{{ formAddReservation.BillingSummary.total || 0 }}</p>
                    <!-- <p class="ms-3 text-success mb-0">0.3%</p> -->
                  </div>
                </div>
              </li>
            </div>
            <div class="col-md-4">
              <li class="mb-4 pb-1 d-flex justify-content-between align-items-center">
                <div class="badge bg-label-secondary  rounded p-2"><i class="fa-solid fa-money-check"></i></div>
                <div class="d-flex justify-content-between w-100 flex-wrap">
                  <h6 class="mb-0 ms-3">Paid</h6>
                  <div class="d-flex">
                    <p class="mb-0 fw-medium">{{ formAddReservation.BillingSummary.paid || 0 }}</p>
                    <!-- <p class="ms-3 text-success mb-0">0.3%</p> -->
                  </div>
                </div>
              </li>
            </div>
            <div class="col-md-4">
              <li class="mb-4 pb-1 d-flex justify-content-between align-items-center">
                <div class="badge bg-label-danger  rounded p-2"><i class="fa-solid fa-dollar-sign"></i></div>
                <div class="d-flex justify-content-between w-100 flex-wrap">
                  <h6 class="mb-0 ms-3">Remaining</h6>
                  <div class="d-flex">
                    <p class="mb-0 fw-medium">{{ formAddReservation.BillingSummary.remaining || 0 }}</p>
                    <!-- <p class="ms-3 text-success mb-0">0.3%</p> -->
                  </div>
                </div>
              </li>
            </div>

          </div>
          <hr class="my-4" />
          <!-- FORM SUBMISSION BUTTON -->
          <div class="row">
            <div class="col-12 text-end">

              <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import
{
  getBookingSources,
  getBusinessSources,
  getGuestsInfo,
  PutUpdateReservation,
  getUnits,
  getUnitTypes,
  getAccounts
} from "../../../Api/addResvertionApi";
import flatpickrMixin from "../../Mixin/flatpickrMixin";
import { dateMixin } from '../../Mixin/DateMixin';
import { showSuccessAlert, handleSubmissionError, showConfirmationAlert } from '../../../Api/MassageValidation/alertUtilities';
import { mapState, mapGetters } from 'vuex';
import { postCancelReservation } from "../../../Api/editResvertion";


export default {
  name: "updateReservation",
  layout: "component",
  middleware: 'restrict-access', // Apply the middleware
  mixins: [flatpickrMixin, dateMixin],
  props: {
    reservationId: {
      type: [String, Number],
      required: true, // Ensure the prop is provided
    },
    reservationData: {
      type: Object,
      default: () => ({})
    }
  },

  // ======================
  // Component Data
  // ======================
  data ()
  {
    return {
      testing: [],

      // UI State
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

      // API Data
      businessSources: [],
      bookingSources: [],
      reservationTypes: [],
      filteredNames: [],
      unitsTypes: [],
      availableUnits: [],
      accounts: [],
      selectedUnit: '',

      // Form Data
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
          rateType: "",
          room: "",
          adults: "",
          children: "",
          rateAmount: "",
          roomType: "",
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
          emailBookingOption: '',
          emailAddressCheckout: '',
          accessToGuestPortal: false,
          suppressRateOnRegistrationCard: false,
        },
        BillingSummary: {
          total: "",
          paid: "",
          remaining: "",
          insurance: "",
          insurance_by: "",
          // billTo: "",
          // roomCharges: "",
          // taxes: "",
          // dueAmount: "",
          // CashAndBank: false,
          // CityLedger: false,
          // payMentUser: ""
        },
      },

      // Validation Messages
      validationMessages: {
        businessSource: '',
        reservationType: '',
        name: '',
        mobile: '',
        adults: '',
        children: '',
        rateType: '',
      },

      // Guest Information
      selectedNameId: null, // ID to send to the server
      showDropdown: false,
      filteredNames: [], // List of objects with { id, name }
      currentPage: 1,
      totalPages: 1,
      hasMore: false,
      isLoading: false,
      searchQuery: '',
      availableUnitsByRoom: [], // Add this line to initialize the array
    };
  },


  // ======================
  // Methods - Form Handling
  // ======================
  methods: {

    updateRepeater ()
    {
      const currentCount = this.formAddReservation.units.length;
      const targetCount = parseInt(this.formAddReservation.numberRooms);

      if (currentCount < targetCount) {
        // Get the first room's data as a template
        const firstRoom = this.formAddReservation.units[0];

        // Add new units
        for (let i = currentCount; i < targetCount; i++) {
          const newRoom = {
            roomType: firstRoom.roomType,
            rateType: firstRoom.rateType,
            unitId: "", // Leave empty as it needs to be unique
            adults: firstRoom.adults,
            children: firstRoom.children,
            rateAmount: firstRoom.rateAmount
          };

          this.formAddReservation.units.push(newRoom);
          this.$set(this.availableUnitsByRoom, i, []);

          if (newRoom.roomType) {
            this.handleUnitTypeChange(i, newRoom.roomType);
          }
        }
      } else if (currentCount > targetCount) {
        // Remove excess units
        this.formAddReservation.units.splice(targetCount);
        this.availableUnitsByRoom.splice(targetCount);
      }
    },
    addItem ()
    {
      // Get the unitTypeId from the first unit
      const firstUnitTypeId = this.formAddReservation.units[0]?.unitTypeId;

      const newRoom = {
        roomType: "",
        rateType: "",
        unitId: "",
        adults: "",
        children: "",
        rateAmount: "",
        unitTypeId: firstUnitTypeId, // Set the unitTypeId from the first unit
      };

      this.formAddReservation.units.push(newRoom);
      const newIndex = this.formAddReservation.units.length - 1;

      this.$set(this.availableUnitsByRoom, newIndex, []);
      this.formAddReservation.numberRooms = this.formAddReservation.units.length.toString();
    },
    removeItem (index)
    {
      if (this.formAddReservation.units.length > 1) {
        this.formAddReservation.units.splice(index, 1);
        this.availableUnitsByRoom.splice(index, 1);
        this.formAddReservation.numberRooms = this.formAddReservation.units.length.toString();
      }
    },
    // Submit form and validate fields
    async FormUpdateReservation ()
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

      this.resetValidationMessages();
      let hasError = false;

      // Validate required fields
      for (const { field, message } of requiredFields) {
        let value;
        if (["adults", "children", "rateType", "rateAmount"].includes(field)) {
          value = this.formAddReservation.units[0]?.[field];
        } else if (field === "name" || field === "mobile") {
          value = this.formAddReservation.guestInformation[field];
        } else {
          value = this.formAddReservation[field];
        }

        if (!value) {
          hasError = true;
          this.$set(this.validationMessages, field, message);
        } else {
          this.$delete(this.validationMessages, field);
        }
      }

      if (hasError) return;

      // Prepare API payload
      const bookingData = {
        checkin_date: this.formAddReservation.checkInDate,
        checkin_time: this.formAddReservation.checkInTime,
        checkout_date: this.formAddReservation.checkOutDate,
        checkout_time: this.formAddReservation.checkOutTime,
        rooms: this.formAddReservation.numberRooms,
        booking_source_id: this.formAddReservation.bookingSource,
        business_source_id: this.formAddReservation.businessSource,
        reservation_type: this.formAddReservation.reservationType,
        units: [{
          unit_id: this.formAddReservation.units[0].unitId,
          unit_type_id: this.formAddReservation.units[0].roomType,
          rate_type: this.formAddReservation.units[0].rateType,
          adults: this.formAddReservation.units[0].adults,
          children: this.formAddReservation.units[0].children,
          rate_amount: this.formAddReservation.units[0].rateAmount,
        }],
        is_quick_group_booking: this.formAddReservation.rateOffered.quickGroup,
        is_complimentary: this.formAddReservation.rateOffered.complimentaryRoom,
        book_all_available: this.formAddReservation.rateOffered.bookAll,
        hold_release_date: this.formAddReservation.releaseDate,
        hold_release_time: this.formAddReservation.releaseTime,
        release_term_value: this.formAddReservation.releaseTermValue || 24,
        release_term_type: this.formAddReservation.releaseTerm || "24 hours",
        remind_before_days: this.formAddReservation.remindGuest,
        client_id: this.selectedNameId,
        mobile: this.formAddReservation.guestInformation.mobile,
        address: this.formAddReservation.guestInformation.address,
        country: this.formAddReservation.guestInformation.country,
        state: this.formAddReservation.guestInformation.state,
        city: this.formAddReservation.guestInformation.city,
        zip_code: this.formAddReservation.guestInformation.zip,
        // email_booking: this.showSelect,
        // email_booking_option: this.formAddReservation.otherInformation.emailBookingOption,
        // send_email_checkout: this.showInput,
        // email_address_checkout: this.formAddReservation.otherInformation.emailAddressCheckout,
        // access_guest_portal: this.formAddReservation.otherInformation.accessToGuestPortal,
        // suppress_rate_registration_card: this.formAddReservation.otherInformation.suppressRateOnRegistrationCard,
        // room_charges: this.formAddReservation.BillingSummary.roomCharges,
        // taxes: this.formAddReservation.BillingSummary.taxes,
        // due_amount: this.formAddReservation.BillingSummary.dueAmount,
        // bill_to: this.formAddReservation.BillingSummary.billTo,
        // payment_method_cash: this.formAddReservation.BillingSummary.CashAndBank,
        // payment_method_city: this.formAddReservation.BillingSummary.CityLedger,
        // selected_payment_method: this.formAddReservation.BillingSummary.payMentUser,
      }


      try {

        const response = await PutUpdateReservation(this.reservationId, bookingData);
        await showSuccessAlert(
          "Reservation submitted successfully!", // Custom message
          this.$router,
          'index' // Route name
        );
      } catch (error) {
        handleSubmissionError(
          error,
          "There was an issue with your reservation." // Custom default error
        );
      }
    }, navigateToEditReservation (id)
    {
      this.$router.push(`/edit-reservation/${id}`);
    },



    // ======================
    // Methods - UI Helpers
    // ======================
    // Reset form to initial state
    resetForm ()
    {
      this.formAddReservation = {
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: '',
        numberRooms: 1,
        bookingSource: null,
        businessSource: null,
        reservationType: null,
        units: [{
          unitId: null,
          unitTypeId: null,
          rateType: null,
          adults: null,
          children: null,
          rateAmount: null
        }],
        guestInformation: {
          name: '',
          mobile: '',
          address: '',
          country: '',
          state: '',
          city: '',
          zip: ''
        },
        rateOffered: {
          quickGroup: false,
          complimentaryRoom: false,
          bookAll: false
        },
        releaseDate: '',
        releaseTime: '',
        releaseTermValue: 24,
        releaseTerm: '24 hours',
        remindGuest: null,
        otherInformation: {
          emailBookingOption: '',
          emailAddressCheckout: '',
          accessToGuestPortal: false,
          suppressRateOnRegistrationCard: false
        },
        BillingSummary: {
          roomCharges: 0,
          taxes: 0,
          totalAmount: 0,
          dueAmount: 0,
          billTo: '',
          CashAndBank: false,
          CityLedger: false,
          payMentUser: null
        }
      };

      this.selectedNameId = null;
      this.showSelect = false;
      this.showInput = false;
      this.resetValidationMessages();
    },

    // Reset validation messages
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

    // ======================
    // Methods - Guest Information
    // ======================
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
    },
    async cancelReservation (index)
    {
      const result = await showConfirmationAlert(
        'Are you sure?',
        "cancel this reservation",
        'Yes, cancel it!'
      );

      if (result.isConfirmed) {
        try {
          const reservationId = this.formAddReservation.units[index].reservationId;
          const response = await postCancelReservation(reservationId);

          // Remove the cancelled reservation from the units array
          const cancelledIndex = this.formAddReservation.units.findIndex(
            unit => unit.reservationId === this.formAddReservation.units[index].reservationId
          );
          if (cancelledIndex > -1) {
            this.formAddReservation.units.splice(cancelledIndex, 1);
          }

          // Update the number of rooms
          this.formAddReservation.numberRooms = this.formAddReservation.units.length.toString();

          // Update availableUnitsByRoom array
          this.availableUnitsByRoom.splice(cancelledIndex, 1);

          // Show success alert
          await showSuccessAlert(
            "Reservation cancelled successfully!"
          );

          // If no more units left, optionally redirect to another page
          if (this.formAddReservation.units.length === 0) {
            this.$router.push('/reservations'); // Adjust the route as needed
          }

        } catch (error) {
          handleSubmissionError(
            error,
            "Failed to cancel reservation"
          );
        }
      }
    },

    // ======================
    // Methods - Rate Handling
    // ======================
    // formatRateAmount ()
    // {
    //   const value = this.formAddReservation.units[0].rateAmount;
    //   if (isNaN(value) || value < 0) {
    //     this.validationMessages.rateAmount = "Rate amount must be a positive number.";
    //     this.formAddReservation.units[0].rateAmount = 0;
    //   } else {
    //     this.validationMessages.rateAmount = "";
    //     this.formAddReservation.units[0].rateAmount = parseFloat(value).toFixed(2);
    //   }
    // },
    fillFormWithReservationData (reservationData)
    {
      if (!reservationData || typeof reservationData !== 'object') {
        console.warn('Invalid reservation data received');
        return;
      }

      // Use spread operator to safely merge data
      this.formAddReservation = {
        ...this.formAddReservation,
        checkInDate: this.formatDateNumber(reservationData.checkin_date || ""),
        checkInTime: reservationData.checkin_time || "",
        checkOutDate: this.formatDateNumber(reservationData.checkout_date || ""),
        checkOutTime: reservationData.checkout_time || "",
        numberRooms: reservationData.rooms || 1,
        reservationType: reservationData.reservation_type_name || "",
        bookingSource: reservationData.booking_source?.id || "",
        businessSource: reservationData.business_source?.id || "",
        units: [
          // First unit with direct reservation data
          {
            rateType: reservationData.rate_type || "",
            adults: reservationData.adults || "",
            children: reservationData.children || "",
            rateAmount: reservationData.unit_price || "",
            unitId: reservationData.unit_id || "",
            roomType: reservationData.unit_type_id || "",
            reservationId: reservationData.id || "",
          },
          // Additional units from children array
          ...(reservationData.childrens || []).map(unit => ({
            rateType: unit.rate_type || "",
            adults: unit.adults || "",
            children: unit.children || "",
            rateAmount: unit?.unit_price || "",
            unitId: unit?.unit_id || "",
            roomType: unit?.unit_type_id || "",
            reservationId: unit.id || "",
          }))
        ],
        rateOffered: {
          contract: Boolean(reservationData.is_contract),
          bookAll: Boolean(reservationData.book_all_available),
          quickGroup: Boolean(reservationData.is_quick_group_booking),
          complimentaryRoom: Boolean(reservationData.is_complimentary),
        },
        releaseDate: this.formatDateNumber(reservationData.hold_release_date) || "",
        releaseTime: reservationData.hold_release_time || "",
        releaseTerm: reservationData.release_term_type || "",
        releaseTermValue: reservationData.release_term_value || "",
        remindGuest: reservationData.remind_before_days || "",
        remindGuestType: reservationData.remind_before_type || "",
        holdRelease: Boolean(reservationData.hold_release),
        arrivalDate: Boolean(reservationData.arrival_date),
        guestInformation: {
          name: reservationData.client?.name || reservationData.user?.name,
          email: reservationData.client?.email || "",
          mobile: reservationData.client?.phone || "",
          address: reservationData.client?.address || "",
          country: reservationData.client?.country || "",
          state: reservationData.client?.state || "",
          city: reservationData.client?.city || "",
          zip: reservationData.client?.zip_code || "",
        },
        BillingSummary: {
          total: reservationData.total || "",
          paid: reservationData.paid || "",
          remaining: reservationData.remaining || "",
          insurance: reservationData.insurance || "",
          insurance_by: reservationData.insurance_by || "",
          // billTo: reservationData.bill_to || "",
          // roomCharges: reservationData.room_charges || "",
          // taxes: reservationData.taxes || "",
          // dueAmount: reservationData.due_amount || "",
          // CashAndBank: Boolean(reservationData.payment_method_cash),
          // CityLedger: Boolean(reservationData.payment_method_city),
          // payMentUser: reservationData.selected_payment_method || "",
        }
      };

      this.selectedNameId = reservationData.client?.id || reservationData.user?.id;

      // Initialize availableUnitsByRoom for each unit
      this.formAddReservation.units.forEach((unit, index) =>
      {
        if (unit.roomType) {
          this.handleUnitTypeChange(index, unit.roomType);
        }
      });
    },
    async handleUnitTypeChange (index, unitTypeId)
    {
      try {
        if (!unitTypeId) {
          this.$set(this.availableUnitsByRoom, index, []);
          return;
        }

        const response = await getUnits(unitTypeId);
        const units = response.data.data;

        this.$set(this.availableUnitsByRoom, index, units);

        // If there's a selected unitId, ensure it's in the available units
        const currentUnit = this.formAddReservation.units[index];
        if (currentUnit.unitId && !units.some(u => u.id === currentUnit.unitId)) {
          // If the current unitId is not in available units, reset it
          currentUnit.unitId = "";
        }

      } catch (error) {
        console.error('Error fetching units:', error);
        this.$set(this.availableUnitsByRoom, index, []);
      }
    }


  },
  // ======================
  // Lifecycle Hooks
  // ======================
  async mounted ()
  {
    try {
      // Fetch initial data for the component
      const [
        businessSourcesResponse,
        bookingSourcesResponse,
        usersResponse,
        unitTypesResponse,
        unitsResponse,
        accountsResponse,// Add this line to fetch units
      ] = await Promise.all([
        getBusinessSources(),
        getBookingSources(),
        getGuestsInfo(),
        getUnitTypes(),
        getUnits(),
        getAccounts(),
      ]);

      this.businessSources = businessSourcesResponse.data.data;
      this.bookingSources = bookingSourcesResponse.data.data;
      this.filteredNames = usersResponse.data.data;
      this.unitsTypes = unitTypesResponse.data.data;
      this.availableUnits = unitsResponse.data.data;
      this.accounts = accountsResponse.data.data;
      // Populate availableUnits with fetched data

      if (this.reservationData) {
        this.fillFormWithReservationData(this.reservationData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },

  // ======================
  // Watchers
  // ======================
  watch: {
    roomCount (newValue)
    {
      this.formAddReservation.numberRooms = newValue;
    },

    // Watch for changes in reservationData.items and update the form data

    reservationData: {
      immediate: true, // This ensures the watcher is triggered immediately when the component is created
      handler (newData)
      {
        if (newData) {
          this.fillFormWithReservationData(newData);
        }
      },
    },
    //  reservationData: {
    //   immediate: true,
    //   handler (newData)
    //   {
    //     if (newData && typeof newData === 'object') {
    //       this.fillFormWithReservationData(newData);
    //     }
    //   }
    // }

    'formAddReservation.numberRooms': {
      immediate: true,
      handler (newValue)
      {
        if (newValue && !isNaN(newValue)) {
          this.updateRepeater();
        }
      }
    },
  },
  // ======================
  // Computed Properties
  // ======================
  computed: {
    // Format rate amount with two decimal places
    // formattedRateAmount: {
    //   get ()
    //   {
    //     const rateAmount = this.formAddReservation.units[0].rateAmount || 0;
    //     return Number(rateAmount).toFixed(2);
    //   },
    //   set (value)
    //   {
    //     const sanitizedValue = value.replace(/[^0-9.]/g, '');
    //     this.formAddReservation.units[0].rateAmount = parseFloat(sanitizedValue) || 0;
    //   }
    // },
    ...mapGetters([
      'getReservationTypes',
      'getRateTypes',
      'getCountries',
      'getRemindGuestType',
    ]),

    // Calculate total nights between check-in and check-out
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


};
</script>
