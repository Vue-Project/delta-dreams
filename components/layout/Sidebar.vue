<template>
  <div>
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content">
        <h3>{{ title }}</h3>
        <hr class="my-2" />
        <slot>
          <form ref="emptyForm" id="formGustInfo" @submit.prevent="submitForm">
            <div class="row p-3 mb-5">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone1" v-model="formGuest.image" />
                  </div>
                  <div class="col-md-8">
                      <div class="mb-3">
                        <label for="formGustInfoName" class="col-form-label">Name
                        </label>
                        <input type="text" class="form-control" id="formGustInfoName" placeholder="Name Guest" aria-label="input text to Gust Name" v-model="formGuest.name" ref="name"
                        :class="{ 'input-error': validationMessages.name }" />
                        <span class="error-message" v-if="validationMessages.name">{{ validationMessages.name }}</span>

                      </div>

                    <div class="mb-3">
                      <label for="formGustInfoEmail" class="col-form-label">Email
                      </label>
                      <input type="email" class="form-control" id="formGustInfoEmail" placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email" v-model="formGuest.email" ref="email"
                      :class="{ 'input-error': validationMessages.email }" />
                      <span class="error-message" v-if="validationMessages.email">{{ validationMessages.email }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                      <input class="form-control" type="tel" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone"
                      :class="{ 'input-error': validationMessages.phone }" />
                      <span class="error-message" v-if="validationMessages.phone">{{ validationMessages.phone }}</span>

                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                      <input class="form-control" type="tel" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="formGuest.mobile" ref="mobile"
                      :class="{ 'input-error': validationMessages.mobile }" />
                      <span class="error-message" v-if="validationMessages.mobile">{{ validationMessages.mobile }}</span>
                    </div>
                  </div>
                </div>
                <div class="mb-0">
                  <label class="d-block form-label mb-3">Gender</label>
                  <div class="row">
                    <div class="col-md-4" v-for="(genderOption, index) in genderOptions" :key="index">
                      <div class="form-check mb-2">
                        <input type="radio" :id="'gender-' + genderOption" v-model="formGuest.gender" :value="genderOption" class="form-check-input" aria-label="input radio to Gust gender" />
                        <label class="form-check-label" :for="'gender-' + genderOption">{{ genderOption }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <label for="formGustInfoAddress" class="col-form-label">Address</label>
                <input class="form-control" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" v-model="formGuest.address" />
              </div>
              <div class="row">
                <div class="col-md-3">
                  <label for="countryGuest" class="col-form-label">Country</label>
                  <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" v-model="formGuest.country" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoState" class="col-form-label">State</label>
                  <input class="form-control" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" v-model="formGuest.state" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoCity" class="col-form-label">City</label>
                  <input class="form-control" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" v-model="formGuest.city" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoZip" class="col-form-label">Zip</label>
                  <input class="form-control" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" v-model="formGuest.zip" />
                </div>
              </div>
            </div>
            <div class="accordion mt-3" id="accordionExample">
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
                            <DropzoneComponent id="dropzone2" v-model="formGuest.OtherInformation.image" />
                          </div>
                          <div class="col-md-8">
                            <div class="mb-3">
                              <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                              <input class="form-control" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" v-model="formGuest.OtherInformation.idNumber" />
                            </div>
                            <div class="mb-3">
                              <label for="formGustIssuingCountry" class="col-form-label">Issuing Country</label>
                              <select class="form-select" id="formGustIssuingCountry" aria-label="select Issuing Country" v-model="formGuest.OtherInformation.issuingCountry">
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
                              <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type" v-model="formGuest.OtherInformation.idType">
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
                                <input class="form-control" type="text" id="formGustIssuingCity" placeholder="City" aria-label="Enter Issuing City" v-model="formGuest.OtherInformation.issuingCity" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <label for="flatpickr-date-04" class="col-form-label">Expiry Date</label>
                              <input type="text" class="form-control" placeholder="YYYY-MM-D " id="flatpickr-date-04" ref="datePicker4" aria-label="input Text to Expiry Date" v-model="formGuest.OtherInformation.expiryDate" />
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
                        <select class="form-select" id="formGustPaymentMethod" aria-label="select Payment Method" v-model="formGuest.OtherInformation.paymentMethod.paymentMethod">
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
                        <select class="form-select" id="formGustDirectBilling" aria-label="select Direct Billing A/C Type" v-model="formGuest.OtherInformation.paymentMethod.directBilling">
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
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-05" ref="datePicker5" aria-label="input Text to Birth Date" v-model="formGuest.OtherInformation.paymentMethod.birthDate" />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="BirthCountry" class="col-form-label">Birth Country</label>
                        <select class="form-select" id="formGustBirthCountry" aria-label="select Birth Country" v-model="formGuest.OtherInformation.paymentMethod.birthCountry">
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
                        <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.OtherInformation.paymentMethod.nationality">
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
                        <select class="form-select" id="formGustVIP" aria-label="select VIP" v-model="formGuest.OtherInformation.paymentMethod.vipStatus">
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
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-06" ref="datePicker6" aria-label="input Text to Spouse Birth Date"  v-model="formGuest.OtherInformation.paymentMethod.spouseBirthDate"/>
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="flatpickr-date-07" class="col-form-label">Wedding Anniversary</label>
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Wedding Anniversary" v-model="formGuest.OtherInformation.paymentMethod.weddingAnniversary"/>
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="formGustRegistration" class="col-form-label">Registration No</label>
                        <input class="form-control" type="text" id="formGustRegistration" placeholder="Registration No" aria-label="input Text to Gust Registration" v-model="formGuest.OtherInformation.paymentMethod.registrationNo"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
import Swal from 'sweetalert2';  // Import SweetAlert2
import flatpickrMixin from "../Mixin/flatpickrMixin";
import DropzoneComponent from "./DropzoneComponent.vue";

export default {
  name: "Sidebar",
  layout: "component",
  data ()
  {
    return {
      formGuest: {
        image: null,
        name: "",
        email: "",
        phone: "",
        mobile: "",
        gender: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        OtherInformation: {
          image: "",
          idNumber: "",
          idType: "",
          issuingCountry: "",
          issuingCity: "",
          expiryDate: "",
          paymentMethod: {
            paymentMethod: "",
            directBilling: "",
            birthDate: "",
            birthCountry: "",
            nationality: "",
            vipStatus: "",
            spouseBirthDate: "",
            weddingAnniversary: "",
            registrationNo: "",
          },
        },
      },
      validationMessages: {
      name: '',
      email: '',
      phone: '',
      mobile: '',
    },
      genderOptions: ["Male", "Female", "Other"],
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

    submitForm() {
      // Define required fields and their messages
      const requiredFields = [
        { field: "name", message: "Guest Name is required" },
        { field: "email", message: "Email is required" },
        { field: "phone", message: "Phone is required" },
        { field: "mobile", message: "Mobile is required" },
      ];

      // Reset validation messages before checking
      this.resetValidationMessages();

      let hasError = false;

      // Validate each required field
      for (const { field, message } of requiredFields) {
        const inputElement = this.$refs[field]; // Get input element by ref

        if (!this.formGuest[field]) {
          hasError = true;
          this.$set(this.validationMessages, field, message); // Set validation message

          if (inputElement) {
            inputElement.classList.add("input-error"); // Add error class
          }
        } else {
          if (inputElement) {
            inputElement.classList.remove("input-error"); // Remove error class
          }
        }
      }

      // Stop submission if there are errors
      if (hasError) return;

      // If no errors, show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "ADD Guest successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        // Reset the form after user clicks OK
        this.resetForm();
      });
      fetch("https://deltadream.swevey.com/api/users", {
        method: "POST",
        headers: {
          'content-type': 'multipart/form-data',
          'X-CSRF-TOKEN': csrfToken, // Include the CSRF token in the headers
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) =>
        {
          alert("Success:", data);
          // Handle successful response (e.g., show a success message)
        })
        .catch((error) =>
        {
          alert("Error:", error);
          // Handle error (e.g., show an error message)
        });
      console.log(this.formGuest);

    },

    // Reset form data and validation messages
    resetForm() {
      this.formGuest = {
        image: null,
        name: "",
        email: "",
        phone: "",
        mobile: "",
        gender: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        OtherInformation: {
          image: "",
          idNumber: "",
          idType: "",
          issuingCountry: "",
          issuingCity: "",
          expiryDate: "",
          paymentMethod: {
            paymentMethod: "",
            directBilling: "",
            birthDate: "",
            birthCountry: "",
            nationality: "",
            vipStatus: "",
            spouseBirthDate: "",
            weddingAnniversary: "",
            registrationNo: "",
          },
        },
      };

      this.resetValidationMessages();

      // Remove error classes from inputs
      for (const refKey in this.$refs) {
        const element = this.$refs[refKey];
        if (element && element.classList) {
          element.classList.remove("input-error");
        }
      }
    },

    // Reset all validation messages
    resetValidationMessages() {
      this.validationMessages = {
        name: "",
        email: "",
        phone: "",
        mobile: "",
      };
    },


  },
};
</script>

<style scoped>
</style>
