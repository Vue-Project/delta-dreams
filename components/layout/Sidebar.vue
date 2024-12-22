<template>
  <div>
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content">
        <h3>{{ title }}</h3>
        <hr class="my-2" />
        <slot>
          <form @submit.prevent="submitForm">
            <div class="row p-3 mb-5">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone1" :formData="form" @file-uploaded="setImage" />
                  </div>
                  <div class="col-md-8">
                    <div class="mb-3">
                      <label for="formGustInfoName" class="col-form-label">Name</label>
                      <div class="input-group">
                        <select class="form-select" id="formGustInfoName" v-model="form.name">
                          <option value="" disabled selected>MR</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                        <input type="text" class="form-control w-50" aria-label="Text input with select list" id="formGustInfoName" v-model="form.nameText" />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="formGustInfoEmail" class="form-label">Email
                      </label>
                      <input type="email" class="form-control" id="formGustInfoEmail" placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email" v-model="form.email" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                      <input class="form-control" type="tel" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone" v-model="form.phone" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                      <input class="form-control" type="tel" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="form.mobile" />
                    </div>
                  </div>
                </div>
                <div class="mb-0">
                  <label class="d-block form-label mb-3">Gender</label>
                  <div class="row">
                    <div class="col-md-4" v-for="(genderOption, index) in genderOptions" :key="index">
                      <div class="form-check mb-2">
                        <input type="radio" :id="'gender-' + genderOption" v-model="form.gender" :value="genderOption" class="form-check-input" />
                        <label class="form-check-label" :for="'gender-' + genderOption">{{ genderOption }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <label for="formGustInfoAddress" class="col-form-label">Address</label>
                <input class="form-control" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" v-model="form.address" />
              </div>
              <div class="row">
                <div class="col-md-3">
                  <label for="countryGuest" class="col-form-label">Country</label>
                  <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" v-model="form.country" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoState" class="col-form-label">State</label>
                  <input class="form-control" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" v-model="form.state" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoCity" class="col-form-label">City</label>
                  <input class="form-control" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" v-model="form.city" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoZip" class="col-form-label">Zip</label>
                  <input class="form-control" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" v-model="form.zip" />
                </div>
              </div>
            </div>
            <!-- <div class="accordion mt-3" id="accordionExample">
                            <div class="card accordion-item active">
                                <h2 class="accordion-header" id="headingOne">
                                    <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">
                                        Other Information
                                    </button>
                                </h2>

                                <div id="accordionOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                                    <div class="row accordion-body">
                                        <div class="col-12 mb-3">Identity Information</div>

                                        <div class="row p-3 mb-2">
                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div div class="col-md-4">
                                                        <DropzoneComponent id="dropzone2" />
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="mb-3">
                                                            <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                                                            <input class="form-control" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="formGustIssuingCountry" class="col-form-label">Issuing Country</label>
                                                            <select class="form-select" id="formGustIssuingCountry" aria-label="select Issuing Country">
                                                                <option value="" disabled selected>
                                                                    Select option
                                                                </option>
                                                                <option value="option1">Option 1</option>
                                                                <option value="option2">Option 2</option>
                                                                <option value="option3">Option 3</option>
                                                                <option value="option4">Option 4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="mb-3">
                                                            <label for="formGustIdentityIdType" class="col-form-label">ID Type</label>
                                                            <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                                                                <option value="" disabled selected>
                                                                    Select option
                                                                </option>
                                                                <option value="option1">Option 1</option>
                                                                <option value="option2">Option 2</option>
                                                                <option value="option3">Option 3</option>
                                                                <option value="option4">Option 4</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-0">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="mb-2">
                                                                <label for="formGustIssuingCity" class="col-form-label">Issuing City</label>
                                                                <input class="form-control" type="text" id="formGustIssuingCity" placeholder="City" aria-label="Enter Issuing City" />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label for="flatpickr-date-04" class="col-form-label">Expiry Date</label>
                                                            <input type="text" class="form-control" placeholder="YYYY-MM-D " id="flatpickr-date-04" ref="datePicker4" aria-label="input Text to Expiry Date" />
                                                            <i class="fa-solid fa-calendar-days icon-date top"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 mb-3">Payment Method</div>
                                        <div class="row mb-3">
                                            <div class="col-md-3">
                                                <label for="PaymentMethod" class="col-form-label">Payment Method</label>
                                                <select class="form-select" id="formGustPaymentMethod" aria-label="select Payment Method">
                                                    <option value="" disabled selected>
                                                        Select option
                                                    </option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                    <option value="option4">Option 4</option>
                                                </select>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="DirectBilling" class="col-form-label">Direct Billing A/C</label>
                                                <select class="form-select" id="formGustDirectBilling" aria-label="select Direct Billing A/C">
                                                    <option value="" disabled selected>
                                                        Select option
                                                    </option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                    <option value="option4">Option 4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-3">Personal Information</div>
                                        <div class="row mb-3">
                                            <div class="col-md-3">
                                                <label for="formGustPersonalInfoBirth " class="col-form-label">Birth Date</label>
                                                <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-05" ref="datePicker5" aria-label="input Text to Birth Date" />
                                                <i class="fa-solid fa-calendar-days icon-date top"></i>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="BirthCountry" class="col-form-label">Birth Country</label>
                                                <select class="form-select" id="formGustBirthCountry" aria-label="select Birth Country">
                                                    <option value="" disabled selected>
                                                        Select option
                                                    </option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                    <option value="option4">Option 4</option>
                                                </select>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="NationalityGuest" class="col-form-label">Nationality</label>
                                                <select class="form-select" id="formGustNationality" aria-label="select Nationality">
                                                    <option value="" disabled selected>
                                                        Select option
                                                    </option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                    <option value="option4">Option 4</option>
                                                </select>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="VIPGuest" class="col-form-label">VIP Status</label>
                                                <select class="form-select" id="formGustVIP" aria-label="select VIP">
                                                    <option value="" disabled selected>
                                                        Select option
                                                    </option>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                    <option value="option4">Option 4</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="formGustSpouseBirth" class="col-form-label">Spouse Birth Date</label>
                                                <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-06" ref="datePicker6" aria-label="input Text to Spouse Birth Date" />
                                                <i class="fa-solid fa-calendar-days icon-date top"></i>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="flatpickr-date-07" class="col-form-label">Wedding Anniversary</label>
                                                <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Wedding Anniversary" />
                                                <i class="fa-solid fa-calendar-days icon-date top"></i>
                                            </div>
                                            <div class="col-md-3">
                                                <label for="formGustRegistration" class="col-form-label">Registration No</label>
                                                <input class="form-control" type="text" id="formGustRegistration" placeholder="Registration No" aria-label="input Text to Gust Registration" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

            <div class="scbuttons gap-2 d-flex justify-content-end">
              <button @click="$emit('close-sidebar')" class="btn btn-secondary waves-effect waves-light">
                Close
              </button>
              <button type="submit" class="btn btn-primary waves-effect waves-light">
                Save
              </button>
            </div>
          </form>
        </slot>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isSidebarOpen" class="overlay" @click="$emit('close-sidebar')"></div>
  </div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
import DropzoneComponent from "./DropzoneComponent.vue";
export default {
  name: "Sidebar",
  layout: "component",
  data ()
  {
    return {
      form: {
        image: null, // Image data will be stored here
        name: "",
        nameText: "",
        email: "",
        phone: "",
        // mobile: "",
        // gender: "",
        // address: "",
        // country: "",
        // state: "",
        // city: "",
        // zip: "",
      },
      genderOptions: ['Male', 'Female', 'Other']

    };
  },
  components: {
    DropzoneComponent,
  },

  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: " Add Guest",
    },
    width: {
      type: String,
      default: "1000px",
    },
  },
  mixins: [flatpickrMixin],
  watch: {
    isSidebarOpen (newVal)
    {
      if (newVal) {
        this.initFlatpickers(); // Re-initialize Flatpickr when sidebar opens
      }
    },
  },
  methods: {
    submitForm ()
    {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("nameText", this.form.nameText);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
      // formData.append("mobile", this.form.mobile);
      // formData.append("gender", this.form.gender);
      // formData.append("address", this.form.address);
      // formData.append("country", this.form.country);
      // formData.append("state", this.form.state);
      // formData.append("city", this.form.city);
      // formData.append("zip", this.form.zip);

      if (this.form.image) {
        formData.append("image", this.form.image);
      }

      // Send data to the server using Fetch API
      fetch("https://deltadream.swevey.com/api/users", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) =>
        {
          console.log("Success:", data);
          // Handle successful response (e.g., show a success message)
        })
        .catch((error) =>
        {
          console.error("Error:", error);
          // Handle error (e.g., show an error message)
        });
    },
  },
};
</script>

<style scoped></style>
