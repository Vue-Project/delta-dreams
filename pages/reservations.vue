<template>
  <div class="row mx-auto my-3">
    <div class="col-md-12">
      <HeaderReservation>
        <template #button>
          <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#form-tabs-Reservations" role="tab" aria-selected="false" tabindex="-1" :class="{ active: activeTab === 'reservations' }" @click="setActiveTab('reservations')">
              Reservations
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">2</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Arrivals" role="tab" aria-selected="false" tabindex="-1" :class="{ active: activeTab === 'arrivals' }" @click="setActiveTab('arrivals')">
              Arrivals
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">1</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Departures" role="tab" aria-selected="true" :class="{ active: activeTab === 'departures' }" @click="setActiveTab('departures')">
              Departures
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">1</span>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-In-house" role="tab" aria-selected="true" :class="{ active: activeTab === 'inHouse' }" @click="setActiveTab('inHouse')">
              In-house
              <span class="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger ms-1">1</span>
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

            <button class="btn btn-primary waves-effect waves-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd">
              <i class="fs-6 me-1 fa-solid fa-magnifying-glass"></i>
              Search
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
              <div class="offcanvas-header">
                <h5 id="offcanvasEndLabel" class="offcanvas-title">
                  Offcanvas End
                </h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <hr />
              <!-- <div class="row">
                <div class="col-md-10 m-auto">
                  <label for="MarketCode" class="col-form-label">Business Source</label>
                  <select class="form-select mb-2" id="MarketCode">
                    <option value="" disabled selected>-select-</option>
                    <option value="option1">item</option>
                    <option value="option2">item</option>
                    <h3>geong3ng4iong</h3>
                  </select>
                </div>
              </div> -->

              <!-- Dynamic Content Based on Active Tab -->
              <div v-if="activeTab === 'reservations'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <!-- Only show the heading if no card is selected -->
                    <h1 v-if="!selectedCard">reservations</h1>

                    <!-- Only display data if a card is selected -->
                    <div v-if="selectedCard" class="mt-4">
                      <h1>{{ selectedCard.guestName }}</h1>
                      <p>Reservation No: {{ selectedCard.reservationNo }}</p>
                      <p>
                        Arrival: {{ selectedCard.arrivalDate }}
                        {{ selectedCard.arrivalTime }}
                      </p>
                      <p>
                        Departure: {{ selectedCard.departureDate }}
                        {{ selectedCard.departureTime }}
                      </p>
                      <p>Room Details: {{ selectedCard.roomDetails }}</p>
                      <p>Total: {{ selectedCard.total }} USD</p>
                      <p>Paid: {{ selectedCard.paid }} USD</p>
                      <p>Balance: {{ selectedCard.balance }} USD</p>
                    </div>

                    <!-- Default message when no card is selected -->
                    <div v-else>
                      <p>No Reservation Selected</p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'arrivals'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label">Company</label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <h1>arrivals</h1>
                  </div>
                </div>
              </div>

              <div v-if="activeTab === 'departures'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label">Room Type</label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                  </div>
                </div>
                <h1>departures</h1>
              </div>

              <div v-if="activeTab === 'inHouse'">
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label">Room</label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                    <h1>inHouse</h1>
                  </div>
                </div>
              </div>

              <div class="gap-2 d-flex justify-content-end">
                <button class="btn btn-secondary">Reset</button>
                <button class="btn btn-primary">Search</button>
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <div class="tab-pane fade active show" id="form-tabs-Reservations" role="tabpanel" v-if="activeTab === 'reservations'">
            <div class="row">
              <!-- Loop through reservations to display cards -->
              <!-- <div class="col-md-4" v-for="card in reservations" :key="card.reservationNo">
                <div class="card" style="cursor: pointer">
                  <img src="https://via.placeholder.com/150" class="card-img-top" alt="card image" />
                  <div class="card-body">
                    <h5 class="card-title">{{ card.guestName }}</h5>
                    <p class="card-text">
                      Reservation No: {{ card.reservationNo }}
                    </p>
                    <p class="card-text">
                      Arrival: {{ card.arrivalDate }} {{ card.arrivalTime }}
                    </p>
                    <p class="card-text">
                      Departure: {{ card.departureDate }}
                      {{ card.departureTime }}
                    </p>
                  </div>
                </div>
              </div> -->
              <div v-if="viewMode === 'list'" class="table-responsive text-nowrap" @click="openOffcanvas(list)">
                <table class="table" style="overflow: hidden;">
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
                    <tr class="border-bottom" @click="openOffcanvas(list)">
                      <td>
                        <div class="d-flex align-items-center">
                          <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
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
                        <div class="btn-group" id="hover-dropdown-demo " @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                          <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul v-show="isHovered" class="dropdown-menu show" data-popper-placement=" bottom-end">
                            <li>
                              <a class="dropdown-item" href="#">Print Invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">Add New Booking</a>
                            </li>
                            <li><a class="dropdown-item" href="#">Audit Trail</a></li>
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
                          <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
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
                        <div class=" btn-group" id="hover-dropdown-demo " @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                          <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none;">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <ul v-show="isHovered" class="dropdown-menu show" data-popper-placement=" bottom-end">
                            <li>
                              <a class="dropdown-item" href="#">Print Invoice</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">Add New Booking</a>
                            </li>
                            <li><a class="dropdown-item" href="#">Audit Trail</a></li>
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

              <div v-else class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0" @click="openOffcanvas(card)" v-for="card in reservations" :key="card.reservationNo">
                <div class="card h-100">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <div class="card-title mb-0 d-flex">
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      <h5 class="m-0 me-2">{{ card.guestName }} </h5>
                      <p>14527</p>
                    </div>

                    <div class="btn-group" id="hover-dropdown-demo " @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                      <div class="btn-group" id="hover-dropdown-demo " @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                        <button type="button" class="btn btn-primary waves-effect waves-light show" style="border: 0; box-shadow: none;">
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul v-show="isHovered" class="dropdown-menu show" data-popper-placement=" bottom-end">
                          <li>
                            <a class="dropdown-item" href="#">Print Invoice</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">Add New Booking</a>
                          </li>
                          <li><a class="dropdown-item" href="#">Audit Trail</a></li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="deliveryExceptionsChart">
                      <div class="row d-flex align-items-center justify-content-center text-center mb-3">
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
          </div>
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
  data ()
  {
    return {
      viewMode: "card", // default view mode is card view
      isHovered: false,
      selectedCard: null, // Store the data for the selected card
      selectedList: null, // Store the data for the selected card

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
          createdAt: "01/12/2024 09:00 AM", // Added creation date
        },
      ],
    };
  },
  methods: {
    setViewMode (mode)
    {
      this.viewMode = mode;
    },
    setActiveTab (tab)
    {
      this.activeTab = tab;
    },
    openOffcanvas (card, list = null)
    {

      this.selectedCard = card; // Set selected card
      this.selectedList = list; // Set selected list (optional)

      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasEnd")
      );
      offcanvas.show(); // Show the sidebar
    },
    resetSelections ()
    {
      this.selectedCard = null; // Reset selected card
      this.selectedList = null; // Reset selected list
    },

  },
  mounted ()
  {
    // Add event listener to reset selections when the sidebar is closed
    const offcanvas = document.getElementById("offcanvasEnd");
    offcanvas.addEventListener("hidden.bs.offcanvas", this.resetSelections);
  },
  beforeDestroy ()
  {
    // Clean up event listener
    const offcanvas = document.getElementById("offcanvasEnd");
    offcanvas.removeEventListener("hidden.bs.offcanvas", this.resetSelections);
  },

};
</script>

<style>
.active-card {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
