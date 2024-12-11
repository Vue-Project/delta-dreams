<template>
  <div class="row mx-auto my-3">
    <div class="col-md-12">
      <HeaderReservation>
        <template #button>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-Reservations"
              role="tab"
              aria-selected="false"
              tabindex="-1"
              :class="{ active: activeTab === 'reservations' }"
              @click="setActiveTab('reservations')"
            >
              Reservations
              <span
                class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1"
                >2</span
              >
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-Arrivals"
              role="tab"
              aria-selected="false"
              tabindex="-1"
              :class="{ active: activeTab === 'arrivals' }"
              @click="setActiveTab('arrivals')"
            >
              Arrivals
              <span
                class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1"
                >1</span
              >
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-Departures"
              role="tab"
              aria-selected="true"
              :class="{ active: activeTab === 'departures' }"
              @click="setActiveTab('departures')"
            >
              Departures
              <span
                class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1"
                >1</span
              >
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-In-house"
              role="tab"
              aria-selected="true"
              :class="{ active: activeTab === 'inHouse' }"
              @click="setActiveTab('inHouse')"
            >
              In-house
              <span
                class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1"
                >1</span
              >
            </button>
          </li>

          <div class="ms-auto me-3">
            <button
              class="btn"
              :class="{
                'btn-primary': viewMode === 'card',
                'btn-secondary': viewMode !== 'card',
              }"
              @click="setViewMode('card')"
            >
              <i class="fa-solid fa-grip"></i>
            </button>
            <button
              class="btn"
              :class="{
                'btn-primary': viewMode === 'list',
                'btn-secondary': viewMode !== 'list',
              }"
              @click="setViewMode('list')"
            >
              <i class="fa-solid fa-list"></i>
            </button>
            <button
              type="button"
              class="ms-3 btn btn-primary dropdown-toggle waves-effect waves-light"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <i class="fs-6 me-1 fa-solid fa-arrow-up-right-from-square"></i>
              Export
            </button>
            <ul style="height: 400px; overflow-y: auto" class="dropdown-menu">
              <label class="ms-2">Export As </label>
              <hr class="mb-2 m-0" />
              <div class="d-flex justify-content-around mb-3">
                <div class="form-check">
                  <input
                    name="default-radio-1"
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="defaultRadio2"
                    checked=""
                  />
                  <label class="form-check-label" for="defaultRadio2"
                    >PDF</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="default-radio-1"
                    class="form-check-input"
                    type="radio"
                    value=""
                    id="defaultRadio2"
                    checked=""
                  />
                  <label class="form-check-label" for="defaultRadio2"
                    >Excel</label
                  >
                </div>
              </div>
              <label for="" class="ms-2">Select Column</label>
              <hr class="mb-2 m-0" />
              <div class="app-calendar-events-filter ms-3">
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal"
                    >Personal</label
                  >
                </div>
              </div>
              <div class="gap-2 d-flex justify-content-end">
                <button class="btn btn-sm btn-secondary">Close</button>
                <button class="btn btn-sm btn-primary">Export</button>
              </div>
            </ul>
            <button
              class="btn btn-primary waves-effect waves-light"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasEnd"
              aria-controls="offcanvasEnd"
            >
              <i class="fs-6 me-1 fa-solid fa-magnifying-glass"></i>
              Search
            </button>
            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasEnd"
              aria-labelledby="offcanvasEndLabel"
            >
              <div class="offcanvas-header">
                <h5 id="offcanvasEndLabel" class="offcanvas-title">Search</h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <hr class="m-0" />

              <!-- Dynamic Content Based on Active Tab -->
              <div v-if="activeTab === 'reservations'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <div class="form-check form-check-primary mb-2">
                      <input
                        class="form-check-input input-filter"
                        type="checkbox"
                        id=">ResDate"
                        data-value="personal"
                        checked=""
                      />
                      <label class="form-check-label" for=">ResDate"
                        >Res Date</label
                      >

                      <!-- date input   -->
                    </div>
                    <div class="form-check form-check-primary mb-2">
                      <input
                        class="form-check-input input-filter"
                        type="checkbox"
                        id="Arrival"
                        data-value="personal"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival"
                        >Arrival</label
                      >
                      <!-- Date input  -->
                    </div>
                    <label for="MarketCode" class="col-form-label"
                      >Business Source</label
                    >
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Travel Agent</label
                    >
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Company</label
                    >
                    <select class="form-select mb-2" id="Company">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Room Type</label
                    >
                    <select class="form-select mb-2" id="Roomtype">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Status</label
                        >
                        <select class="form-select mb-2" id="Status">
                          <option value="" disabled selected>Active</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Res. Type</label
                        >
                        <select class="form-select mb-2" id="Status">
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
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="Arrival"
                        checked=""
                      />
                      <label class="form-check-label" for="UnassignedRoom">
                        Show Unassigned Rooms
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="UnassignedRoom"
                        checked=""
                      />
                      <label class="form-check-label" for="HotelCollect">
                        Hotel Collect
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="HotelCollect"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival">
                        Channel Collect and with Deposit
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="Arrival"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival">
                        Without Deposit
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'arrivals'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <div class="form-check form-check-primary mb-2 mt-3">
                      <input
                        class="form-check-input input-filter"
                        type="checkbox"
                        id="Arrival"
                        data-value="personal"
                        checked=""
                      />
                      <label class="form-check-label " for="Arrival"
                        >Arrival</label
                      >
                      <!-- Date input  -->
                    </div>
                    <label for="MarketCode" class="col-form-label"
                      >Business Source</label
                    >
                    <select class="form-select mb-2" id="TravelAgent">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="TravelAgent" class="col-form-label"
                      >Travel Agent</label
                    >
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Company</label
                    >
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>

                    <label for="MarketCode" class="col-form-label"
                      >Room Type</label
                    >
                    <select class="form-select mb-2" id="Roomtype">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Room</label
                        >
                        <select class="form-select mb-2" id="Status">
                          <option value="" disabled selected>Active</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Res. Type</label
                        >
                        <select class="form-select mb-2" id="Status">
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
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="Arrival"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival">
                        Guest Checked in Details
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'departures'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <diV>
                      <label class="form-check-label " for="DepratureDate"
                        >Deprature Date</label
                      >
                      <!-- Date input  -->

                    </diV>

                    <label for="MarketCode" class="col-form-label"
                      >Room Type</label
                    >
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Room</label
                        >
                        <select class="form-select mb-2" id="MarketCode">
                          <option value="" disabled selected>-select-</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="HotelCollect"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival">
                        Guest Checked Out Today
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="HotelCollect"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival">
                        Past Guest Check outs
                      </label>
                    </div>
                    <div class="form-check mt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="HotelCollect"
                        checked=""
                      />
                      <label class="form-check-label" for="Arrival">
                        Guest With Balance
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'inHouse'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label"
                      >Business Source</label
                    >
                    <select class="form-select mb-2" id="TravelAgent">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Travel Agent</label
                    >
                    <select class="form-select mb-2" id="TravelAgent">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Company</label
                    >
                    <select class="form-select mb-2" id="Company">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <label for="MarketCode" class="col-form-label"
                      >Room Type</label
                    >
                    <select class="form-select mb-2" id="RoomType">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <div class="row">
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Room</label
                        >
                        <select class="form-select mb-2" id="MarketCode">
                          <option value="" disabled selected>-select-</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="gap-2 d-flex justify-content-end resetSearch">
                <button class="btn btn-secondary">Reset</button>
                <button class="btn btn-primary">Search</button>
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <div
            class="tab-pane fade active show"
            id="form-tabs-Reservations"
            role="tabpanel"
          >
            <div
              v-if="viewMode === 'list'"
              class="table-responsive text-nowrap"
            >
              <table class="table" style="overflow: hidden">
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
                    <th></th>
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                  <tr class="border-bottom">
                    <td>
                      <div class="d-flex align-items-center">
                        <i
                          class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"
                        ></i>
                        <div class="card-title mb-0">
                          <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                          <div>
                            <i class="fa-solid fa-person m-2"></i>3
                            <i class="fa-solid fa-child m-2"></i>2
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>14527</td>
                    <td>
                      <div class="text-dark">02/12/2024</div>
                      <div>08:43:01 pm</div>
                    </td>
                    <td>
                      <div class="text-dark">02/12/2024</div>
                      <div>08:43:01 pm</div>
                    </td>
                    <td>202 - Suite الفندق غرفتين وصاله السعر غير شامل</td>
                    <td>$230</td>
                    <td>$250</td>
                    <td class="text-danger">$20</td>
                    <td>
                      <div
                        class="btn-group"
                        id="hover-dropdown-demo "
                        @mouseenter="isHovered = true"
                        @mouseleave="isHovered = false"
                      >
                        <button
                          type="button"
                          class="btn btn-primary waves-effect waves-light show"
                          style="border: 0; box-shadow: none"
                        >
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul
                          v-show="isHovered"
                          class="dropdown-menu show"
                          data-popper-placement=" bottom-end"
                        >
                          <li>
                            <a class="dropdown-item" href="#">Print Invoice</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#"
                              >Add New Booking</a
                            >
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">Audit Trail</a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr class="border-bottom">
                    <td>
                      <div class="d-flex align-items-center">
                        <i
                          class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"
                        ></i>
                        <div class="card-title mb-0">
                          <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                          <div>
                            <i class="fa-solid fa-person m-2"></i>3
                            <i class="fa-solid fa-child m-2"></i>2
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>14527</td>
                    <td>
                      <div class="text-dark">02/12/2024</div>
                      <div>08:43:01 pm</div>
                    </td>
                    <td>
                      <div class="text-dark">02/12/2024</div>
                      <div>08:43:01 pm</div>
                    </td>
                    <td>202 - Suite الفندق غرفتين وصاله السعر غير شامل</td>
                    <td>$230</td>
                    <td>$250</td>
                    <td class="text-danger">$20</td>
                    <td >
                      <div
                        class="btn-group"
                        id="hover-dropdown-demo "
                        @mouseenter="isHovered = true"
                        @mouseleave="isHovered = false"
                      >
                        <button
                          type="button"
                          class="btn btn-primary waves-effect waves-light show"
                          style="border: 0; box-shadow: none"
                        >
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul
                          v-show="isHovered"
                          class="dropdown-menu show"
                          data-popper-placement=" bottom-end"
                        >
                          <li>
                            <a class="dropdown-item" href="#">Print Invoice</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#"
                              >Add New Booking</a
                            >
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">Audit Trail</a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              v-else
              class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0"
            >
              <div class="card h-100">
                <div
                  class="card-header d-flex align-items-center justify-content-between"
                >
                  <div class="card-title mb-0 d-flex">
                    <i
                      class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"
                    ></i>
                    <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                    <p>14527</p>
                  </div>

                  <div
                    class="btn-group"
                    id="hover-dropdown-demo "
                    @mouseenter="isHovered = true"
                    @mouseleave="isHovered = false"
                  >
                    <div
                      class="btn-group"
                      id="hover-dropdown-demo "
                      @mouseenter="isHovered = true"
                      @mouseleave="isHovered = false"
                    >
                      <button
                        type="button"
                        class="btn btn-primary waves-effect waves-light show"
                        style="border: 0; box-shadow: none"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul
                        v-show="isHovered"
                        class="dropdown-menu show"
                        data-popper-placement=" bottom-end"
                      >
                        <li>
                          <a class="dropdown-item" href="#">Print Invoice</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">Add New Booking</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">Audit Trail</a>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div id="deliveryExceptionsChart">
                    <div
                      class="row d-flex align-items-center justify-content-center text-center mb-3"
                    >
                      <div class="bg-light col-md-5">
                        <div class="text-dark">02/12/2024</div>
                        <div>08:43:01 pm</div>
                      </div>
                      <div class="bg-secondary col-md-2">
                        <div class="text-dark">5</div>
                        <div>Nights</div>
                      </div>
                      <div class="bg-light col-md-5">
                        <div class="text-dark">02/12/2024</div>
                        <div>08:43:01 pm</div>
                      </div>
                    </div>
                    <div class="row mb-5">
                      <div class="col-md-10">
                        <div>Booking Date</div>
                        <div>02/12/2024</div>
                      </div>
                      <div class="col-md-2">
                        <div>
                          <i class="fa-solid fa-person"></i>3
                          <i class="fa-solid fa-child"></i>2
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

          <!-- Arrivals  -->
          <div
            class="tab-pane fade"
            id="form-tabs-Arrivals"
            role="tabpanel"
          ></div>
          <!-- Departures  -->
          <div
            class="tab-pane fade"
            id="form-tabs-Departures"
            role="tabpanel"
          ></div>
          <!-- In-house  -->
          <div
            class="tab-pane fade"
            id="form-tabs-In-house"
            role="tabpanel"
          ></div>
        </template>
      </HeaderReservation>
    </div>
  </div>
</template>

<script>
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";

export default {
  name: "reservations",
  layout: "main",
  components: {
    HeaderReservation,
  },
  data() {
    return {
      viewMode: "card", // default view mode is card view
      isHovered: false,
      activeTab: "reservations", // Default active tab

      reservations: [
        {
          id: 1,
          guestName: "مصطفي مدبولي",
          reservationNo: "14527",
          arrivalDate: "02/12/2024",
          arrivalTime: "08:43:01 pm",
          departureDate: "02/12/2024",
          departureTime: "08:43:01 pm",
          roomDetails: "202 - Suite الفندق غرفتين وصاله السعر غير شامل",
          total: 230,
          paid: 250,
          balance: -20,
          adults: 3,
          children: 2,
          nights: 5,
        },
      ],
    };
  },
  methods: {
    setViewMode(mode) {
      this.viewMode = mode;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style>
.resetSearch {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 10px;
}
</style>
