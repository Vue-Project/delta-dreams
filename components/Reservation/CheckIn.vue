<template>
  <div class="card">
    <h5 class="card-header"><i class="fa-solid fa-angle-left pr-2"></i>Add Reservation</h5>
    <hr class="m-0" />
    <div class="card-body">
      <form id="formValidationReservation" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
        novalidate="novalidate">
        <!-- Reservation  Details -->
        <div class="row">
          <!-- Date Picker-->
          <div class="col-md-6 col-12 mb-4">
            <label for="flatpickr-date" class="form-label">Date Picker</label>
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date"
              readonly="readonly">
          </div>
          <!-- /Date Picker -->

          <!-- Time Picker-->
          <div class="col-md-6 col-12 mb-4">
            <label for="flatpickr-time" class="form-label">Time Picker</label>
            <input type="text" class="form-control flatpickr-input" placeholder="HH:MM" id="flatpickr-time"
              readonly="readonly">
          </div>
          <!-- /Time Picker -->

          <!-- Datetime Picker-->
          <div class="col-md-6 col-12 mb-4">
            <label for="flatpickr-datetime" class="form-label">Datetime Picker</label>
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD HH:MM"
              id="flatpickr-datetime" readonly="readonly">
          </div>
          <!-- /Datetime Picker-->

          <!-- Multiple Dates Picker-->
          <div class="col-md-6 col-12 mb-4">
            <label for="flatpickr-multi" class="form-label">Multiple Dates Picker</label>
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-multi"
              readonly="readonly">
          </div>
          <!-- /Multiple Dates Picker-->

          <!-- Range Picker-->
          <div class="col-md-6 col-12 mb-4">
            <label for="flatpickr-range" class="form-label">Range Picker</label>
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD"
              id="flatpickr-range" readonly="readonly">
          </div>
          <!-- /Range Picker-->

          <!-- Human Friendly Date Picker-->
          <div class="col-md-6 col-12 mb-4">
            <label for="flatpickr-human-friendly" class="form-label">Human Friendly Date Picker</label>
            <input type="hidden" class="form-control flatpickr-input" placeholder="Month DD, YYYY"
              id="flatpickr-human-friendly"><input class="form-control form-control input" placeholder="Month DD, YYYY"
              tabindex="0" type="text" readonly="readonly">
          </div>
          <!-- /Human Friendly Date Picker-->

          <!-- Disabled Range-->
          <div class="col-md-6 col-12 mb-md-0 mb-4">
            <label for="flatpickr-disabled-range" class="form-label">Disabled Range</label>
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD"
              id="flatpickr-disabled-range" readonly="readonly">
          </div>
          <!-- /Disabled Range-->

          <!-- Inline Picker-->
          <div class="col-md-6 col-12">
            <label for="flatpickr-inline" class="form-label">Inline Picker</label>
            <input type="text" class="form-control mb-1 flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-inline"
              readonly="readonly">
            <div class="flatpickr-calendar animate inline" tabindex="-1">
              <div class="flatpickr-months"><span class="flatpickr-prev-month"></span>
                <div class="flatpickr-month">
                  <div class="flatpickr-current-month"><span class="cur-month">November </span>
                    <div class="numInputWrapper"><input class="numInput cur-year" type="number" tabindex="-1"
                        aria-label="Year"><span class="arrowUp"></span><span class="arrowDown"></span></div>
                  </div>
                </div><span class="flatpickr-next-month"></span>
              </div>
              <div class="flatpickr-innerContainer">
                <div class="flatpickr-rContainer">
                  <div class="flatpickr-weekdays">
                    <div class="flatpickr-weekdaycontainer">
                      <span class="flatpickr-weekday">
                        Sun</span><span class="flatpickr-weekday">Mon</span><span
                        class="flatpickr-weekday">Tue</span><span class="flatpickr-weekday">Wed</span><span
                        class="flatpickr-weekday">Thu</span><span class="flatpickr-weekday">Fri</span><span
                        class="flatpickr-weekday">Sat
                      </span>
                    </div>
                  </div>
                  <div class="flatpickr-days" tabindex="-1">
                    <div class="dayContainer"><span class="flatpickr-day prevMonthDay" aria-label="October 27, 2024"
                        tabindex="-1">27</span><span class="flatpickr-day prevMonthDay" aria-label="October 28, 2024"
                        tabindex="-1">28</span><span class="flatpickr-day prevMonthDay" aria-label="October 29, 2024"
                        tabindex="-1">29</span><span class="flatpickr-day prevMonthDay" aria-label="October 30, 2024"
                        tabindex="-1">30</span><span class="flatpickr-day prevMonthDay" aria-label="October 31, 2024"
                        tabindex="-1">31</span><span class="flatpickr-day" aria-label="November 1, 2024"
                        tabindex="-1">1</span><span class="flatpickr-day" aria-label="November 2, 2024"
                        tabindex="-1">2</span><span class="flatpickr-day" aria-label="November 3, 2024"
                        tabindex="-1">3</span><span class="flatpickr-day" aria-label="November 4, 2024"
                        tabindex="-1">4</span><span class="flatpickr-day" aria-label="November 5, 2024"
                        tabindex="-1">5</span><span class="flatpickr-day" aria-label="November 6, 2024"
                        tabindex="-1">6</span><span class="flatpickr-day" aria-label="November 7, 2024"
                        tabindex="-1">7</span><span class="flatpickr-day" aria-label="November 8, 2024"
                        tabindex="-1">8</span><span class="flatpickr-day" aria-label="November 9, 2024"
                        tabindex="-1">9</span><span class="flatpickr-day" aria-label="November 10, 2024"
                        tabindex="-1">10</span><span class="flatpickr-day" aria-label="November 11, 2024"
                        tabindex="-1">11</span><span class="flatpickr-day" aria-label="November 12, 2024"
                        tabindex="-1">12</span><span class="flatpickr-day" aria-label="November 13, 2024"
                        tabindex="-1">13</span><span class="flatpickr-day" aria-label="November 14, 2024"
                        tabindex="-1">14</span><span class="flatpickr-day" aria-label="November 15, 2024"
                        tabindex="-1">15</span><span class="flatpickr-day today" aria-label="November 16, 2024"
                        aria-current="date" tabindex="-1">16</span><span class="flatpickr-day"
                        aria-label="November 17, 2024" tabindex="-1">17</span><span class="flatpickr-day"
                        aria-label="November 18, 2024" tabindex="-1">18</span><span class="flatpickr-day"
                        aria-label="November 19, 2024" tabindex="-1">19</span><span class="flatpickr-day"
                        aria-label="November 20, 2024" tabindex="-1">20</span><span class="flatpickr-day"
                        aria-label="November 21, 2024" tabindex="-1">21</span><span class="flatpickr-day"
                        aria-label="November 22, 2024" tabindex="-1">22</span><span class="flatpickr-day"
                        aria-label="November 23, 2024" tabindex="-1">23</span><span class="flatpickr-day"
                        aria-label="November 24, 2024" tabindex="-1">24</span><span class="flatpickr-day"
                        aria-label="November 25, 2024" tabindex="-1">25</span><span class="flatpickr-day"
                        aria-label="November 26, 2024" tabindex="-1">26</span><span class="flatpickr-day"
                        aria-label="November 27, 2024" tabindex="-1">27</span><span class="flatpickr-day"
                        aria-label="November 28, 2024" tabindex="-1">28</span><span class="flatpickr-day"
                        aria-label="November 29, 2024" tabindex="-1">29</span><span class="flatpickr-day"
                        aria-label="November 30, 2024" tabindex="-1">30</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 1, 2024" tabindex="-1">1</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 2, 2024" tabindex="-1">2</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 3, 2024" tabindex="-1">3</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 4, 2024" tabindex="-1">4</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 5, 2024" tabindex="-1">5</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 6, 2024" tabindex="-1">6</span><span class="flatpickr-day nextMonthDay"
                        aria-label="December 7, 2024" tabindex="-1">7</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Inline Picker-->
        </div>


