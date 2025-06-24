<template>
    <section class="checkIn-reservations">
        <div class="card">
            <h5 class="card-header">
                <NuxtLink to="/"><i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d"></i></NuxtLink>
                Add Reservation
            </h5>
            <hr class="m-0" />
            <div class="card-body">
                <form id="formReservation" class="g-3" @submit.prevent="submitAddReservation" ref="emptyForm">
                    <!--  ! Reservation  Details -->
                    <!-- change in size and icons -->

                    <div class="row">
                        <div class="col-lg-8">
                            <div class="row align-items-center">
                                <!-- Check-in Date Picker-->
                                <div class="col-lg-3 col-12 col-md-6 px-0">
                                    <label for="flatpickr-date-01" class="form-label">Check-in</label>
                                    <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" v-model="formAddReservation.checkInDate" aria-label="input Text to Check-in Date" />
                                    <i class="fa-solid fa-calendar-days icon-date"></i>
                                    <!-- <span class="error-message small" v-if="$v.formAddReservation.checkInDate.$error">
                    Check-in date is required
                  </span> -->
                                </div>

                                <!-- Check-in Time Picker-->
                                <div class="col-lg-3 col-12 col-md-6 px-0">
                                    <div class="input-group mt-4">
                                        <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-01" ref="timePicker1" v-model="formAddReservation.checkInTime" aria-label="input Text to Check-in Time" />
                                        <i class="fa-regular fa-clock icon-time"></i>
                                        <span class="input-group-text total-nights bg-primary waves-effect waves-light" id="basic-addon13">{{ totalNights }} Nights</span>
                                    </div>
                                    <!-- <span class="error-message small" v-if="$v.formAddReservation.checkInTime.$error">
                    Check-in time is required
                  </span> -->
                                </div>

                                <!-- Check-out Date Picker-->
                                <div class="col-lg-3 col-12 col-md-6 px-0">
                                    <label for="flatpickr-date-02" class="form-label ms-lg-3">Check-out</label>
                                    <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-02" ref="datePicker2" v-model="formAddReservation.checkOutDate" aria-label="input Text to Check-out Date" />
                                    <i class="fa-solid fa-calendar-days icon-date"></i>
                                    <!-- <span class="error-message small" v-if="$v.formAddReservation.checkOutDate.$error">
                    Check-out date is required
                  </span> -->
                                </div>

                                <!-- Check-out Time Picker-->
                                <div class="col-lg-3 col-12 col-md-6 mt-4 px-0">
                                    <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time-02" ref="timePicker2" v-model="formAddReservation.checkOutTime" aria-label="input Text to Check-out Time" />
                                    <i class="fa-regular fa-clock icon-time right"></i>
                                    <!-- <span class="error-message small" v-if="$v.formAddReservation.checkOutTime.$error">
                    Check-out time is required
                  </span> -->
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 ps-md-0 ps-lg-2 col-12 reservationRoom">
                                    <label for="roomCount" class="form-label">Room(s)</label>
                                    <input class="form-control rounded-2" type="number" id="roomCount" v-model="formAddReservation.numberRooms" min="1" @input="updateRepeater" />
                                </div>

                                <!-- <div class="col-lg-9 col-12 mb-lg-4 ps-md-2 col-md-6 p-0 pe-md-0">
                                    <label for="reservationType" class="form-label">Reservation Type</label>
                                    <select class="form-select" id="reservationType" v-model="formAddReservation.reservationType" ref="reservationType">
                                        <option disabled value="">Select</option>
                                        <option v-for="(type, index) in getReservationTypes" :key="index" :value="index">
                                            {{ type }}
                                        </option>
                                    </select>

                                    <span class="error-message small" v-if="$v.formAddReservation.reservationType.$error">Reservation type is required</span>
                                </div> -->
                            </div>
                        </div>
                        <div class="p-0">
                            <div class="col-lg-6 col-12 mb-4 p-0">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <label for="travelAgent" class="form-label">Travel Agents</label>
                                        <select class="form-select" id="travelAgent" v-model="formAddReservation.travelAgent" ref="travelAgent">
                                            <option value="" disabled>Select</option>
                                            <option v-for="travel in travelAgents" :key="travel.id" :value="travel.id">
                                                {{ travel.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 col-md-6 buisnessSourceInput">
                                        <label for="businessSource" class="form-label">Business Source</label>
                                        <select class="form-select" id="businessSource" v-model="formAddReservation.businessSource" ref="businessSource">
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
                    <div class="mb-3">
                        <div class="row">
                            <!-- <div class="col-lg-4">
                <div class="row">
                  <div class="col-lg-4">Rate Offered:</div>
                  <div class="col-lg-8">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedContract" v-model="formAddReservation.rateOffered.contract" />
                      <label class="form-check-label" for="rateOfferedContract">Contract</label>
                    </div>
                  </div>
                </div>
              </div> -->
                            <!-- <div class="col-lg-8">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedBookAll" v-model="formAddReservation.rateOffered.bookAll" />
                      <label class="form-check-label" for="rateOfferedBookAll">Book All Available Rooms</label>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedQuickGroup" v-model="formAddReservation.rateOffered.quickGroup" />
                      <label class="form-check-label" for="rateOfferedQuickGroup">Quick Group Booking</label>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rateOfferedComplimentary" v-model="formAddReservation.rateOffered.complimentaryRoom" />
                      <label class="form-check-label" for="rateOfferedComplimentary">Complimentary Room</label>
                    </div>
                  </div>
                </div>
              </div> -->
                            <!--  ! table Header -->
                            <!-- change width delete border color  -->
                            <div class="card mt-3 border-0 px-0">
                                <h5 class="card-header p-2">Units Information</h5>

                                <div class="card-datatable table-responsive custom-table-wrapper">
                                    <table class="table overflow-hidden custom-table">
                                        <thead>
                                            <tr class="rounded-1">
                                                <th class="border-0">Project</th>
                                                <th class="border-0">Room Type</th>
                                                <th class="border-0">Rate Type</th>
                                                <th class="border-0">Room</th>
                                                <th class="border-0">
                                                    Adult
                                                    <i class="fa-solid fa-person"></i>
                                                </th>
                                                <th class="border-0">
                                                    Child
                                                    <i class="fa-solid fa-baby"></i>
                                                </th>
                                                <th class="border-0 w-20">Rate(EGP)(Tax Inc.)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in formAddReservation.units" :key="index" class="mb-2 selectStyle">
                                                <td data-label="Project">
                                                    <select class="form-select" :disabled="!datesSelected" v-model="item.projectId" @change="() => handleProjectChange(index, item.projectId)">
                                                        <option disabled value="">Select</option>
                                                        <option v-for="project in getProjects" :key="project.id" :value="project.id">
                                                            {{ project.name }}
                                                        </option>
                                                    </select>
                                                </td>
                                                <td data-label="Room Type">
                                                    <select class="form-select" id="unitsTypes" ref="unitsTypes" v-model="item.roomType" @change="() => handleUnitTypeChange(index, item.roomType, formAddReservation.checkInDate, formAddReservation.checkOutDate)" :disabled="!datesSelected || !filteredUnitTypesByRoom[index]?.length">
                                                        <option disabled value="">Select</option>
                                                        <option v-for="unitType in filteredUnitTypesByRoom[index] || []" :key="unitType.id" :value="unitType.id">
                                                            {{ unitType.name }}
                                                        </option>
                                                    </select>
                                                    <span class="error-message small" v-if="$v.formAddReservation.units.$each[index].roomType.$error">Room type is required</span>
                                                </td>
                                                <td data-label="Rate Type">
                                                    <select class="form-select" v-model="item.rateType" ref="rateType" :disabled="!datesSelected">
                                                        <option disabled value="">select</option>
                                                        <option v-for="(type, index) in getRateTypes" :key="index" :value="index">
                                                            {{ type }}
                                                        </option>
                                                    </select>
                                                    <!-- <span class="error-message small" v-if="$v.formAddReservation.units.$each[index].rateType.$error">Rate type is required</span> -->
                                                </td>
                                                <td data-label="Room">
                                                    <select class="form-select" ref="unitSelect" v-model="item.unitId" :disabled="!datesSelected || !availableUnitsByRoom[index]?.length">
                                                        <option disabled value="">Select Unit</option>
                                                        <option v-for="unit in availableUnitsByRoom[index] || []" :key="unit.id" :value="unit.id">{{ unit.code }}</option>
                                                    </select>
                                                    <span class="error-message small" v-if="$v.formAddReservation.units.$each[index].unitId.$error">Unit is required</span>
                                                </td>
                                                <td data-label="Adult">
                                                    <input type="number" class="form-control rounded-2" v-model="item.adults" placeholder="1" aria-label="1" min="1" max="10" ref="adults" :disabled="!datesSelected" />
                                                    <span class="error-message small" v-if="$v.formAddReservation.units.$each[index].adults.$error">Adults is required</span>
                                                </td>
                                                <td data-label="Child">
                                                    <input type="number" class="form-control rounded-2" v-model="item.children" placeholder="0" aria-label="0" min="0" max="10" ref="children" :disabled="!datesSelected" />
                                                    <span class="error-message small" v-if="$v.formAddReservation.units.$each[index].children.$error">Children is required</span>
                                                </td>
                                                <td data-label="Rate(EGP)(Tax Inc.)">
                                                    <div class="row">
                                                        <div class="col-lg-10">
                                                            <input @change="handleRateChange($event, index)" class="form-control rounded-2" placeholder="0" id="rateAmount" v-model="item.rateAmount" aria-label="number of rateAmount" ref="rateAmount" />
                                                            <span class="error-message small" v-if="$v.formAddReservation.units.$each[index].rateAmount.$error">Rate amount is required</span>
                                                        </div>
                                                        <div class="col-md-2 p-0">
                                                            <button class="btn btn-label-danger" type="button" v-if="index > 0" @click="removeUnit(index)">
                                                                <i class="fa-solid fa-xmark"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button class="btn btn-primary waves-effect waves-light mt-3 ml-4" type="button" @click="addUnit" :disabled="!datesSelected">Add Unit</button>
                                </div>
                            </div>
                            <!-- Services Repeater -->
                            <div class="card mt-3 border-0 px-0">
                                <h5 class="card-header p-2">Units Services</h5>
                                <div class="card-datatable table-responsive custom-table-wrapper">
                                    <table class="table overflow-hidden custom-table">
                                        <thead>
                                            <tr class="rounded-1">
                                                <th class="border-0">Service</th>
                                                <th class="border-0">Price(EGP)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(service, index) in formAddReservation.services" :key="index" class="mb-2 selectStyle">
                                                <td data-label="Service">
                                                    <select class="form-select" v-model="service.serviceId" :disabled="!datesSelected">
                                                        <option disabled value="">Select Service</option>
                                                        <option v-for="service in servicesList" :key="service.id" :value="service.id">
                                                            {{ service.name }}
                                                        </option>
                                                    </select>
                                                </td>

                                                <td data-label="Price(EGP)">
                                                    <div class="row">
                                                        <div class="col-lg-10">
                                                            <input @change="handleServicePriceChange($event, index)" type="number" class="form-control rounded-2" :disabled="!datesSelected" v-model="service.price" placeholder="0" />
                                                        </div>
                                                        <div class="col-md-2 p-0">
                                                            <button class="btn btn-label-danger" type="button" v-if="index > 0" :disabled="!datesSelected" @click="removeService(index)">
                                                                <i class="fa-solid fa-xmark"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button class="btn btn-primary waves-effect waves-light mt-3 ml-4" type="button" :disabled="!datesSelected" @click="addService">Add Service</button>
                                </div>
                            </div>
                            <!--   ! check inputs and repeater -->
                        </div>
                    </div>
                    <!-- <hr class="my-4" /> -->
                    <!--  ! Hold Release Date & Time -->
                    <!-- <div class="row">
            <div class="col-lg-5">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-7 col-12 col-md-6 px-0">
                      <label for="flatpickr-date-03" class="form-label">Hold Release Date & Time</label>
                      <input type="text" placeholder="YYYY-MM-DD" id="flatpickr-date-03" class="form-control flatpickr-input" ref="datePicker3" v-model="formAddReservation.releaseDate" />
                      <i class="fa-solid fa-calendar-days icon-date"></i>
                    </div>
                    <div class="col-lg-5 col-12 col-md-6 px-0 mt">
                      <input type="text" placeholder="HH:MM" id="flatpickr-time-03" class="form-control flatpickr-input" ref="timePicker3" aria-label="input Text to Time" v-model="formAddReservation.releaseTime" />
                      <i class="fa-regular fa-clock icon-time right"></i>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 px-0  px-md-0 px-lg-3 col-12">
                  <label for="releaseTerm" class="form-label">Release Term</label>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Value" id="releaseTerm" v-model="formAddReservation.releaseTerm" />
                    <span class="input-group-text groupStyle">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="row">
                <div class="col-lg-4 px-0 p-md-0 col-12 px-lg-3">
                  <label for="releaseTerm" class="form-label">Remind Guest before</label>
                  <div class="input-group">
                    <input type="number" class="form-control" placeholder="0" id="releaseTerm" v-model="formAddReservation.remindGuest" />
                    <span class="input-group-text groupStyle">Days</span>
                  </div>
                </div>
                <div class="col-lg-8 col-12 px-md-0 ps-lg-0 remindTypeReservation">
                  <label for="remindGuestType" class="form-label">Remind Type before</label>
                  <select class="form-select" v-model="formAddReservation.remindGuestType">
                    <option disabled value="">Select Remind Guest Type</option>
                    <option v-for="(remindGuestType, index) in getRemindGuestType" :key="index" :value="index">
                      {{ remindGuestType }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div> -->

                    <!--  ! Hold Release Date & Time -->
                    <hr class="my-4" />
                    <!--  ! Guest Information -->
                    <h6 class="mb-2 GuestTitle">Guest Information</h6>
                    <div class="row">
                        <div class="col-lg-5 px-md-0">
                            <div class="input-group">
                                <input type="text" class="form-control searchInput" id="searchInput" v-model="searchQuery" placeholder="Enter phone number or national ID" />
                                <button class="btn btn-primary" type="button" @click="searchByPhoneOrID">Search</button>
                            </div>
                        </div>
                        <label for="nameGuest" class="col-form-label">Guest Name</label>
                        <div class="col-lg-5 px-md-0 GuestNameReservation">
                            <div class="input-group GuestNameInputGroup">
                                <select class="form-select" id="nameGuest">
                                    <option value="" disabled>MR.</option>
                                    <option v-for="title in titles" :key="title" :value="title">
                                        {{ title }}
                                    </option>
                                </select>
                                <div class="position-relative flex-grow-1">
                                    <input type="text" class="form-control w-100 guestNameInput" v-model="formAddReservation.guestInformation.name" @input="handleSearch" @blur="handleBlur" ref="name" />

                                    <!-- Suggestions Dropdown -->
                                    <div v-if="showDropdown" class="position-absolute w-100 mt-1 bg-white border color-red rounded shadow z-5 cursor-pointer" style="max-height: 200px; overflow-y: auto" @scroll.passive="handleScroll">
                                        <div v-if="isLoading" class="p-2 text-muted">Loading...</div>
                                        <div v-else>
                                            <div v-for="name in filteredNames" :key="name.id" class="p-2 cursor-pointer hover:bg-light" @mousedown.prevent="selectName(name)">
                                                {{ name.name }}
                                            </div>
                                            <div v-if="!hasMore && filteredNames.length === 0" class="p-2 text-muted">No results found</div>
                                            <div v-if="hasMore && filteredNames.length > 0" class="p-2 text-muted">Loading more...</div>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-outline-primary waves-effect" type="button" @click="toggleSidebar">
                                    <i class="fa-solid fa-user-plus"></i>
                                </button>
                            </div>
                            <span class="error-message small" v-if="$v.formAddReservation.guestInformation.name.$error">Guest name is required</span>

                            <SidebarAddGuest :is-sidebar-open="isSidebarOpen" @close-sidebar="toggleSidebar" @guest-added="handleGuestAdded" />
                        </div>

                        <div class="col-lg-2 quick-guest">
                            <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="toggleQuickGuestSidebar">Quick Guest</button>
                            <QuickAddGuestSidebar :is-sidebar-open="isQuickGuestSidebarOpen" @close-sidebar="toggleQuickGuestSidebar" @guest-added="handleGuestAdded" />
                        </div>
                        <div class="col-lg-2 quick-guest">
                            <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="toggleHospitalitySidebar">ضيافه</button>
                            <HospitalitySideBar :is-sidebar-open="isHospitalitySidebarOpen" @close-sidebar="toggleHospitalitySidebar" @guest-added="handleGuestAdded" />
                        </div>

                        <!-- <div class="offset-md-7">
            </div>
            <div class="col-lg-3 col-md-6  ps-2 ps-md-0 EmailReservation">
              <label for="emailGuest" class="col-form-label">Email</label>
              <input class="form-control rounded-2 " type="email" id="emailGuest" placeholder="Email" v-model="formAddReservation.guestInformation.email" />
            </div>
            <div class="col-lg-3 col-md-6 ">
              <div class="mb-lg-3 row px-2 px-md-0 reservationMobile">
                <label for="mobileGuest" class="col-form-label ps-0">Mobile</label>
                <input class="form-control rounded-2 mobileInput" type="tel" id="mobileGuest" placeholder="Mobile" v-model="formAddReservation.guestInformation.mobile" ref="mobile" :class="{ 'input-error': validationMessages.mobile }" />
                <span class="error-message small" v-if="$v.formAddReservation.guestInformation.mobile.$error">
                  Mobile is required
                </span>
              </div>
            </div>
            <div class="col-lg-6 mb-lg-3 ps-lg-3 pe-lg-0 px-md-0 AddressReservation">
              <label for="addressGuest" class="col-form-label">Address</label>
              <input class="form-control rounded-2" type="text" id="addressGuest" placeholder="Address" v-model="formAddReservation.guestInformation.address" />
            </div>
            <div class="row px-0 mx-0">
              <div class="col-lg-3 col-md-6 ps-md-0 CountryReservation">
                <label for="countryGuest" class="col-form-label">Country</label>
                <select class="form-select" v-model="formAddReservation.guestInformation.country" :class="{ 'input-error': validationMessages.country }">
                  <option disabled value="">Select Country</option>
                  <option v-for="(country, index) in getCountries" :key="index" :value="index">
                    {{ country }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-6 px-md-0 StateReservation">
                <label for="stateGuest" class="col-form-label">State</label>
                <input class="form-control rounded-2" type="text" id="stateGuest" placeholder="state" v-model="formAddReservation.guestInformation.state" />
              </div>
              <div class="col-lg-3 col-md-6 ps-md-0 ps-lg-3 CityReservation">
                <label for="cityGuest" class="col-form-label">City</label>
                <input class="form-control rounded-2" type="text" id="cityGuest" placeholder="city" v-model="formAddReservation.guestInformation.city" />
              </div>
              <div class="col-lg-3 col-md-6 px-md-0 ZipReservation">
                <label for="ZipGuest" class="col-form-label">Zip</label>
                <input class="form-control rounded-2" type="text" id="ZipGuest" placeholder="Zip" v-model="formAddReservation.guestInformation.zip" />
              </div>
            </div> -->
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
                        <div class="offset-md-8 col-md-2 col-6 text-end">
                            <button type="button" class="btn btn-lg btn-secondary waves-effect waves-light w-100" @click="goBack">Cancel</button>
                        </div>
                        <div class="offset-md- col-md-2 col-6 text-end">
                            <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light w-100" :disabled="isSubmitting">
                                <span v-if="isSubmitting">
                                    <i class="fa fa-spinner fa-spin me-1"></i>
                                    Reserving...
                                </span>
                                <span v-else>Reserve</span>
                            </button>
                        </div>
                        <!-- <div class="col-6  text-end">
              <button type="button" class="btn btn-lg btn-secondary waves-effect waves-light" @click="goBack">
                Cancel
              </button>
            </div>
            <div class="col-6  text-end">
              <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light">
                Reserver
              </button>
            </div> -->
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
    import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';
    import { getBookingSources, getBusinessSources, getGuestsInfo, getGuestsInfoSearch, postAddReservationData, getUnitTypes, getUnits, getGuestDetails, getServices, getTravelAgents } from '../../Api/addResvertionApi';
    import flatpickrMixin from '../Mixin/flatpickrMixin';
    import SidebarAddGuest from '../layout/AddGuestSidebar.vue';
    import QuickAddGuestSidebar from '../layout/QuickAddGuestSidebar.vue';
    import { mapState, mapGetters } from 'vuex';
    import { validationMixin } from 'vuelidate';
    import { required, email } from 'vuelidate/lib/validators';
    import HospitalitySideBar from '../layout/HospitalitySideBar.vue';

    export default {
        name: 'CheckIn',
        layout: 'component',
        components: { SidebarAddGuest, QuickAddGuestSidebar, HospitalitySideBar },

        data() {
            return {
                isSubmitting: false,

                searchQuery: '',
                formAddReservation: {
                    guestInformation: {
                        name: '',
                    },
                },
                titles: ['Mr.', 'Ms.', 'Mrs.'],
                filteredNames: [],
                showDropdown: false,
                isLoading: false,
                hasMore: false,
                // ######
                showSelect: false,
                showInput: false,
                isSidebarOpen: false,
                isQuickGuestSidebarOpen: false,
                isHospitalitySidebarOpen: false,
                roomCount: 1,
                selectedTitle: 'MR.',
                showDropdown: false,
                titles: ['MR.', 'DR.', 'JN.', 'MAM.', 'MRS.', 'MS.', 'SIR.', 'SR.'],
                formData: [{ rooms: 1 }],
                existingItemsCount: 1,
                selectedOptionBusiness: '',
                datePicker1Instance: null,
                datePicker2Instance: null,
                timePicker1Instance: null,
                timePicker2Instance: null,
                businessSources: [],
                bookingSources: [],
                travelAgents: [],
                unitsTypes: [],
                availableUnits: [],
                servicesList: [],
                selectedUnit: '',
                paymentType: {
                    payment_id: '',
                    name: '',
                },
                formAddReservation: {
                    checkInDate: '',
                    checkInTime: '12:00',
                    checkOutDate: '',
                    checkOutTime: '2:00',
                    numberRooms: '1',
                    reservationType: '',
                    businessSource: '',
                    travelAgent: '',
                    rateOffered: {
                        rateOfferedContract: false,
                        bookAll: false,
                        quickGroup: false,
                        complimentaryRoom: false,
                    },
                    units: [
                        {
                            projectId: '',
                            roomType: '',
                            rateType: '',
                            unitId: '',
                            adults: '1',
                            children: '0',
                            rateAmount: '',
                            unitTypeId: '',
                        },
                    ],
                    services: [
                        {
                            serviceId: '',
                            price: 0,
                        },
                    ],
                    releaseDate: '',
                    releaseTime: '',
                    releaseTerm: '',
                    releaseTermValue: '',
                    remindGuest: '1',
                    remindGuestType: '',
                    holdRelease: false,
                    arrivalDate: false,
                    guestInformation: {
                        name: '',
                        email: '',
                        mobile: '',
                        address: '',
                        country: '',
                        state: '',
                        city: '',
                        zip: '',
                    },
                    otherInformation: {
                        emailBookingOption: '',
                        emailAddressCheckout: '',
                        accessToGuestPortal: false,
                        suppressRateOnRegistrationCard: false,
                    },
                    bookingSource: '',
                    paymentImage: null,
                },
                // validationMessages: {
                //   businessSource: '',
                //   reservationType: '',
                //   name: '',
                //   mobile: '',
                //   adults: '',
                //   children: '',
                //   rateType: '',
                //   rateAmount: '',
                // },
                selectedNameId: null,
                showDropdown: false,
                filteredNames: [],
                currentPage: 1,
                totalPages: 1,
                hasMore: false,
                isLoading: false,
                searchQuery: '',
                availableUnitsByRoom: [],
                allUnitTypes: [], // Store all unit types
                filteredUnitTypesByRoom: [],
            };
        },
        mixins: [validationMixin, flatpickrMixin],
        validations: {
            formAddReservation: {
                // reservationType: { required },
                // businessSource: { required },
                // bookingSource: { required },
                units: {
                    $each: {
                        roomType: { required },
                        // rateType: { required },
                        unitId: { required },
                        adults: { required },
                        children: { required },
                        rateAmount: { required },
                        unitTypeId: { required },
                    },
                },
                guestInformation: {
                    name: { required },
                },
            },
        },

        methods: {
            // Component or Vue Method
            // Method to fetch guests by phone or national ID
            async searchByPhoneOrID() {
                if (!this.searchQuery) return; // إذا كان الـ searchQuery فارغ

                this.isLoading = true;

                try {
                    // استدعاء الـ API مع إرسال الـ searchQuery
                    const response = await getGuestsInfoSearch(this.searchQuery);

                    // استخراج الداتا من الـ API response
                    const guests = response?.data?.data || [];

                    if (guests.length > 0) {
                        this.filteredNames = guests; // عرض الضيوف في الـ dropdown
                        this.showDropdown = true;
                        this.hasMore = false;
                    } else {
                        // إذا مفيش نتائج، عرض الرسالة دي
                        this.filteredNames = [];
                        this.showDropdown = true;
                        console.log('No results found for: ' + this.searchQuery); // للتحقق
                    }
                } catch (error) {
                    handleSubmissionError(error, 'There was an issue retrieving the guest information.');
                } finally {
                    this.isLoading = false;
                }
            },

            updateRepeater() {
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
                            unitId: '', // Leave empty as it needs to be unique
                            adults: firstRoom.adults,
                            children: firstRoom.children,
                            rateAmount: firstRoom.rateAmount,
                            unitTypeId: firstRoom.unitTypeId, // Make sure to copy the unitTypeId
                        };

                        this.formAddReservation.units.push(newRoom);
                        this.$set(this.availableUnitsByRoom, i, []);

                        if (newRoom.roomType) {
                            this.handleUnitTypeChange(i, newRoom.roomType);
                        }
                    }
                } else if (currentCount > targetCount) {
                    this.formAddReservation.units.splice(targetCount);
                    this.availableUnitsByRoom.splice(targetCount);
                }

                // Emit the updated number of rooms
                this.$emit('update:numberRooms', targetCount);
            },
            addUnit() {
                const firstUnitTypeId = this.formAddReservation.units[0]?.unitTypeId;

                const newRoom = {
                    roomType: '',
                    rateType: '',
                    unitId: '',
                    adults: '1',
                    children: '0',
                    rateAmount: '',
                    unitTypeId: firstUnitTypeId,
                };

                this.formAddReservation.units.push(newRoom);
                const newIndex = this.formAddReservation.units.length - 1;

                this.$set(this.availableUnitsByRoom, newIndex, []);
                this.formAddReservation.numberRooms = this.formAddReservation.units.length.toString();
                // Emit the updated number of rooms
                this.$emit('update:numberRooms', this.formAddReservation.units.length);
            },
            removeUnit(index) {
                if (this.formAddReservation.units.length > 1) {
                    this.formAddReservation.units.splice(index, 1);
                    // Remove available units for this room
                    this.$delete(this.availableUnitsByRoom, index);
                    this.formAddReservation.numberRooms = this.formAddReservation.units.length.toString();
                    // Emit the updated number of rooms
                    this.$emit('update:numberRooms', this.formAddReservation.units.length);
                }
            },
            addService() {
                this.formAddReservation.services.push({
                    serviceId: '',
                    quantity: 1,
                    price: 0,
                    total: 0,
                });
            },

            // Remove a service row
            removeService(index) {
                this.formAddReservation.services.splice(index, 1);
            },

            // Update price when service is selected

            // Calculate total price for a service

            isNewItem(index) {
                return index >= this.existingItemsCount;
            },
            toggleSidebar() {
                this.isSidebarOpen = !this.isSidebarOpen;
            },
            toggleQuickGuestSidebar() {
                this.isQuickGuestSidebarOpen = !this.isQuickGuestSidebarOpen;
            },
            toggleHospitalitySidebar() {
                this.isHospitalitySidebarOpen = !this.isHospitalitySidebarOpen;
            },

            handleInput() {
                // Fetch or filter names based on the input
                this.fetchNames(this.formAddReservation.guestInformation.name);
            },
            calculateTotalRate(index, value) {
                if (value && this.totalNights > 0) {
                    // Convert to number and multiply by total nights
                    const baseRate = parseFloat(value);
                    if (!isNaN(baseRate)) {
                        const totalRate = baseRate * this.totalNights;
                        // Update the rate amount with the total
                        this.formAddReservation.units[index].rateAmount = totalRate.toFixed(2);
                    }
                }
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
            // resetValidationMessages ()
            // {
            //   this.validationMessages = {};
            // },

            // Reset the form
            resetForm() {
                this.formAddReservation = {
                    checkInDate: '',
                    checkInTime: '',
                    checkOutDate: '',
                    checkOutTime: '',
                    numberRooms: '1',
                    reservationType: '',
                    businessSource: '',
                    rateOffered: {
                        rateOfferedContract: false,
                        bookAll: false,
                        quickGroup: false,
                        complimentaryRoom: false,
                    },
                    units: [
                        {
                            roomType: '',
                            rateType: '',
                            unitId: '',
                            adults: '1',
                            children: '0',
                            rateAmount: '',
                            unitTypeId: '',
                        },
                    ],
                    releaseDate: '',
                    releaseTime: '',
                    releaseTerm: '',
                    releaseTermValue: '',
                    remindGuest: '',
                    remindGuestType: '',
                    holdRelease: false,
                    arrivalDate: false,
                    guestInformation: {
                        name: '',
                        email: '',
                        mobile: '',
                        address: '',
                        country: '',
                        state: '',
                        city: '',
                        zip: '',
                    },
                    otherInformation: {
                        emailBookingOption: '', // Selected booking option
                        emailAddressCheckout: '', // Email addresses input
                        accessToGuestPortal: false, // Toggle for Access To Guest Portal
                        suppressRateOnRegistrationCard: false, // Toggle for Suppress Rate on Registration Card
                    },
                    bookingSource: '', // Initialize with empty string
                };
            },

            async submitAddReservation() {
                if (this.isSubmitting) {
                    return;
                }
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.isSubmitting = false;
                    return;
                }

                // Create FormData to handle file upload
                const formData = new FormData();

                // Get the image file (if exists)
                const imageFile = this.paymentData.image;

                // Prepare the data to send to the server
                const bookingData = {
                    checkin_date: this.formAddReservation.checkInDate,
                    checkin_time: this.formAddReservation.checkInTime,
                    checkout_date: this.formAddReservation.checkOutDate,
                    checkout_time: this.formAddReservation.checkOutTime,
                    rooms: this.formAddReservation.numberRooms,
                    booking_source_id: this.formAddReservation.bookingSource,
                    business_source_id: this.formAddReservation.businessSource,
                    travel_agent_id: this.formAddReservation.travelAgent,
                    reservation_type: this.formAddReservation.reservationType,
                    is_free: this.formAddReservation.rateOffered.complimentaryRoom,
                    hold_release_date: this.formAddReservation.releaseDate,
                    hold_release_time: this.formAddReservation.releaseTime,
                    remind_before_days: this.formAddReservation.remindGuest,
                    remind_before_type: this.formAddReservation.remindGuestType,
                    client_id: this.selectedNameId,
                    mobile: this.formAddReservation.guestInformation.mobile,
                    address: this.formAddReservation.guestInformation.address,
                    country: this.formAddReservation.guestInformation.country,
                    state: this.formAddReservation.guestInformation.state,
                    city: this.formAddReservation.guestInformation.city,
                    zip_code: this.formAddReservation.guestInformation.zip,
                    room_charges: this.paymentData.roomCharges,
                    tax: this.paymentData.taxes,
                    room_charges: this.formatValueForServer(this.paymentData.roomCharges),
                    payment_id: this.paymentData.paymentMethod,
                    payment_type_id: this.paymentData.selectedPaymentType,
                    payment_price: this.paymentData.amount,
                    date_at: this.paymentData.date,
                    note: this.paymentData.comment,
                    payment_mode: this.paymentData.paymentMode,
                    insurance: this.paymentData.insurance,
                    payment_assigned_to: this.paymentData.assigned_to,
                    payment_travel_agent_id: this.paymentData.selectedTravelAgent,
                    payment_business_source_id: this.paymentData.selectedBusinessSource,
                };

                // Append simple fields to FormData
                Object.keys(bookingData).forEach(key => {
                    formData.append(key, bookingData[key]);
                });

                // Append the units array (as individual entries)
                // Log units data
                // console.log('Adding units data:');
                this.formAddReservation.units.forEach((unit, index) => {
                    // console.log(`Unit ${index}:`, {
                    //     project_id: unit.projectId,
                    //     unit_id: unit.unitId,
                    //     unit_type_id: unit.unitTypeId,
                    //     rate_type: unit.rateType,
                    //     adults: unit.adults,
                    //     children: unit.children,
                    //     rate_amount: this.formatValueForServer(unit.rateAmount),
                    // });
                    formData.append(`units[${index}][project_id]`, unit.projectId);
                    formData.append(`units[${index}][unit_id]`, unit.unitId);
                    formData.append(`units[${index}][unit_type_id]`, unit.unitTypeId);
                    formData.append(`units[${index}][rate_type]`, unit.rateType);
                    formData.append(`units[${index}][adults]`, unit.adults);
                    formData.append(`units[${index}][children]`, unit.children);
                    formData.append(`units[${index}][rate_amount]`, this.formatValueForServer(unit.rateAmount));
                });

                // Log services data
                // console.log('Adding services data:');
                this.formAddReservation.services.forEach((service, index) => {
                    // console.log(`Service ${index}:`, {
                    //     service_id: service.serviceId,
                    //     service_price: this.formatValueForServer(service.price),
                    // });
                    formData.append(`services[${index}][service_id]`, service.serviceId);
                    formData.append(`services[${index}][service_price]`, this.formatValueForServer(service.price));
                });

                // Log building details data if they exist
                if (this.paymentData.paymentUnits && this.paymentData.paymentUnits.length > 0) {
                    // console.log('Adding building details data:');
                    this.paymentData.paymentUnits.forEach((building, index) => {
                        // console.log(`paymentUnits ${index}:`, {
                        //     unit_id: building.unitId,
                        //     unit_code: building.name,
                        //     amount: this.formatValueForServer(building.amount),
                        // });
                        formData.append(`paymentUnits[${index}][unit_id]`, building.unitId);
                        formData.append(`paymentUnits[${index}][unit_code]`, building.name);
                        formData.append(`paymentUnits[${index}][amount]`, this.formatValueForServer(building.amount));
                    });
                } else {
                    console.log('No building details to add');
                }

                // Append image file if it exists
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                try {
                    this.isSubmitting = true;

                    const response = await postAddReservationData(formData);

                    // reservation ID from the response
                    const reservationName = response?.data?.data?.name;

                    await showSuccessAlert(`Reservation #${reservationName} submitted successfully!`, this.$router, 'index');
                } catch (error) {
                    handleSubmissionError(error, 'There was an issue with your reservation.');
                } finally {
                    this.isSubmitting = false;
                }
            },

            formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${year}-${month}-${day}`;
            },

            formatTime(date) {
                return date.toTimeString().slice(0, 5);
            },
            goBack() {
                this.$router.go(-1);
            },
            async spliceSelectedResourceName() {
                if (this.selectedResourceName) {
                    // console.log('Selected Resource Name:', this.selectedResourceName);
                    const parts = this.selectedResourceName.split(' - ');
                    const displayUnit = parts[0];
                    const displayType = parts[1];
                    const idPart = parts[2];

                    // console.log('Parsed parts:', { displayUnit, displayType, idPart });

                    // Extract project ID if it exists in the format
                    const projectPart = parts.find(part => part.includes('Project:'));
                    const projectId = projectPart ? projectPart.replace('Project:', '').trim() : '';

                    // Fix the ID parsing to handle different formats
                    let unitTypeId, unitId;
                    if (idPart && idPart.includes('ID:')) {
                        const idString = idPart.replace('ID:', '').trim();
                        [unitTypeId, unitId] = idString.split('-').map(id => id.trim());
                    }

                    // console.log('Extracted IDs:', { unitTypeId, unitId, projectId });

                    if (!unitTypeId) {
                        console.error('Failed to extract unitTypeId from selectedResourceName');
                        return;
                    }

                    // First set the project ID for the unit
                    if (projectId) {
                        this.formAddReservation.units[0].projectId = projectId;
                        // Trigger project change to load unit types
                        await this.handleProjectChange(0, projectId);

                        // Wait for the project change to complete
                        await this.$nextTick();
                    }

                    // Now set the room type and unit type ID
                    this.formAddReservation.units[0].roomType = unitTypeId;
                    this.formAddReservation.units[0].unitTypeId = unitTypeId;

                    // Force the select element to update
                    if (this.$refs.unitsTypes && this.$refs.unitsTypes[0]) {
                        this.$refs.unitsTypes[0].value = unitTypeId;
                    }

                    const checkInDate = this.formAddReservation.checkInDate;
                    const checkOutDate = this.formAddReservation.checkOutDate;

                    // Wait for units to be fetched with project ID filter
                    await this.handleUnitTypeChange(0, unitTypeId, checkInDate, checkOutDate, projectId);

                    // After units are loaded, set the unit ID
                    await this.$nextTick();
                    if (unitId) {
                        // Convert unitId to number if needed (since select values are often strings)
                        const numericUnitId = Number(unitId);
                        this.formAddReservation.units[0].unitId = numericUnitId;

                        // Force update the select component
                        if (this.$refs.unitSelect && this.$refs.unitSelect[0]) {
                            this.$refs.unitSelect[0].value = numericUnitId;
                        }
                    }
                }
            },
            formatRateAmount() {
                const value = this.formAddReservation.units[0].rateAmount;
                if (isNaN(value) || value < 0) {
                    this.validationMessages.rateAmount = 'Rate amount must be a positive number.';
                    this.formAddReservation.units[0].rateAmount = 0;
                } else {
                    this.validationMessages.rateAmount = '';
                    // Format the value to two decimal places
                    this.formAddReservation.units[0].rateAmount = parseFloat(value).toFixed(2);
                }
            },
            // async handleUnitTypeChange(roomIndex, unitTypeId, checkInDate, checkOutDate, projectId) {
            //     try {
            //         if (unitTypeId) {
            //             // Reset selected unit for this room
            //             this.formAddReservation.units[roomIndex].unitId = '';
            //             // Set the unitTypeId for this specific unit
            //             this.formAddReservation.units[roomIndex].unitTypeId = unitTypeId;

            //             // Get project ID from parameter or from the form data
            //             const project_id = projectId || this.formAddReservation.units[roomIndex].projectId || '';

            //             // Fetch units for selected type with date parameters
            //             const response = await getUnits(unitTypeId, {
            //                 start_date: checkInDate,
            //                 end_date: checkOutDate,
            //                 reservation_id: 0,
            //                 project_id: project_id, // Include project ID in the API request
            //             });
            //             this.$set(this.availableUnitsByRoom, roomIndex, response.data.data);
            //         } else {
            //             this.$set(this.availableUnitsByRoom, roomIndex, []);
            //         }
            //     } catch (error) {
            //         console.error('Error fetching units:', error);
            //         this.$set(this.availableUnitsByRoom, roomIndex, []);
            //     }
            // },
            async handleProjectChange(roomIndex, projectId) {
                try {
                    // Reset room type and unit selections
                    this.formAddReservation.units[roomIndex].roomType = '';
                    this.formAddReservation.units[roomIndex].unitId = '';

                    // Store the project ID
                    this.formAddReservation.units[roomIndex].projectId = projectId;

                    // Filter unit types by project ID
                    if (projectId) {
                        // If we haven't loaded all unit types yet, fetch them
                        if (this.allUnitTypes.length === 0) {
                            const response = await getUnitTypes();
                            this.allUnitTypes = response.data.data || [];
                        }

                        // Filter unit types by project ID
                        const filteredTypes = this.allUnitTypes.filter(type => type.project_id == projectId || type.project_id == null);

                        // Set filtered unit types for this room
                        this.$set(this.filteredUnitTypesByRoom, roomIndex, filteredTypes);
                    } else {
                        // If no project selected, clear filtered unit types
                        this.$set(this.filteredUnitTypesByRoom, roomIndex, []);
                    }
                } catch (error) {
                    console.error('Error filtering unit types:', error);
                    this.$set(this.filteredUnitTypesByRoom, roomIndex, []);
                }
            },

            // Update the existing handleUnitTypeChange to use the project ID from the unit
            async handleUnitTypeChange(roomIndex, unitTypeId, checkInDate, checkOutDate, projectId) {
                try {
                    if (unitTypeId) {
                        // Reset selected unit for this room
                        this.formAddReservation.units[roomIndex].unitId = '';
                        // Set the unitTypeId for this specific unit
                        this.formAddReservation.units[roomIndex].unitTypeId = unitTypeId;

                        // Get project ID from the unit itself
                        const project_id = this.formAddReservation.units[roomIndex].projectId || '';

                        // Fetch units for selected type with date parameters
                        const response = await getUnits(unitTypeId, {
                            start_date: checkInDate,
                            end_date: checkOutDate,
                            reservation_id: 0,
                            project_id: project_id, // Include project ID in the API request
                        });
                        this.$set(this.availableUnitsByRoom, roomIndex, response.data.data);
                    } else {
                        this.$set(this.availableUnitsByRoom, roomIndex, []);
                    }
                } catch (error) {
                    console.error('Error fetching units:', error);
                    this.$set(this.availableUnitsByRoom, roomIndex, []);
                }
            },
            async handleSearch() {
                this.currentPage = 1;
                this.searchQuery = this.formAddReservation.guestInformation.name;

                // Filter names locally based on searchQuery
                if (this.searchQuery) {
                    this.filteredNames = this.filteredNames.filter(name => name.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
                    this.showDropdown = true;
                } else {
                    // If no search query, show all names
                    await this.fetchNames();
                }
            },

            async fetchNames() {
                if (this.isLoading) return;

                this.isLoading = true;
                try {
                    const response = await getGuestsInfo({
                        params: {
                            query: this.searchQuery,
                            page: this.currentPage,
                            perPage: 10,
                        },
                    });

                    if (this.currentPage === 1) {
                        this.filteredNames = response.data.data;
                    } else {
                        this.filteredNames = [...this.filteredNames, ...response.data.data];
                    }

                    this.totalPages = response.data.last_page;
                    this.hasMore = this.currentPage < this.totalPages;
                } catch (error) {
                    console.error('Error fetching names:', error);
                } finally {
                    this.isLoading = false;
                }
            },

            handleScroll(event) {
                const element = event.target;
                const bottom = element.scrollHeight - element.scrollTop === element.clientHeight;
                if (bottom && this.hasMore && !this.isLoading) {
                    this.currentPage++;
                    this.fetchNames();
                }
            },

            async selectName(name) {
                try {
                    // console.log('Selected name:', name);
                    this.selectedNameId = name.id; // Add this line
                    this.showDropdown = false; // Close dropdown immediately after selection

                    const response = await getGuestDetails(name.id);

                    const guestDetails = response.data.data;

                    // Check if response.data exists and has the expected structure
                    if (guestDetails) {
                        // Update form data with explicit property access
                        this.formAddReservation.guestInformation = {
                            name: name.name,
                            email: guestDetails.email || '',
                            mobile: guestDetails.mobile || '',
                            address: guestDetails.address || '',
                            country: guestDetails.country || '',
                            state: guestDetails.state || '',
                            city: guestDetails.city || '',
                            zip: guestDetails.zip_code || '',
                        };

                        // Log the final form data
                    }
                } catch (error) {
                    console.error('Error details:', error);
                }
            },

            handleBlur() {
                setTimeout(() => {
                    this.showDropdown = false;
                }, 200);
            },

            initializeFromStore() {
                // Initialize form data from Vuex store
                if (this.selectedDates.length > 0) {
                    const [firstDate] = this.parsedDates;
                    const [lastDate] = [...this.parsedDates].reverse();

                    if (firstDate && lastDate) {
                        this.formAddReservation.checkInDate = this.formatDate(firstDate);
                        this.formAddReservation.checkOutDate = this.formatDate(lastDate);
                        // this.formAddReservation.checkInTime = this.formatTime(firstDate);
                        // this.formAddReservation.checkOutTime = this.formatTime(lastDate);
                    }
                }

                if (this.selectedResourceName) {
                    this.spliceSelectedResourceName();
                }
            },

            // Handle new guest added
            handleGuestAdded(newGuest) {
                // Add the new guest to the beginning of filteredNames
                this.filteredNames = [newGuest, ...this.filteredNames];

                // Set the guest name directly in the input field
                this.formAddReservation.guestInformation.name = newGuest.name;

                // Store the guest ID
                this.selectedNameId = newGuest.id;

                // Force close the sidebar by directly setting isSidebarOpen to false
                this.isSidebarOpen = false;

                // Make sure dropdown is closed
                this.showDropdown = false;

                // If you have a search input, update filtered results
                if (this.searchQuery) {
                    this.filterNames(this.searchQuery);
                }
            },

            // Toggle sidebar open/closed
            toggleSidebar() {
                this.isSidebarOpen = !this.isSidebarOpen;
            },

            // If you have a search/filter function
            filterNames(query) {
                if (!query) {
                    return this.filteredNames;
                }
                // return this.filteredNames.filter(guest => guest.name.toLowerCase().includes(query.toLowerCase()) || guest.phone.includes(query));
            },

            // Method to refresh all guest data if needed
            async refreshGuestList() {
                this.isLoading = true;
                try {
                    const response = await getUsers(); // Your API call to get users
                    this.filteredNames = response.data.data;
                } catch (error) {
                    console.error('Error fetching guest list:', error);
                    if (this.$toast) {
                        this.$toast.error('Failed to refresh guest list');
                    }
                } finally {
                    this.isLoading = false;
                }
            },
            // Modified handleRateChange function
            // Add this method to handle service price changes
            handleServicePriceChange(event, index) {
                // Get the value from the input field and remove any dots or commas
                const servicePrice = parseFloat(event.target.value.replace(/[.,]/g, ''));

                if (!isNaN(servicePrice)) {
                    // Format with comma as thousands separator for display
                    const formattedValue = servicePrice
                        .toLocaleString('de-DE', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                        })
                        .replace(/\./g, ',');

                    // Update this specific service's price with proper formatting
                    this.formAddReservation.services[index].price = formattedValue;

                    // Recalculate total including all room rates and service prices
                    this.calculateAndEmitTotal();
                }
            },

            // Method to calculate and emit the total
            calculateAndEmitTotal() {
                // Calculate total room rate for all units
                const totalRoomRate = this.formAddReservation.units.reduce((total, unit) => {
                    const unitRate = parseFloat(unit.rateAmount ? unit.rateAmount.toString().replace(/[.,]/g, '') : 0);
                    return total + (isNaN(unitRate) ? 0 : unitRate * this.totalNights);
                }, 0);

                // Calculate total services price
                const totalServicesPrice = this.formAddReservation.services.reduce((total, service) => {
                    const servicePrice = parseFloat(service.price ? service.price.toString().replace(/[.,]/g, '') : 0);
                    return total + (isNaN(servicePrice) ? 0 : servicePrice);
                }, 0);

                // Add room rate and services price for grand total
                const grandTotal = totalRoomRate + totalServicesPrice;

                // Emit the total for other components if needed with comma as separator
                this.$emit(
                    'change',
                    grandTotal
                        .toLocaleString('de-DE', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                        })
                        .replace(/\./g, ','),
                );
            },

            // Modified handleRateChange function to use the common calculation method
            handleRateChange(event, index) {
                // Get the value from the input field and remove any dots or commas
                const baseRate = parseFloat(event.target.value.replace(/[.,]/g, ''));

                if (!isNaN(baseRate)) {
                    // Format with comma as thousands separator for display
                    const formattedValue = baseRate
                        .toLocaleString('de-DE', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                        })
                        .replace(/\./g, ',');

                    // Update only unit rate amounts, not service prices
                    if (event.target.id === 'rateAmount') {
                        this.formAddReservation.units[index].rateAmount = formattedValue;
                    }

                    // Calculate and emit the total
                    this.calculateAndEmitTotal();
                }
            },

            // Add a separate handler for service price changes
            handleServicePriceChange(event, index) {
                // Get the value from the input field and remove any dots or commas
                const servicePrice = parseFloat(event.target.value.replace(/[.,]/g, ''));

                if (!isNaN(servicePrice)) {
                    // Format with comma as thousands separator for display
                    const formattedValue = servicePrice
                        .toLocaleString('de-DE', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                        })
                        .replace(/\./g, ',');

                    // Update only service prices
                    this.formAddReservation.services[index].price = formattedValue;

                    // Calculate and emit the total
                    this.calculateAndEmitTotal();
                }
            },
            handlePaymentImageUpload(file) {
                this.paymentImage = file;
            },
            resetRoomSelections() {
                // Reset only room type and room selections for each unit
                this.formAddReservation.units.forEach((unit, index) => {
                    unit.roomType = '';
                    unit.unitId = '';
                    this.$set(this.availableUnitsByRoom, index, []);
                });
            },
            // Add this new method to format the value before sending to server
            formatValueForServer(value) {
                return value ? value.toString().replace(/[.,]/g, '') : '0';
            },
            resetFormData() {
                // Reset room selections
                this.formAddReservation.units.forEach((unit, index) => {
                    unit.projectId = ''; // Reset project ID
                    unit.roomType = '';
                    unit.unitId = '';
                    unit.rateType = '';
                    unit.adults = '1';
                    unit.children = '0';
                    unit.rateAmount = '';
                    unit.unitTypeId = '';
                    this.$set(this.availableUnitsByRoom, index, []);
                    this.$set(this.filteredUnitTypesByRoom, index, []); // Reset filtered unit types
                });

                // Reset services
                this.formAddReservation.services = [
                    {
                        serviceId: '',
                        price: 0,
                    },
                ];

                // Reset business source and travel agent
                this.formAddReservation.businessSource = '';
                this.formAddReservation.travelAgent = '';

                // Reset guest information
                this.formAddReservation.guestInformation = {
                    name: '',
                    email: '',
                    mobile: '',
                    address: '',
                    country: '',
                    state: '',
                    city: '',
                    zip: '',
                };

                // Reset selected name ID
                this.selectedNameId = null;

                // Clear filtered names
                this.filteredNames = [];
                this.showDropdown = false;
            },
        },

        async mounted() {
            try {
                const [
                    businessSourcesResponse,
                    // bookingSourcesResponse,
                    usersResponse,
                    unitTypesResponse,
                    // servicesResponses,
                    servicesResponse,
                    travelAgentsResponse,
                ] = await Promise.all([getBusinessSources(), getGuestsInfo(), getUnitTypes(), getServices(), getTravelAgents()]);

                this.businessSources = businessSourcesResponse.data.data;
                // this.bookingSources = bookingSourcesResponse.data.data;
                this.filteredNames = usersResponse.data.data;
                this.unitsTypes = unitTypesResponse.data.data;
                this.servicesList = servicesResponse.data.data;
                this.travelAgents = travelAgentsResponse.data.data;
            } catch (error) {
                console.error('Error loading data:', error);
            }
            this.initializeFromStore();
            // this is for make time and date selected depended on time and data selected from calender
            // this.$nextTick(() =>
            // {
            //   if (this.firstDate && this.lastDate) {
            //     // Initialize date pickers with correct format
            //     this.datePicker1Instance = flatpickr(this.$refs.datePicker1, {
            //       enableTime: false,
            //       dateFormat: "Y-m-d", // Ensure the format is YYYY-MM-DD
            //       defaultDate: this.firstDate,
            //       // enable: [this.firstDate],
            //       disableMobile: true,
            //       // onChange: (selectedDates) =>
            //       // {
            //       //   if (selectedDates[0]) {
            //       //     this.formAddReservation.checkInDate = this.formatDate(selectedDates[0]);
            //       //   }
            //       // }
            //     });

            //     this.datePicker2Instance = flatpickr(this.$refs.datePicker2, {
            //       enableTime: false,
            //       dateFormat: "Y-m-d", // Ensure the format is YYYY-MM-DD
            //       defaultDate: this.lastDate,
            //       // enable: [this.lastDate],
            //       disableMobile: true,
            //       onChange: (selectedDates) =>
            //       {
            //         if (selectedDates[0]) {
            //           this.formAddReservation.checkOutDate = this.formatDate(selectedDates[0]);
            //         }
            //       }
            //     });

            //     // Set initial values
            //     this.formAddReservation.checkInDate = this.formatDate(this.firstDate);
            //     this.formAddReservation.checkOutDate = this.formatDate(this.lastDate);

            //     // Initialize time pickers
            //     this.timePicker1Instance = flatpickr(this.$refs.timePicker1, {
            //       enableTime: true,
            //       noCalendar: true,
            //       dateFormat: "H:i",
            //       defaultDate: this.firstDate,
            //       onChange: (selectedDates) =>
            //       {
            //         this.formAddReservation.checkInTime = selectedDates[0] ?
            //           this.formatTime(selectedDates[0]) : '';
            //       }
            //     });

            //     this.timePicker2Instance = flatpickr(this.$refs.timePicker2, {
            //       enableTime: true,
            //       noCalendar: true,
            //       dateFormat: "H:i",
            //       // defaultDate: this.lastDate,
            //        defaultDate: this.lastDate,
            //       onChange: (selectedDates) =>
            //       {
            //         this.formAddReservation.checkOutTime = selectedDates[0] ?
            //           this.formatTime(selectedDates[0]) : '';
            //       }
            //     });

            //     // Set initial times
            //     this.formAddReservation.checkInTime = this.formatTime(this.firstDate);
            //     this.formAddReservation.checkOutTime = this.formatTime(this.lastDate);
            //   }
            // });
            this.$nextTick(() => {
                if (this.firstDate && this.lastDate) {
                    // Initialize date pickers with correct format
                    this.datePicker1Instance = flatpickr(this.$refs.datePicker1, {
                        enableTime: false,
                        dateFormat: 'Y-m-d',
                        defaultDate: this.firstDate,
                        disableMobile: true,
                        onChange: selectedDates => {
                            if (selectedDates[0]) {
                                const newDate = this.formatDate(selectedDates[0]);
                                if (newDate !== this.formAddReservation.checkInDate) {
                                    this.formAddReservation.checkInDate = newDate;
                                    // Reset all form data when check-in date changes
                                    this.resetFormData();
                                }
                            }
                        },
                    });

                    this.datePicker2Instance = flatpickr(this.$refs.datePicker2, {
                        enableTime: false,
                        dateFormat: 'Y-m-d',
                        defaultDate: this.lastDate,
                        disableMobile: true,
                        onChange: selectedDates => {
                            if (selectedDates[0]) {
                                const newDate = this.formatDate(selectedDates[0]);
                                if (newDate !== this.formAddReservation.checkOutDate) {
                                    this.formAddReservation.checkOutDate = newDate;
                                    // Reset all form data when check-out date changes
                                    this.resetFormData();
                                }
                            }
                        },
                    });

                    // Set initial values without triggering reset
                    this.formAddReservation.checkInDate = this.formatDate(this.firstDate);
                    this.formAddReservation.checkOutDate = this.formatDate(this.lastDate);

                    // Initialize time pickers with default times from data
                    // For check-in time picker, use the default time "12:00"
                    this.timePicker1Instance = flatpickr(this.$refs.timePicker1, {
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        defaultDate: '12:00', // Set default time to 12:00
                        defaultHour: 12, // Set default hour to 12
                        defaultMinute: 0, // Set default minute to 0
                        onChange: selectedDates => {
                            this.formAddReservation.checkInTime = selectedDates[0] ? this.formatTime(selectedDates[0]) : '12:00';
                        },
                    });

                    // For check-out time picker, use the default time "02:00"
                    this.timePicker2Instance = flatpickr(this.$refs.timePicker2, {
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: 'H:i',
                        defaultDate: '02:00', // Set default time to 02:00
                        defaultHour: 2, // Set default hour to 2
                        defaultMinute: 0, // Set default minute to 0
                        onChange: selectedDates => {
                            this.formAddReservation.checkOutTime = selectedDates[0] ? this.formatTime(selectedDates[0]) : '02:00';
                        },
                    });

                    // Set initial times from default values in data
                    // This ensures the form has the default times even before user interaction
                    this.formAddReservation.checkInTime = '12:00';
                    this.formAddReservation.checkOutTime = '02:00';
                }
            });
        },
        computed: {
            ...mapState({
                selectedDates: state => state.selectedDates || [],
                selectedResourceName: state => state.selectedResourceName || '',
                reservationTypes: state => state.reservationTypes || [],
                rateTypes: state => state.rateTypes || [],
                countries: state => state.countries || [],
                remindGuestType: state => state.remindGuestType || [],
            }),
            ...mapGetters(['getReservationTypes', 'getRateTypes', 'getCountries', 'getRemindGuestType', 'getProjects']),
            // formattedRateAmount: {
            //   get ()
            //   {
            //     // Safely handle undefined or null values by defaulting to 0
            //     const rateAmount = this.formAddReservation.units[0].rateAmount || 0;
            //     return Number(rateAmount).toFixed(2); // Ensure it's a number before applying toFixed
            //   },
            //   set (value)
            //   {
            //     // Strip non-numeric characters except for the decimal point
            //     const sanitizedValue = value.replace(/[^0-9.]/g, '');
            //     this.formAddReservation.units[0].rateAmount = parseFloat(sanitizedValue) || 0;
            //   }
            // },

            parsedDates() {
                return this.selectedDates.map(item => {
                    const [datePart, timePart] = item.dateTime.split(', ');
                    const [day, month, year] = datePart.split('/');
                    return new Date(`${year}-${month}-${day}T${timePart}`);
                });
            },

            firstDate() {
                return this.parsedDates[0] || null;
            },

            lastDate() {
                return this.parsedDates[this.parsedDates.length - 1] || null;
            },

            totalNights() {
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
            datesSelected() {
                return this.formAddReservation.checkInDate && this.formAddReservation.checkOutDate;
            },
        },
        beforeDestroy() {
            this.datePicker1Instance?.destroy();
            this.datePicker2Instance?.destroy();
            this.timePicker1Instance?.destroy();
            this.timePicker2Instance?.destroy();

            // console.log('Component is being destroyed:', this.formAddReservation.units);
        },
        emits: ['change'],
        watch: {
            roomCount(newValue) {
                this.formAddReservation.numberRooms = newValue;
            },
            selectedDates: {
                handler(newValue) {
                    if (newValue.length > 0) {
                        // Update enabled dates when selectedDates changes
                        this.datePicker1Instance?.set('enable', [this.firstDate]);
                        this.datePicker2Instance?.set('enable', [this.lastDate]);

                        // Update time pickers
                        this.timePicker1Instance?.setDate(this.firstDate);
                        this.timePicker2Instance?.setDate(this.lastDate);
                    }
                },
                deep: true,
            },
            'formAddReservation.checkInDate': {
                handler(newValue) {
                    this.formAddReservation.releaseDate = newValue;
                },
                immediate: true,
            },
            'formAddReservation.checkInTime': {
                handler(newValue) {
                    this.formAddReservation.releaseTime = newValue;
                },
                immediate: true,
            },
        },
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

        async created() {
            // Initialize store data from localStorage
            await this.$store.dispatch('initializeStore');
        },
    };
</script>

<style scoped>
    .custom-table-wrapper {
        overflow-x: auto;
    }

    .custom-table th {
        min-width: 150px;
        white-space: nowrap;
    }

    .custom-table th {
        min-width: 166px;
    }

    .custom-table th:nth-child(5),
    .custom-table th:nth-child(6) {
        min-width: 100px;
    }
</style>
