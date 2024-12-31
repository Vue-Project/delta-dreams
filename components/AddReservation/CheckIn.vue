<template>
  <section class="checkIn">
    <div class="card">
      <h5 class="card-header">
        <NuxtLink to="/"><i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d"></i>
        </NuxtLink>
        Add Reservation
      </h5>
      <hr class="m-0" />
      <div class="card-body">
        <form id="formValidationReservation" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework mt-1">
          <!--  ! Reservation  Details -->
          <!-- change in size and icons -->
          <div class="row">
            <div class="col-md-8">
              <div class="row align-items-center">
                <!-- Date Picker-->
                <div class="col-md-3 col-12 px-0">
                  <label for="flatpickr-date-01" class="form-label">Check-in</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-01" ref="datePicker1" />
                  <i class="fa-solid fa-calendar-days icon-date"></i>
                </div>
                <!-- Date Picker -->
                <!-- Time Picker-->
                <div class="col-md-3 col-12 px-0">
                  <div class="input-group mt-4">
                    <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-01" ref="timePicker1" aria-label="input Text to Time" />
                    <i class="fa-regular fa-clock icon-time"></i>
                    <span class="input-group-text total-nights" id="basic-addon13">4 nights</span>
                  </div>
                </div>
                <!-- Time Picker-->
                <!-- Date Picker-->
                <div class="col-md-3 col-12 px-0">
                  <label for="flatpickr-date-02" class="form-label ms-3">Check-out</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-02" ref="datePicker2" />
                  <i class="fa-solid fa-calendar-days icon-date"></i>
                </div>
                <!-- /Date Picker -->
                <!-- Time Picker-->
                <div class="col-md-3 col-12 mt-4 px-0">
                  <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-02" ref="timePicker2" aria-label="close" />
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
                  <select class="form-select" id="reservationType" v-model="selectedOptionReservation">
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
                    <select class="form-select" id="bookingSource" v-model="selectedOptionBooking">
                      <option disabled value="">Select</option>
                      <option v-for="source in bookingSources" :key="source.id" :value="source.id">
                        {{ source.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="businessSource" class="form-label">Business Source</label>
                    <select class="form-select" id="businessSource" v-model="selectedOptionBusiness">
                      <option disabled value="">Select</option>
                      <option v-for="source in businessSources" :key="source.id" :value="source.id">
                        {{ source.name }}
                      </option>
                    </select>
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
                  <div class="col-md-4 rateOffer">Rate Offered:</div>
                  <div class="col-md-8">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedContract" disabled />
                      <label class="form-check-label" for="rateOfferedContract">Contract</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedBookAll" />
                      <label class="form-check-label" for="rateOfferedBookAll">Book All Available Rooms</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedQuickGroup" />
                      <label class="form-check-label" for="rateOfferedQuickGroup">Quick Group Booking</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedComplimentary" />
                      <label class="form-check-label" for="rateOfferedComplimentary">Complimentary Room</label>
                    </div>
                  </div>
                </div>
              </div>
              <!--  ! table Header -->
              <!-- change width delete border color  -->
              <div class="card mt-3 border-0">
                <div class="card-datatable table-responsive">
                  <table class="datatables-projects table overflow-hidden">
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
                          <select :id="'form-repeater-0-' + index + '-1'" class="form-select" v-model="item.roomType">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-2'" class="form-select" v-model="item.rateType">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-3'" class="form-select" v-model="item.room">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-4'" class="form-select" v-model="item.adult">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <select :id="'form-repeater-0-' + index + '-5'" class="form-select" v-model="item.child">
                            <option value="Designer">Designer</option>
                            <option value="Developer">Developer</option>
                            <option value="Tester">Tester</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>
                          <div class="row">
                            <div class="col-md-10">
                              <select :id="'form-repeater-0-' + index + '-6'" class="form-select" v-model="item.rate">
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
                    <tfoot>
                      <!--change style button  -->
                      <button class="btn btn-primary waves-effect waves-light mt-3" type="button" @click="addItem">
                        Add Room
                      </button>
                    </tfoot>
                    <!--  ! table footer -->
                  </table>
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
                      <input type="text" placeholder="YYYY-MM-DD" id="flatpickr-date-03" class="form-control flatpickr-input" ref="datePicker3" />
                      <i class="fa-solid fa-calendar-days icon-date"></i>
                    </div>
                    <div class="col-md-6 col-12 px-0 mt">
                      <input type="text" placeholder="HH:MM" id="flatpickr-time-03" class="form-control flatpickr-input" ref="timePicker3" aria-label="input Text to Time" />
                      <i class="fa-regular fa-clock icon-time right"></i>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <label for="releaseTerm" class="form-label">Release Term</label>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Value" id="releaseTerm" />
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
                    <input type="number" class="form-control" placeholder="0" id="releaseTerm" />
                    <span class="input-group-text groupStyle">Days</span>
                  </div>
                </div>
                <div class="col-md-8 col-12">
                  <div class="d-flex mt-4">
                    <div class="form-check mr-2">
                      <input type="radio" id="hold-release" name="optionRadioDate" class="form-check-input" />
                      <label class="form-check-label" for="hold-release">Hold Release Date</label>
                    </div>
                    <div class="form-check">
                      <input type="radio" id="arrival-date" name="optionRadioDate" class="form-check-input" />
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
                <select class="form-select" v-model="selectedTitle">
                  <option value="" disabled>MR.</option>
                  <option v-for="title in titles" :key="title" :value="title">
                    {{ title }}
                  </option>
                </select>

                <div class="position-relative flex-grow-1">
                  <input type="text" class="form-control w-100" v-model="inputValue" @input="handleInput" @focus="showDropdown = true" @blur="handleBlur" />

                  <!-- Suggestions Dropdown -->
                  <div v-if="showDropdown && filteredNames.length > 0" class="position-absolute w-100 mt-1 bg-white border rounded shadow">
                    <div v-for="name in filteredNames" :key="typeof name === 'object' ? name.id : name" class="p-2 cursor-pointer hover:bg-light" @mousedown.prevent="selectName(name)">
                      {{ typeof name === "object" ? name.name : name }}
                    </div>
                  </div>
                </div>

                <button class="btn btn-outline-primary waves-effect" type="button" @click="toggleSidebar">
                  <i class="fa-solid fa-user-plus"></i>
                </button>
              </div>
              <SidebarAddGuest :is-sidebar-open="isSidebarOpen" @close-sidebar="toggleSidebar" />
            </div>
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-6">
                  <label for="emailGuest" class="col-form-label">Email</label>
                  <input class="form-control" type="email" id="emailGuest" placeholder="Email" />
                </div>
                <div class="col-md-6">
                  <div class="mb-3 row">
                    <label for="mobileGuest" class="col-form-label">Mobile</label>
                    <input class="form-control" type="tel" id="mobileGuest" placeholder="Mobile" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <label for="addressGuest" class="col-form-label">Address</label>
              <input class="form-control" type="text" id="addressGuest" placeholder="Address" />
            </div>
            <div class="row">
              <div class="col-md-3">
                <label for="countryGuest" class="col-form-label">Country</label>
                <input class="form-control" type="text" id="countryGuest" placeholder="country" />
              </div>
              <div class="col-md-3">
                <label for="stateGuest" class="col-form-label">State</label>
                <input class="form-control" type="text" id="stateGuest" placeholder="state" />
              </div>
              <div class="col-md-3">
                <label for="cityGuest" class="col-form-label">City</label>
                <input class="form-control" type="text" id="cityGuest" placeholder="city" />
              </div>
              <div class="col-md-3">
                <label for="ZipGuest" class="col-form-label">Zip</label>
                <input class="form-control" type="text" id="ZipGuest" placeholder="Zip" />
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
              vwv
            </div>
          </div>
          <!--  ! Other Information -->
          <hr class="my-4" />
          <div class="row">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-lg btn-secondary waves-effect waves-light">
                Cancel
              </button>
              <button type="button" class="btn btn-lg btn-primary waves-effect waves-light">
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
import
{
  getBookingSources,
  getBusinessSources,
  getReservationTypes,
  getUsers,
} from "../Api/api";
import flatpickrMixin from "../Mixin/flatpickrMixin";
import SidebarAddGuest from "../layout/Sidebar.vue";

export default {
  name: "CheckIn",
  layout: "component",
  components: { SidebarAddGuest },

  data ()
  {
    return {
      roomCount: 1, // Default number of rooms
      showSelect: false,
      showInput: false,
      isSidebarOpen: false,
      businessSources: [],
      bookingSources: [],
      reservationTypes: [],
      users: [],
      selectedOptionBusiness: "",
      selectedOptionBooking: "",
      selectedOptionReservation: "",
      selectedOptionUser: "",
      selectedTitle: "MR.",
      inputValue: "",
      showDropdown: false,
      titles: ["MR.", "DR.", "JN.", "MAM.", "MRS.", "MS.", "SIR.", "SR."],
      names: [],

      formData: [
        {
          rooms: 1,
        },
      ],
      existingItemsCount: 1,
    };
  },
  watch: {
    roomCount ()
    {
      this.updateRepeater();
    },
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
  },
  mixins: [flatpickrMixin],
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.hover\:bg-light:hover {
  background-color: #f8f9fa;
}

.position-absolute {
  position: absolute;
  z-index: 9999;
}
</style>