<!--
        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationName">Full Name</label>
          <input type="text" id="formValidationName" class="form-control" placeholder="John Doe"
            name="formValidationName">
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationEmail">Email</label>
          <input class="form-control" type="email" id="formValidationEmail" name="formValidationEmail"
            placeholder="john.doe">
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div> -->

        <!-- <div class="col-md-6 fv-plugins-icon-container">
          <div class="form-password-toggle">
            <label class="form-label" for="formValidationPass">Password</label>
            <div class="input-group input-group-merge has-validation">
              <input class="form-control" type="password" id="formValidationPass" name="formValidationPass"
                placeholder="············" aria-describedby="multicol-password2">
              <span class="input-group-text cursor-pointer" id="multicol-password2"><i class="ti ti-eye-off"></i></span>
            </div>
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
          </div>
        </div>
        <div class="col-md-6 fv-plugins-icon-container">
          <div class="form-password-toggle">
            <label class="form-label" for="formValidationConfirmPass">Confirm Password</label>
            <div class="input-group input-group-merge has-validation">
              <input class="form-control" type="password" id="formValidationConfirmPass"
                name="formValidationConfirmPass" placeholder="············"
                aria-describedby="multicol-confirm-password2">
              <span class="input-group-text cursor-pointer" id="multicol-confirm-password2"><i
                  class="ti ti-eye-off"></i></span>
            </div>
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
          </div>
        </div> -->

        <!-- Personal Info -->

        <!-- <div class="col-12">
          <h6 class="mt-2">2. Personal Info</h6>
          <hr class="mt-0">
        </div>

        <div class="col-md-6 fv-plugins-icon-container">
          <label for="formValidationFile" class="form-label">Profile Pic</label>
          <input class="form-control" type="file" id="formValidationFile" name="formValidationFile">
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationDob">DOB</label>
          <input type="text" class="form-control flatpickr-validation flatpickr-input" name="formValidationDob"
            id="formValidationDob" required="" readonly="readonly">
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>

        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationSelect2">Country</label>
          <div class="position-relative"><select id="formValidationSelect2" name="formValidationSelect2"
              class="form-select select2 select2-hidden-accessible" data-allow-clear="true"
              data-select2-id="formValidationSelect2" tabindex="-1" aria-hidden="true">
              <option value="" data-select2-id="2">Select</option>
              <option value="Australia">Australia</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Belarus">Belarus</option>
              <option value="Brazil">Brazil</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="Korea">Korea, Republic of</option>
              <option value="Mexico">Mexico</option>
              <option value="Philippines">Philippines</option>
              <option value="Russia">Russian Federation</option>
              <option value="South Africa">South Africa</option>
              <option value="Thailand">Thailand</option>
              <option value="Turkey">Turkey</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
            </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1"
              style="width: 664px;"><span class="selection"><span class="select2-selection select2-selection--single"
                  role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false"
                  aria-labelledby="select2-formValidationSelect2-container"><span class="select2-selection__rendered"
                    id="select2-formValidationSelect2-container" role="textbox" aria-readonly="true"><span
                      class="select2-selection__placeholder">Select country</span></span><span
                    class="select2-selection__arrow" role="presentation"><b
                      role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                aria-hidden="true"></span></span></div>
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationLang">Languages</label>
          <tags class="tagify form-control tagify--noTags tagify--empty" tabindex="-1">
            <span contenteditable="" tabindex="0" data-placeholder="​" aria-placeholder="" class="tagify__input"
              role="textbox" aria-autocomplete="both" aria-multiline="false"></span>
            ​
          </tags><input type="text" value="" class="form-control" name="formValidationLang" id="formValidationLang"
            tabindex="-1">
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>

        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationTech">Tech</label>
          <span class="twitter-typeahead" style="position: relative; display: inline-block;"><input
              class="form-control typeahead tt-hint" type="text" autocomplete="off" readonly="" spellcheck="false"
              tabindex="-1"
              style="position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; opacity: 1; background: none 0% 0% / auto repeat scroll padding-box padding-box rgb(255, 255, 255);"
              dir="ltr"><input class="form-control typeahead tt-input" type="text" id="formValidationTech"
              name="formValidationTech" autocomplete="off" spellcheck="false" dir="auto"
              style="position: relative; vertical-align: top; background-color: transparent;">
            <pre aria-hidden="true"
              style="position: absolute; visibility: hidden; white-space: pre; font-family: &quot;Public Sans&quot;, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
            <div class="tt-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none;">
              <div class="tt-dataset tt-dataset-tech"></div>
            </div>
          </span>
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationHobbies">Hobbies</label>
          <div class="dropdown bootstrap-select show-tick hobbies-select w-100"><select
              class="selectpicker hobbies-select w-100" id="formValidationHobbies" data-style="btn-default"
              data-icon-base="ti" data-tick-icon="ti-check text-white" name="formValidationHobbies" multiple="">
              <option>Sports</option>
              <option>Movies</option>
              <option>Books</option>
            </select><button type="button" tabindex="-1" class="btn dropdown-toggle bs-placeholder btn-default"
              data-bs-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox"
              aria-expanded="false" title="Nothing selected" data-id="formValidationHobbies">
              <div class="filter-option">
                <div class="filter-option-inner">
                  <div class="filter-option-inner-inner">Nothing selected</div>
                </div>
              </div>
            </button>
            <div class="dropdown-menu ">
              <div class="inner show" role="listbox" id="bs-select-1" tabindex="-1" aria-multiselectable="true">
                <ul class="dropdown-menu inner show" role="presentation"></ul>
              </div>
            </div>
          </div>
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>

        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label" for="formValidationBio">Bio</label>
          <textarea class="form-control" id="formValidationBio" name="formValidationBio" rows="3"></textarea>
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div class="col-md-6 fv-plugins-icon-container">
          <label class="form-label">Gender</label>
          <div class="form-check custom mb-2">
            <input type="radio" id="formValidationGender" name="formValidationGender" class="form-check-input"
              checked="">
            <label class="form-check-label" for="formValidationGender">Male</label>
          </div>

          <div class="form-check custom">
            <input type="radio" id="formValidationGender2" name="formValidationGender" class="form-check-input">
            <label class="form-check-label" for="formValidationGender2">Female</label>
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
          </div>
        </div>

        <!-- Choose Your Plan -->

        <!-- <div class="col-12">
          <h6 class="mt-2">3. Choose Your Plan</h6>
          <hr class="mt-0">
        </div>
        <div class="row gy-3 mt-0">
          <div class="col-xl-3 col-md-5 col-sm-6 col-12 fv-plugins-icon-container">
            <div class="form-check custom-option custom-option-icon checked">
              <label class="form-check-label custom-option-content" for="basicPlanMain1">
                <span class="custom-option-body">
                  <i class="ti ti-brand-telegram"></i>
                  <span class="custom-option-title"> Starter </span>
                  <small> Get 5gb of space and 1 team member. </small>
                </span>
                <input name="formValidationPlan" class="form-check-input" type="radio" value="" id="basicPlanMain1"
                  checked="">
              </label>
            </div>
          </div>
          <div class="col-xl-3 col-md-5 col-sm-6 col-12">
            <div class="form-check custom-option custom-option-icon">
              <label class="form-check-label custom-option-content" for="basicPlanMain2">
                <span class="custom-option-body">
                  <i class="ti ti-users"></i>
                  <span class="custom-option-title"> Personal </span>
                  <small> Get 15gb of space and 5 team member. </small>
                </span>
                <input name="formValidationPlan" class="form-check-input" type="radio" value="" id="basicPlanMain2">
              </label>
            </div>
          </div>
          <div class="col-xl-3 col-md-5 col-sm-6 col-12">
            <div class="form-check custom-option custom-option-icon">
              <label class="form-check-label custom-option-content" for="basicPlanMain3">
                <span class="custom-option-body">
                  <i class="ti ti-crown"></i>
                  <span class="custom-option-title"> Premium </span>
                  <small> Get 25gb of space and 15 members. </small>
                </span>
                <input name="formValidationPlan" class="form-check-input" type="radio" value="" id="basicPlanMain3">
              </label>
            </div>
          </div>
        </div>
        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>

        <div class="col-12 fv-plugins-icon-container">
          <label class="switch switch-primary">
            <input type="checkbox" class="switch-input" name="formValidationSwitch">
            <span class="switch-toggle-slider">
              <span class="switch-on"></span>
              <span class="switch-off"></span>
            </span>
            <span class="switch-label">Send me related emails</span>
          </label>
          <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div class="col-12 fv-plugins-icon-container">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="formValidationCheckbox" name="formValidationCheckbox">
            <label class="form-check-label" for="formValidationCheckbox">Agree to our terms and conditions</label>
            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" name="submitButton" class="btn btn-primary waves-effect waves-light">Submit</button>
          <button type="submit" name="submitButton" class="btn btn-primary waves-effect waves-light">Submit</button>
        </div> -->
        <input type="hidden">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckIn",
  layout: "component",
};
</script>

<style></style>
