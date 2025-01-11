<template>
  <div class="row mx-auto my-3">

    <div class="col-md-12">
      <HeaderReservation>
        <template #button>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Reservations" role="tab" aria-selected="false" tabindex="-1" :class="{ active: activeTab === 'reservations' }" @click.prevent="selectTab('reservations')">
              Reservations
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">{{ reservationsCount.reservations }}</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Arrivals" role="tab" aria-selected="false" tabindex="-1" :class="{ active: activeTab === 'arrivals' }" @click="setActiveTab('arrivals')">
              Arrivals
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">{{ reservationsCount.arrivals }}</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Departures" role="tab" aria-selected="true" :class="{ active: activeTab === 'departures' }" @click="setActiveTab('departures')">
              Departures
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">{{ reservationsCount.departures }}</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-In-house" role="tab" aria-selected="true" :class="{ active: activeTab === 'inHouse' }" @click="setActiveTab('inHouse')">
              In-house
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">{{ reservationsCount.in_house }}</span>
            </button>
          </li>

          <div class="ms-auto me-3">
            <button class="btn" :class="{
              'btn-primary': viewMode === 'card',
              'btn-secondary': viewMode !== 'card',
            }" @click="setViewMode('card')">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button class="btn" :class="{
              'btn-primary': viewMode === 'list',
              'btn-secondary': viewMode !== 'list',
            }" @click="setViewMode('list')">
              <i class="fa-solid fa-list"></i>
            </button>
            <button type="button" class="ms-3 btn btn-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="true">
              <i class="fs-6 me-1 fa-solid fa-arrow-up-right-from-square"></i>
              Export
            </button>
            <ul style="height: 400px; overflow-y: auto" class="dropdown-menu">
              <label class="ms-2">Export As</label>
              <hr class="mb-2 m-0" />
              <div class="d-flex justify-content-around mb-3">
                <div class="form-check">
                  <input name="default-radio-1" class="form-check-input" type="radio" value="PDF" id="exportAsPdf" />
                  <label class="form-check-label" for="exportAsPdf">PDF</label>
                </div>
                <div class="form-check">
                  <input name="default-radio-1" class="form-check-input" type="radio" value="Excel" id="exportAsExcel" />
                  <label class="form-check-label" for="exportAsExcel">Excel</label>
                </div>
              </div>
              <label class="ms-2">Select Column</label>
              <hr class="mb-2 m-0" />
              <div class="app-calendar-events-filter ms-3">
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsResNo" data-value="Res No" />
                  <label class="form-check-label" for="exportAsResNo">Res No.</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsArrivalDate" data-value="Arrival Date" />
                  <label class="form-check-label" for="exportAsArrivalDate">
                    Arrival Date
                  </label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsDepartureDate" data-value="Departure Date" />
                  <label class="form-check-label" for="exportAsDepartureDate">Departure Date</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsGuestName" data-value="Guest Name" />
                  <label class="form-check-label" for="exportAsGuestName">Guest Name</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsVipGuestStatus" data-value="VIP/Guest Status" />
                  <label class="form-check-label" for="exportAsVipGuestStatus">VIP/Guest Status</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsRoom" data-value="Room" />
                  <label class="form-check-label" for="exportAsRoom">Room</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsRate" data-value="Rate" />
                  <label class="form-check-label" for="exportAsRate">Rate</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsRateType" data-value="Rate Type" />
                  <label class="form-check-label" for="exportAsRateType">Rate Type</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsBusinessSource" data-value="Business Source" />
                  <label class="form-check-label" for="exportAsBusinessSource">Business Source</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsTravelAgent" data-value="Travel Agent" />
                  <label class="form-check-label" for="exportAsTravelAgent">Travel Agent</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsCompany" data-value="Company" />
                  <label class="form-check-label" for="exportAsCompany">Company
                  </label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsPax" data-value="PAX" />
                  <label class="form-check-label" for="exportAsPax">PAX</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsNationality" data-value="Nationality" />
                  <label class="form-check-label" for="exportAsNationality">Nationality</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsResType" data-value="  Res. Type" />
                  <label class="form-check-label" for="exportAsResType">
                    Res. Type</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsPhone" data-value="Phone" />
                  <label class="form-check-label" for="exportAsPhone">Phone</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsEmail" data-value="Email" />
                  <label class="form-check-label" for="exportAsEmail">Email</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsRemarks" data-value="Remarks" />
                  <label class="form-check-label" for="exportAsRemarks">Remarks</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input class="form-check-input input-filter" type="checkbox" id="exportAsPreferences" data-value="Preferences" />
                  <label class="form-check-label" for="exportAsPreferences">Preferences</label>
                </div>
              </div>
              <div class="gap-2 d-flex justify-content-center">
                <button class="btn btn-sm btn-secondary">Close</button>
                <button class="btn btn-sm btn-primary">Export</button>
              </div>
            </ul>

            <button class="btn btn-primary waves-effect waves-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd">
              <i class="fs-6 me-1 fa-solid fa-magnifying-glass"></i>
              Search
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
              <div class="offcanvas-header">
                <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">
                  <template v-if="selectedCard">
                    <h6>
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      {{ selectedCard.reserved_by.name }}
                    </h6>
                    <div>
                      <span class="mr-1"><i class="text-primary fa-solid fa-location-dot"></i>
                        {{ selectedCard.location || "Egypt"
                        }}</span>
                      <span><i class="text-primary fa-solid fa-phone"></i>
                        {{ selectedCard.phone || "03252" }}</span>
                    </div>
                    <div class="row mt-4">
                      <div class="col-md-4">

                        <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="navigateToEditReservation(selectedCard.id)"> Edit</button>


                      </div>
                      <div class="col-md-4">
                        <div class="demo-inline-spacing">
                          <div class="btn-group btn-block" id="dropdown-icon-demo">
                            <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
                              OPtion
                            </button>
                            <ul class="dropdown-menu" style="">
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-regular fa-credit-card mr-2"></i>Add Payment</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-calendar-plus mr-2"></i>Amend Stay</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-regular fa-calendar mr-2"></i>Exchange Room</a>
                              </li>

                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-bed mr-2"></i>Room
                                  Move</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-arrow-right-arrow-left mr-2"></i>
                                  Exchange Room</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-hand mr-2"></i>Stop
                                  Room Move</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-utensils mr-2"></i>
                                  Inclusion List</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-regular fa-circle-xmark mr-2"></i>Void Reservation</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="btn-group ms-auto">
                          <button type="button" class="btn btn-outline-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
                            print/Send
                          </button>
                          <ul class="dropdown-menu" style="">
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);">Print invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="javascript:void(0);">Send invoice</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else> Search </template>
                </h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <hr />
              <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
                <!-- Dynamic Content Based on Active Tab -->
                <div v-if="activeTab === 'reservations'">
                  <!-- Only show the heading if no card is selected -->
                  <div v-if="!selectedCard">
                    <div class="form-check form-check-primary mb-2">
                      <input class="form-check-input input-filter" type="checkbox" id="reservationsSearchResDate" data-value="ResDate" aria-label="input  for ResDate" />
                      <label class="form-check-label" for="reservationsSearchResDate">Res Date</label>
                    </div>
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker1" aria-label="input Text to Date" />

                    <div class="form-check form-check-primary mb-2">
                      <input class="form-check-input input-filter" type="checkbox" id="reservationsSearchArrival" data-value="Arrival" />
                      <label class="form-check-label" for="reservationsSearchArrival">Arrival</label>
                    </div>
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker2" aria-label="input Text to Date" />

                    <label for="reservationsBusinessSource" class="col-form-label">Business Source</label>
                    <select class="form-select mb-2" id="reservationsBusinessSource">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="reservationsSearchTravelAgent" class="col-form-label">Travel Agent</label>
                    <select class="form-select mb-2" id="reservationsSearchTravelAgent">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="reservationsSearchCompany" class="col-form-label">Company</label>
                    <select class="form-select mb-2" id="reservationsSearchCompany">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="reservationsSearchRoomtype" class="col-form-label">Room Type</label>
                    <select class="form-select mb-2" id="reservationsSearchRoomtype">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="reservationsSearchStatus" class="col-form-label">Status</label>
                        <select class="form-select mb-2" id="reservationsSearchStatus">
                          <option value="" disabled selected>Active</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                      <div class="col-6">
                        <label for="reservationsSearchResType" class="col-form-label">Res. Type</label>
                        <select class="form-select mb-2" id="reservationsSearchResType">
                          <option value="" disabled selected>-Select-</option>
                          <option value="option1">All</option>
                          <option value="option2">Active</option>
                          <option value="option2">Cancelled</option>
                          <option value="option2">No Show</option>
                          <option value="option2">Void</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="UnassignedRoom" id="reservationsSearchUnassignedRoom" />
                      <label class="form-check-label" for="reservationsSearchUnassignedRoom">
                        Show Unassigned Rooms
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="Hotel Collect" id="reservationsSearchHotelCollect" />
                      <label class="form-check-label" for="reservationsSearchHotelCollect">
                        Hotel Collect
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="Channel Collect and with Deposit" id="reservationsSearchChannelCollect" />
                      <label class="form-check-label" for="reservationsSearchChannelCollect">
                        Channel Collect and with Deposit
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="WithoutDeposit" id="reservationsSearchWithoutDeposit" />
                      <label class="form-check-label" for="reservationsSearchWithoutDeposit">
                        Without Deposit
                      </label>
                    </div>
                  </div>

                  <!-- Only display data if a card is selected -->
                  <div v-if="selectedCard" class="mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Reservation Number</h6>
                                  <small class="text-muted">{{
                                    selectedCard.reservationNo || "1025191591"
                                  }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Arrival Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkin_date || "2024-10-21" }}
                                    {{ selectedCard.checkin_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Booking Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkout_date || "2024-10-21" }}
                                    {{ selectedCard.checkout_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Number</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.number_of_rooms || 5 }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">
                                    <i class="fa-solid fa-person"></i>
                                    <i class="fa-solid fa-child"></i>
                                  </h6>
                                  <small class="text-muted">{{ selectedCard.adults }}
                                    {{ selectedCard.children }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Departure Date</h6>
                                  <small class="text-muted">{{ selectedCard.departureDate || "2024-10-21" }}
                                    {{ selectedCard.departureTime || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Status</h6>
                                  <small class="text-muted badge bg-label-danger ms-1">{{ selectedCard.status || "Pending" }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Type</h6>
                                  <small class="text-muted">{{ selectedCard.roomType || 'Suite شاليهات بخدمات فندقية غرفتين وصاله' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Rate Plan</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.ratePlan || "السعر غير شامل" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Avg. Daily Rate</h6>
                                  <small class="text-muted">{{ selectedCard.dailyRate || '£ 1,350.00' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'arrivals'">
                  <!-- Only show the heading if no card is selected -->
                  <div v-if="!selectedCard">
                    <div class="form-check form-check-primary mb-2">
                      <input class="form-check-input input-filter" type="checkbox" id="arrivalsSearchArrival" data-value="Arrival" />
                      <label class="form-check-label" for="arrivalsSearchArrival">Arrival</label>
                    </div>
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker2" aria-label="input Text to Date" />

                    <label for="arrivalsBusinessSource" class="col-form-label">Business Source</label>
                    <select class="form-select mb-2" id="arrivalsBusinessSource">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="arrivalsSearchTravelAgent" class="col-form-label">Travel Agent</label>
                    <select class="form-select mb-2" id="arrivalsSearchTravelAgent">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="arrivalsSearchCompany" class="col-form-label">Company</label>
                    <select class="form-select mb-2" id="arrivalsSearchCompany">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="arrivalsSearchRoomtype" class="col-form-label">Room Type</label>
                    <select class="form-select mb-2" id="arrivalsSearchRoomtype">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="arrivalsSearchStatus" class="col-form-label">Room</label>
                        <select class="form-select mb-2" id="arrivalsSearchStatus">
                          <option value="" disabled selected>Active</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                      <div class="col-6">
                        <label for="arrivalsSearchResType" class="col-form-label">Res. Type</label>
                        <select class="form-select mb-2" id="arrivalsSearchResType">
                          <option value="" disabled selected>-Select-</option>
                          <option value="option1">All</option>
                          <option value="option2">Active</option>
                          <option value="option2">Cancelled</option>
                          <option value="option2">No Show</option>
                          <option value="option2">Void</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="Guest Checked In Today " id="arrivalsSearchGuestChecked" />
                      <label class="form-check-label" for="arrivalsSearchGuestChecked">
                        Guest Checked In Today
                      </label>
                    </div>
                  </div>

                  <!-- Only display data if a card is selected -->
                  <div v-if="selectedCard" class="mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Reservation Number</h6>
                                  <small class="text-muted">{{
                                    selectedCard.reservationNo || "1025191591"
                                  }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Arrival Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkin_date || "2024-10-21" }}
                                    {{ selectedCard.checkin_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Booking Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkout_date || "2024-10-21" }}
                                    {{ selectedCard.checkout_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Number</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.number_of_rooms || 5 }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">
                                    <i class="fa-solid fa-person"></i>
                                    <i class="fa-solid fa-child"></i>
                                  </h6>
                                  <small class="text-muted">{{ selectedCard.adults }}
                                    {{ selectedCard.children }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Departure Date</h6>
                                  <small class="text-muted">{{ selectedCard.departureDate || "2024-10-21" }}
                                    {{ selectedCard.departureTime || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Status</h6>
                                  <small class="text-muted badge bg-label-danger ms-1">{{ selectedCard.status || "Pending" }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Type</h6>
                                  <small class="text-muted">{{ selectedCard.roomType || 'Suite شاليهات بخدمات فندقية غرفتين وصاله' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Rate Plan</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.ratePlan || "السعر غير شامل" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Avg. Daily Rate</h6>
                                  <small class="text-muted">{{ selectedCard.dailyRate || '£ 1,350.00' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'departures'">
                  <!-- Only show the heading if no card is selected -->
                  <div v-if="!selectedCard">
                    <div class="form-check form-check-primary mb-2">
                      <input class="form-check-input input-filter" type="checkbox" id="departuresSearchDepartureDate" data-value="Departure Date" />
                      <label class="form-check-label" for="departuresSearchDepartureDate">Departure Date</label>
                    </div>
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker2" aria-label="input Text to Date" />

                    <label for="departuresSearchRoomtype" class="col-form-label">Room Type</label>
                    <select class="form-select mb-2" id="departuresSearchRoomtype">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="departuresSearchStatus" class="col-form-label">Room</label>
                        <select class="form-select mb-2" id="arrivalsSearchStatus">
                          <option value="" disabled selected>Active</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="Guest Checked In Today " id="departuresSearchGuestChecked" />
                      <label class="form-check-label" for="departuresSearchGuestChecked">Guest Checked In Today
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="Past Guest Check outs " id="departuresSearchPastGuest" />
                      <label class="form-check-label" for="departuresSearchPastGuest">
                        Past Guest Check outs
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input class="form-check-input" type="checkbox" value="Guest With Balance " id="departuresSearchGuestWith Balance" />
                      <label class="form-check-label" for="departuresSearchGuestWith Balance">
                        Guest With Balance
                      </label>
                    </div>
                  </div>

                  <!-- Only display data if a card is selected -->
                  <div v-if="selectedCard" class="mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Reservation Number</h6>
                                  <small class="text-muted">{{
                                    selectedCard.reservationNo || "1025191591"
                                  }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Arrival Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkin_date || "2024-10-21" }}
                                    {{ selectedCard.checkin_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Booking Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkout_date || "2024-10-21" }}
                                    {{ selectedCard.checkout_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Number</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.number_of_rooms || 5 }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">
                                    <i class="fa-solid fa-person"></i>
                                    <i class="fa-solid fa-child"></i>
                                  </h6>
                                  <small class="text-muted">{{ selectedCard.adults }}
                                    {{ selectedCard.children }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Departure Date</h6>
                                  <small class="text-muted">{{ selectedCard.departureDate || "2024-10-21" }}
                                    {{ selectedCard.departureTime || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Status</h6>
                                  <small class="text-muted badge bg-label-danger ms-1">{{ selectedCard.status || "Pending" }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Type</h6>
                                  <small class="text-muted">{{ selectedCard.roomType || 'Suite شاليهات بخدمات فندقية غرفتين وصاله' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Rate Plan</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.ratePlan || "السعر غير شامل" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Avg. Daily Rate</h6>
                                  <small class="text-muted">{{ selectedCard.dailyRate || '£ 1,350.00' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'inHouse'">
                  <!-- Only show the heading if no card is selected -->
                  <div v-if="!selectedCard">
                    <label for="inHouseSearchBusinessSource" class="col-form-label">Business Source</label>
                    <select class="form-select mb-2" id="inHouseSearchBusinessSource">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="inHouseseTravelAgent" class="col-form-label">Travel Agent</label>
                    <select class="form-select mb-2" id="inHouseSearchTravelAgent">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="inHouseSearchCompany" class="col-form-label">Company</label>
                    <select class="form-select mb-2" id="inHouseSearchCompany">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="inHouseSearchRoomtype" class="col-form-label">Room Type</label>
                    <select class="form-select mb-2" id="inHouseSearchRoomtype">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="inHouseSearchRoom" class="col-form-label">Room</label>
                        <select class="form-select mb-2" id="inHouseSearchRoom">
                          <option value="" disabled selected>Active</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- Only display data if a card is selected -->
                  <div v-if="selectedCard" class="mt-4">
                    <div class="row">
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Reservation Number</h6>
                                  <small class="text-muted">{{
                                    selectedCard.reservationNo || "1025191591"
                                  }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Arrival Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkin_date || "2024-10-21" }}
                                    {{ selectedCard.checkin_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Booking Date</h6>
                                  <small class="text-muted">{{ selectedCard.checkout_date || "2024-10-21" }}
                                    {{ selectedCard.checkout_time || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Number</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.number_of_rooms || 5 }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">
                                    <i class="fa-solid fa-person"></i>
                                    <i class="fa-solid fa-child"></i>
                                  </h6>
                                  <small class="text-muted">{{ selectedCard.adults }}
                                    {{ selectedCard.children }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <ul class="list-unstyled mb-0">
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Departure Date</h6>
                                  <small class="text-muted">{{ selectedCard.departureDate || "2024-10-21" }}
                                    {{ selectedCard.departureTime || "12:00 PM" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Status</h6>
                                  <small class="text-muted badge bg-label-danger ms-1">{{ selectedCard.status || "Pending" }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Room Type</h6>
                                  <small class="text-muted">{{ selectedCard.roomType || 'Suite شاليهات بخدمات فندقية غرفتين وصاله' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Rate Plan</h6>
                                  <small class="text-muted">
                                    {{ selectedCard.ratePlan || "السعر غير شامل" }}</small>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="mb-3 pb-1">
                            <div class="d-flex align-items-start">
                              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                <div class="me-2">
                                  <h6 class="mb-0">Avg. Daily Rate</h6>
                                  <small class="text-muted">{{ selectedCard.dailyRate || '£ 1,350.00' }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="!selectedCard" class="gap-2 d-flex  position-absolute right-0">
                  <button class=" btn btn-secondary">Reset</button>
                  <button class="btn btn-primary">Search</button>
                </div>
                <div v-if="selectedCard" class="new-div mt-3 position-absolute right-0 w-100 px-4 bottom-1">
                  <dl class=" row mb-0">
                    <dt class="col-6 fw-normal text-heading">Total</dt>
                    <dd class="col-6 text-end">{{ selectedCard.total || "0.0 $" }} $</dd>

                    <dt class="col-sm-6 fw-normal">Paid</dt>
                    <dd class="col-sm-6 text-end">{{ selectedCard.paid || "0.0 $" }}$</dd>

                    <dt class="col-6 fw-normal text-danger">Balance</dt>
                    <dd class="col-6 text-end text-danger">
                      {{ selectedCard.balance || "0.0 $" }}$
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <!-- reservations  -->

          <div class="tab-pane fade active show" id="form-tabs-Reservations" role="tabpanel">

            <div class="row">
              <div v-if="viewMode === 'list'" class="table-responsive text-nowrap" style="overflow: visible; cursor: pointer;">
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th>Guest Name</th>
                      <th>Res. No. Voucher No</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Room Details</th>
                      <th>Total ($)</th>
                      <th>Paid ($)</th>
                      <th>Balance ($)</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">

                    <tr @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                      <td>
                        <h5 class=" m-0 me-2">{{ card.reserved_by.name }}</h5>
                        <div>
                          <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                          <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                        </div>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.Voucher || '14541' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkin_date }}</p>
                        <p class="m-0 me-2">{{ card.checkin_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkout_date }}</p>
                        <p class="m-0 me-2">{{ card.checkout_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.room_details || '104 - Suite الفندق غرفتين وصاله' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.total || '0.00' }}$</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.paid || '0.00' }}$</p>
                      </td>
                      <td class="d-flex justify-content-between border-bottom-0">
                        <p class="m-0 me-2 text-danger">{{ card.balance || '0.00' }}$</p>
                        <div class="btn-group " id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                          <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show right-0" data-popper-placement="bottom-end">
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>



                  </tbody>
                </table>

              </div>
              <div v-else class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0 cursor-pointer" @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                <div class="card h-100">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <div class="card-title mb-0 d-flex">
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      <h5 class="m-0 me-2">{{ card.reserved_by.name }}</h5>
                      <p>{{ card.id }}</p>
                    </div>
                    <div class="btn-group" id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                      <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show" data-popper-placement="bottom-end">
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                        </li>
                      </ul>
                    </div>


                  </div>
                  <div class="card-body">
                    <div id="deliveryExceptionsChart">
                      <div class="row d-flex align-items-center justify-content-center text-center mb-3">
                        <div class="bg-light col-md-5">
                          <div class="text-dark">{{ card.checkin_date }}</div>
                          <div>{{ card.checkin_time || '00:00:00' }}</div>
                        </div>
                        <div class="bg-secondary col-md-2">
                          <div class="text-dark"> {{ (new Date(card.checkout_date) - new Date(card.checkin_date)) / (1000 * 3600 * 24) }}
                          </div>
                          <div>Nights</div>
                        </div>
                        <div class="bg-light col-md-5">
                          <div class="text-dark"> {{ card.checkout_date }}</div>
                          <div> {{ card.checkout_time || '15:00:00' }}</div>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-10">
                          <div>Booking Date</div>
                          <div>{{ 'card.booking_source[0] ' || "2024-12-02T07:43:11.000000Z" }}</div>
                        </div>
                        <div class="col-md-2">
                          <div>
                            <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                            <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div>Room / Rate Type</div>
                          <div>202 / السعر غير شامل</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10">Total</div>
                        <div class="col-md-2">$230</div>
                        <div class="col-md-10">Paid</div>
                        <div class="col-md-2">$250</div>
                        <div class="col-md-10 text-danger">Balance</div>
                        <div class="col-md-2 text-danger">$20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="tabData[activeTab].meta.total > tabData[activeTab].meta.per_page">
              <ThePagination v-if="tabData[activeTab].meta.total > tabData[activeTab].meta.per_page" :current-page="tabData[activeTab].meta.current_page" :total-pages="tabData[activeTab].meta.last_page" @page-changed="changePage(activeTab, $event)" />
            </div>
          </div>
          <!-- Arrivals  -->
          <div class="tab-pane fade" id="form-tabs-Arrivals" role="tabpanel">
            <div class="row">
              <div v-if="viewMode === 'list'" class="table-responsive text-nowrap" style="overflow: visible; cursor: pointer;">
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th>Guest Name</th>
                      <th>Res. No. Voucher No</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Room Details</th>
                      <th>Total ($)</th>
                      <th>Paid ($)</th>
                      <th>Balance ($)</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">

                    <tr @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                      <td>
                        <h5 class=" m-0 me-2">{{ card.reserved_by.name }}</h5>
                        <div>
                          <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                          <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                        </div>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.Voucher || '14541' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkin_date }}</p>
                        <p class="m-0 me-2">{{ card.checkin_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkout_date }}</p>
                        <p class="m-0 me-2">{{ card.checkout_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.room_details || '104 - Suite الفندق غرفتين وصاله' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.total || '0.00' }}$</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.paid || '0.00' }}$</p>
                      </td>
                      <td class="d-flex justify-content-between border-bottom-0">
                        <p class="m-0 me-2 text-danger">{{ card.balance || '0.00' }}$</p>
                        <div class="btn-group " id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                          <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show right-0" data-popper-placement="bottom-end">
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>



                  </tbody>
                </table>

              </div>
              <div v-else class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0 cursor-pointer" @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                <div class="card h-100">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <div class="card-title mb-0 d-flex">
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      <h5 class="m-0 me-2">{{ card.reserved_by.name }}</h5>
                      <p>{{ card.id }}</p>
                    </div>
                    <div class="btn-group" id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                      <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show" data-popper-placement="bottom-end">
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                        </li>
                      </ul>
                    </div>


                  </div>
                  <div class="card-body">
                    <div id="deliveryExceptionsChart">
                      <div class="row d-flex align-items-center justify-content-center text-center mb-3">
                        <div class="bg-light col-md-5">
                          <div class="text-dark">{{ card.checkin_date }}</div>
                          <div>{{ card.checkin_time || '00:00:00' }}</div>
                        </div>
                        <div class="bg-secondary col-md-2">
                          <div class="text-dark"> {{ (new Date(card.checkout_date) - new Date(card.checkin_date)) / (1000 * 3600 * 24) }}
                          </div>
                          <div>Nights</div>
                        </div>
                        <div class="bg-light col-md-5">
                          <div class="text-dark"> {{ card.checkout_date }}</div>
                          <div> {{ card.checkout_time || '15:00:00' }}</div>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-10">
                          <div>Booking Date</div>
                          <div>{{ 'card.booking_source[0] ' || "2024-12-02T07:43:11.000000Z" }}</div>
                        </div>
                        <div class="col-md-2">
                          <div>
                            <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                            <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div>Room / Rate Type</div>
                          <div>202 / السعر غير شامل</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10">Total</div>
                        <div class="col-md-2">$230</div>
                        <div class="col-md-10">Paid</div>
                        <div class="col-md-2">$250</div>
                        <div class="col-md-10 text-danger">Balance</div>
                        <div class="col-md-2 text-danger">$20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ThePagination v-if="tabData[activeTab].meta.total > tabData[activeTab].meta.per_page" :current-page="tabData[activeTab].meta.current_page" :total-pages="tabData[activeTab].meta.last_page" @page-changed="changePage(activeTab, $event)" />
          </div>
          <!-- Departures  -->
          <div class="tab-pane fade" id="form-tabs-Departures" role="tabpanel">
            <div class="row">
              <div v-if="viewMode === 'list'" class="table-responsive text-nowrap" style="overflow: visible; cursor: pointer;">
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th>Guest Name</th>
                      <th>Res. No. Voucher No</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Room Details</th>
                      <th>Total ($)</th>
                      <th>Paid ($)</th>
                      <th>Balance ($)</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">

                    <tr @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                      <td>
                        <h5 class=" m-0 me-2">{{ card.reserved_by.name }}</h5>
                        <div>
                          <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                          <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                        </div>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.Voucher || '14541' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkin_date }}</p>
                        <p class="m-0 me-2">{{ card.checkin_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkout_date }}</p>
                        <p class="m-0 me-2">{{ card.checkout_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.room_details || '104 - Suite الفندق غرفتين وصاله' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.total || '0.00' }}$</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.paid || '0.00' }}$</p>
                      </td>
                      <td class="d-flex justify-content-between border-bottom-0">
                        <p class="m-0 me-2 text-danger">{{ card.balance || '0.00' }}$</p>
                        <div class="btn-group " id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                          <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show right-0" data-popper-placement="bottom-end">
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div v-else class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0 cursor-pointer" @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                <div class="card h-100">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <div class="card-title mb-0 d-flex">
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      <h5 class="m-0 me-2">{{ card.reserved_by.name }}</h5>
                      <p>{{ card.id }}</p>
                    </div>
                    <div class="btn-group" id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                      <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show" data-popper-placement="bottom-end">
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                        </li>
                      </ul>
                    </div>


                  </div>
                  <div class="card-body">
                    <div id="deliveryExceptionsChart">
                      <div class="row d-flex align-items-center justify-content-center text-center mb-3">
                        <div class="bg-light col-md-5">
                          <div class="text-dark">{{ card.checkin_date }}</div>
                          <div>{{ card.checkin_time || '00:00:00' }}</div>
                        </div>
                        <div class="bg-secondary col-md-2">
                          <div class="text-dark"> {{ (new Date(card.checkout_date) - new Date(card.checkin_date)) / (1000 * 3600 * 24) }}
                          </div>
                          <div>Nights</div>
                        </div>
                        <div class="bg-light col-md-5">
                          <div class="text-dark"> {{ card.checkout_date }}</div>
                          <div> {{ card.checkout_time || '15:00:00' }}</div>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-10">
                          <div>Booking Date</div>
                          <div>{{ 'card.booking_source[0] ' || "2024-12-02T07:43:11.000000Z" }}</div>
                        </div>
                        <div class="col-md-2">
                          <div>
                            <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                            <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div>Room / Rate Type</div>
                          <div>202 / السعر غير شامل</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10">Total</div>
                        <div class="col-md-2">$230</div>
                        <div class="col-md-10">Paid</div>
                        <div class="col-md-2">$250</div>
                        <div class="col-md-10 text-danger">Balance</div>
                        <div class="col-md-2 text-danger">$20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ThePagination v-if="tabData[activeTab].meta.total > tabData[activeTab].meta.per_page" :current-page="tabData[activeTab].meta.current_page" :total-pages="tabData[activeTab].meta.last_page" @page-changed="changePage(activeTab, $event)" />
          </div>
          <!-- In-house  -->
          <div class="tab-pane fade" id="form-tabs-In-house" role="tabpanel">
            <div class="row">
              <div v-if="viewMode === 'list'" class="table-responsive text-nowrap" style="overflow: visible; cursor: pointer;">
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th>Guest Name</th>
                      <th>Res. No. Voucher No</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Room Details</th>
                      <th>Total ($)</th>
                      <th>Paid ($)</th>
                      <th>Balance ($)</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">

                    <tr @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                      <td>
                        <h5 class=" m-0 me-2">{{ card.reserved_by.name }}</h5>
                        <div>
                          <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                          <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                        </div>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.Voucher || '14541' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkin_date }}</p>
                        <p class="m-0 me-2">{{ card.checkin_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.checkout_date }}</p>
                        <p class="m-0 me-2">{{ card.checkout_time }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.room_details || '104 - Suite الفندق غرفتين وصاله' }}</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.total || '0.00' }}$</p>
                      </td>
                      <td>
                        <p class="m-0 me-2">{{ card.paid || '0.00' }}$</p>
                      </td>
                      <td class="d-flex justify-content-between border-bottom-0">
                        <p class="m-0 me-2 text-danger">{{ card.balance || '0.00' }}$</p>
                        <div class="btn-group " id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                          <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show right-0" data-popper-placement="bottom-end">
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>



                  </tbody>
                </table>

              </div>
              <div v-else class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0 cursor-pointer" @click="openOffcanvas(card)" v-for="card in reservations" :key="card.id">
                <div class="card h-100">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <div class="card-title mb-0 d-flex">
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      <h5 class="m-0 me-2">{{ card.reserved_by.name }}</h5>
                      <p>{{ card.id }}</p>
                    </div>
                    <div class="btn-group" id="hover-dropdown-demo" @mouseenter="toggleMenu(card.id, true)" @mouseleave="toggleMenu(card.id, false)">
                      <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul v-show="hoveredMenu[card.id]" class="dropdown-menu show" data-popper-placement="bottom-end">
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-file-circle-plus mr-2"></i>Print Invoice</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-calendar-plus mr-2"></i>Add New Booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"><i class="fa-solid fa-list-check mr-2"></i>Audit Trail</a>
                        </li>
                      </ul>
                    </div>


                  </div>
                  <div class="card-body">
                    <div id="deliveryExceptionsChart">
                      <div class="row d-flex align-items-center justify-content-center text-center mb-3">
                        <div class="bg-light col-md-5">
                          <div class="text-dark">{{ card.checkin_date }}</div>
                          <div>{{ card.checkin_time || '00:00:00' }}</div>
                        </div>
                        <div class="bg-secondary col-md-2">
                          <div class="text-dark"> {{ (new Date(card.checkout_date) - new Date(card.checkin_date)) / (1000 * 3600 * 24) }}
                          </div>
                          <div>Nights</div>
                        </div>
                        <div class="bg-light col-md-5">
                          <div class="text-dark"> {{ card.checkout_date }}</div>
                          <div> {{ card.checkout_time || '15:00:00' }}</div>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-10">
                          <div>Booking Date</div>
                          <div>{{ 'card.booking_source[0] ' || "2024-12-02T07:43:11.000000Z" }}</div>
                        </div>
                        <div class="col-md-2">
                          <div>
                            <i class="fa-solid fa-person"></i>{{ card.children || '0' }}
                            <i class="fa-solid fa-child"></i>{{ card.adults || '0' }}
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div>Room / Rate Type</div>
                          <div>202 / السعر غير شامل</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-10">Total</div>
                        <div class="col-md-2">$230</div>
                        <div class="col-md-10">Paid</div>
                        <div class="col-md-2">$250</div>
                        <div class="col-md-10 text-danger">Balance</div>
                        <div class="col-md-2 text-danger">$20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ThePagination v-if="tabData[activeTab].meta.total > tabData[activeTab].meta.per_page" :current-page="tabData[activeTab].meta.current_page" :total-pages="tabData[activeTab].meta.last_page" @page-changed="changePage(activeTab, $event)" />
          </div>

        </template>
      </HeaderReservation>
    </div>
  </div>
</template>


<script>
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";
import { getReservationData } from "../components/Api/api";
import ThePagination from "../components/layout/ThePagination.vue";
import flatpickrMixin from "../components/Mixin/flatpickrMixin";

export default {
  name: "reservations",
  layout: "main",
  components: {
    HeaderReservation,
    ThePagination
  },
  data ()
  {
    return {
      viewMode: "card", // default view mode is card view
      hoveredMenu: {}, // Object to track hover state of each menu
      selectedCard: null, // Store the data for the selected card
      activeTab: "reservations", // Default active tab
      reservations: [],
      reservationsCount: [],
      tabData: {
        reservations: {
          data: [], error: null, meta: {
            total: 0,
            count: 0,
            per_page: 10,
            current_page: 1,
            total_pages: 0,
            from: 0,
            last_page: 0,
            path: '',
            to: 0
          }
        },
        arrivals: {
          data: [], error: null, meta: {
            total: 0,
            count: 0,
            per_page: 10,
            current_page: 1,
            total_pages: 0,
            from: 0,
            last_page: 0,
            path: '',
            to: 0
          }
        },
        departures: {
          data: [], error: null, meta: {
            total: 0,
            count: 0,
            per_page: 10,
            current_page: 1,
            total_pages: 0,
            from: 0,
            last_page: 0,
            path: '',
            to: 0
          }
        },
        inhouse: {
          data: [],
          error: null,
          meta: {
            total: 0,
            count: 0,
            per_page: 10,
            current_page: 1,
            total_pages: 0,
            from: 0,
            last_page: 0,
            path: '',
            to: 0
          }
        }

      },
      tabsMap: {
        reservations: 'reservations',
        arrivals: 'arrivals',
        departures: 'departures',
        inhouse: 'in_house'
      },


    };
  },
  methods: {
    toggleMenu (cardId, state)
    {
      this.$set(this.hoveredMenu, cardId, state); // Dynamically set hover state
    }
    ,
    viewCardDetails (id)
    {
      this.$router.push(`/reservations-data/${id}`);
    },
    setViewMode (mode)
    {
      this.viewMode = mode;
    },
    setActiveTab (tab)
    {
      this.activeTab = tab;
    },
    openOffcanvas (card)
    {
      this.selectedCard = card; // Set the selected card

      // Open the off-canvas
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasEnd")
      );
      offcanvas.show();
    },
    resetSelections ()
    {
      this.selectedCard = null; // Reset selected card
      this.selectedList = null; // Reset selected list
    },
    navigateToEditReservation (id)
    {
      this.$router.push(`/edit-reservation/${id}`);
    },
    async GetTabData (tab)
    {
      console.log('Fetching data for tab:', tab);

      const type = this.tabsMap[tab];
      const { current_page, per_page } = this.tabData[tab].meta;
      try {
        const responseData = await getReservationData(tab, current_page, per_page);
        console.log('Server Response:', responseData); // Debugging

        this.tabData[tab].data = responseData;
        this.reservations = responseData.data.data;
        this.tabData[tab].meta = responseData.data.meta || {
        total: 0,
        count: 0,
        per_page: 10,
        current_page: 1,
        total_pages: 0,
        from: 0,
        last_page: 0,
        path: '',
        to: 0
      };
        this.reservationsCount = responseData.data.reservations_count;
      } catch (error) {
        this.tabData[tab].error = error;
      } finally {
        this.tabData[tab].loading = false;
      }
    },
    selectTab (tab)
    {
      // console.log('selectTab', tab);

      this.activeTab = tab;
    },
    changePage (tab, page)
    {
      if (page < 1 || page > this.tabData[tab].meta.last_page) return; // Prevent invalid page numbers
      this.tabData[tab].meta.current_page = page; // Update current page
      this.GetTabData(tab); // Fetch data for the new page
    }
  },

  async mounted ()
  {

    const offcanvas = document.getElementById("offcanvasEnd");
    offcanvas.addEventListener("hidden.bs.offcanvas", this.resetSelections);
    this.GetTabData(this.activeTab);

  },
  beforeDestroy ()
  {
    // Clean up event listener
    const offcanvas = document.getElementById("offcanvasEnd");
    offcanvas.removeEventListener("hidden.bs.offcanvas", this.resetSelections);
  },
  watch: {
    activeTab: function (newTab)
    {
      this.GetTabData(newTab);
    }
  },
  computed: {
    totalPages ()
    {
      return (tab) => this.tabData[tab].meta.last_page;
    },
    pages ()
    {
      return (tab) =>
      {
        const pages = [];
        const total = this.totalPages(tab);
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
        return pages;
      };
    }
  },
  mixins: [flatpickrMixin],
};
</script>

<style></style>
