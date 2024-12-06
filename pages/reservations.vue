<template>
  <div class="row">
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
            >
              Reservations
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
            >
              Arrivals
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-Departures"
              role="tab"
              aria-selected="true"
            >
              Departures
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-In-house"
              role="tab"
              aria-selected="true"
            >
              In-house
            </button>
          </li>
          <button class="btn-primary">
            <i class="fa-solid fa-grip"></i>
          </button>
          <button class="btn-primary">
            <i class="fa-solid fa-list"></i>
          </button>
          <button
            type="button"
            class="btn btn-primary dropdown-toggle waves-effect waves-light"
            data-bs-toggle="dropdown"
            data-trigger="hover"
            aria-expanded="true"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            Export
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="">mnsabjksabdjksa</a>
            </li>
            <li>
              <a class="dropdown-item" href="">mnsabjksabdjksa</a>
            </li>
            <li>
              <a class="dropdown-item" href="">mnsabjksabdjksa</a>
            </li>
            <li>
              <a class="dropdown-item" href="">mnsabjksabdjksa</a>
            </li>
          </ul>
          <button class="btn-primary">
            <i class="fa-solid fa-magnifying-glass"></i>
            Search
          </button>
          <hr style="color: red" />
          <!-- <button></button> -->
        </template>
        <template #content>
          <!-- Reservations  -->
          <div class="tab-pane fade" id="form-tabs-Reservations" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center">
                  <i class="fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                    <p>14527</p>
                  </div>
                  <div class="dropdown ms-auto">
                    <button>
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div id="deliveryExceptionsChart">
                    <div
                      class="row d-flex align-items-center justify-content-center text-center mb-3"
                    >
                      <div class="col-md-5">
                        <div>02/12/2024</div>
                        <div>08:43:01 pm</div>
                      </div>
                      <div class="col-md-2">
                        <div>5</div>
                        <div>Nights</div>
                      </div>
                      <div class="col-md-5">
                        <div>02/12/2024</div>
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
                          <i class="fa-solid fa-person m-1"></i>3
                          <i class="fa-solid fa-child m-1"></i>2
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
                      <div class="col-md-10">Balance</div>
                      <div class="col-md-2">$20</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Booking Details  -->
          <div class="tab-pane fade" id="form-tabs-Arrivals" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div
                  class="card-header d-flex align-items-center justify-content-between"
                >
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">Reasons for delivery exceptions</h5>
                  </div>
                  <div class="dropdown">
                    <button>
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div id="deliveryExceptionsChart">
                    <div
                      class="row d-flex align-items-center justify-content-center text-center"
                    >
                      <div class="col-md-5">
                        <div>02/12/2024</div>
                        <div>08:43:01 pm</div>
                      </div>
                      <div class="col-md-2">
                        <div>5</div>
                        <div>Nights</div>
                      </div>
                      <div class="col-md-5">
                        <div>02/12/2024</div>
                        <div>08:43:01 pm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Guest Details  -->
          <div class="tab-pane fade" id="form-tabs-Departures" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div
                  class="card-header d-flex align-items-center justify-content-between"
                >
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">Reasons for delivery exceptions</h5>
                  </div>
                  <div class="dropdown">
                    <button>
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div id="deliveryExceptionsChart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Room Charges  -->
          <div class="tab-pane fade" id="form-tabs-In-house" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div
                  class="card-header d-flex align-items-center justify-content-between"
                >
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">Reasons for delivery exceptions</h5>
                  </div>
                  <div class="dropdown">
                    <button>
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div id="deliveryExceptionsChart"></div>
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
};
</script>

<style></style>
