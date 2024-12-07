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
          <div class="ms-auto me-3">
            <button class="btn btn-primary">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button class="ms-0 btn btn-secondary">
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
                  <label class="form-check-label" for="defaultRadio2">PDF</label>
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
                  <label class="form-check-label" for="defaultRadio2">Excel</label>
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
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
                </div>
                <div class="form-check form-check-primary mb-2">
                  <input
                    class="form-check-input input-filter"
                    type="checkbox"
                    id="select-personal"
                    data-value="personal"
                    checked=""
                  />
                  <label class="form-check-label" for="select-personal">Personal</label>
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
            <div id="form-tabs-Reservations">
              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasEnd"
                aria-labelledby="offcanvasEndLabel"
              >
                <div class="offcanvas-header">
                  <h5 id="offcanvasEndLabel" class="offcanvas-title">Offcanvas End</h5>
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label">Business Source</label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label"> Travel Agent </label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label">Company</label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                  </div>
                </div>
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
                <div class="row">
                  <div class="col-md-10 m-auto">
                    <label for="MarketCode" class="col-form-label">Room</label>
                    <select class="form-select mb-2" id="MarketCode">
                      <option value="" disabled selected>-select-</option>
                      <option value="option1">item</option>
                      <option value="option2">item</option>
                    </select>
                  </div>
                </div>
                <div class="gap-2 d-flex justify-content-end">
                  <button class="btn btn-secondary">Reset</button>
                  <button class="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <!-- Reservations  -->
          <div class="tab-pane fade" id="form-tabs-Reservations" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center">
                  <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                    <p>14527</p>
                  </div>
                  <div class="dropdown ms-auto">
                    <button class="btn btn-outline-secondary waves-effect">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
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
          <!-- Arrivals  -->
          <div class="tab-pane fade" id="form-tabs-Arrivals" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center">
                  <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                    <p>14527</p>
                  </div>
                  <div class="dropdown ms-auto">
                    <button class="btn btn-outline-secondary waves-effect">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
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
          <!-- Departures  -->
          <div class="tab-pane fade" id="form-tabs-Departures" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center">
                  <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                    <p>14527</p>
                  </div>
                  <div class="dropdown ms-auto">
                    <button class="btn btn-outline-secondary waves-effect">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
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
          <!-- In-house  -->
          <div class="tab-pane fade" id="form-tabs-In-house" role="tabpanel">
            <div class="col-12 col-md-6 col-lg-4 mb-4 order-1 order-xl-0">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center">
                  <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">مصطفي مدبولي</h5>
                    <p>14527</p>
                  </div>
                  <div class="dropdown ms-auto">
                    <button class="btn btn-outline-secondary waves-effect">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
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
