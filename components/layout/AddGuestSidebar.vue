<template>
  <div>
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content" :style="{ height: height }">
        <h3>{{ title }}</h3>
        <hr class="my-2" />
        <slot>
          <form ref="guestForm" id="formGustInfo" @submit.prevent="submitFormGuest">
            <div class="row p-3 mb-5">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent :id="'profile-image'" v-model="formGuest.image" @dropzone-error="handleDropzoneError" />
                  </div>
                  <div class="col-md-8">
                    <div class="mb-lg-3">
                      <label for="formGustInfoName" class="col-form-label">Name
                      </label>

                      <input type="text" class="form-control rounded-2" id="formGustInfoName" placeholder="Name Guest" aria-label="input text to Gust Name" v-model="formGuest.name" ref="name" :class="{ 'input-error': validationMessages.name }" />
                      <span class="error-message" v-if="validationMessages.name">{{ validationMessages.name }}</span>
                    </div>

                    <div class="mb-lg-3">
                      <label for="formGustInfoEmail" class="col-form-label">Email
                      </label>
                      <input type="email" class="form-control rounded-2" id="formGustInfoEmail" placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email" v-model="formGuest.email" r />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-lg-3">
                      <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                      <input class="form-control rounded-2" type="text" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone" :class="{ 'input-error': validationMessages.phone }" />
                      <span class="error-message" v-if="validationMessages.phone">{{ validationMessages.phone }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-lg-3">
                      <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                      <input class="form-control rounded-2" type="text" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="formGuest.mobile" />
                    </div>
                  </div>
                </div>
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-12">
                      <label for="formGustIdentityGender" class="col-form-label">Gender</label>
                  <select class="form-select" v-model="formGuest.gender" ref="gender" :class="{ 'input-error': validationMessages.gender }">
                      <option value="" disabled selected>Select Gender</option>
                      <option v-for="(gender, index) in getGenderTypes" :key="index" :value="index">
                        {{ gender }}
                      </option>
                  </select>
                  <span class="error-message" v-if="validationMessages.gender">{{ validationMessages.gender }}</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                      <label for="formGustInformInternationalNumber" class="col-form-label internationalNumber">International Number</label>
                      <input class="form-control rounded-2" type="text" value="International Number" id="formGustInformInternationalNumber" aria-label="input tel to Gust International Number" v-model="formGuest.internationalNumber" />
                    </div>
                  </div>

              </div>
              <div class="row pe-0">
                <div class="col-md-3 pe-0">
                  <label for="formGustInfoAddress" class="col-form-label">Address</label>
                  <input class="form-control rounded-2" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" v-model="formGuest.address" />
                </div>
                <div class="col-md-3 pe-0">
                  <!-- <label for="countryGuest" class="col-form-label">Country</label>


                  <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" v-model="formGuest.country" /> -->
                <label for="countryGuest" class="col-form-label">Country</label>
                <select class="form-select" v-model="formGuest.country" id="countryGuest" >
                  <option disabled value="">Select Country</option>
                  <option v-for="(country, index) in getCountries" :key="index" :value="index">
                    {{ country }}
                  </option>
                </select>
                </div>
                <div class="col-md-3 pe-0">
                  <label for="formGustInfoState" class="col-form-label">State</label>
                  <input class="form-control rounded-2" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" v-model="formGuest.state" />
                </div>
                <div class="col-md-3 pe-0">
                  <label for="formGustInfoCity" class="col-form-label">City</label>
                  <input class="form-control rounded-2" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" v-model="formGuest.city" />
                </div>

              </div>
            </div>
            <div class="accordion px-0 mt-3 mb-5" id="accordionExample">
              <div class="card accordion-item active">
                <h2 class="accordion-header" id="headingOne">
                  <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">
                    Other Information
                  </button>
                </h2>

                <div id="accordionOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                  <div class="row accordion-body pe-0">
                    <div class="col-12 mb-3">Identity Information</div>

                    <div class="row p-3 mb-2">
                      <div class="col-md-6">
                        <div class="row">
                          <div div class="col-md-4">
                            <DropzoneComponent id="dropzone2" v-model="formGuest.OtherInformation.image" />
                          </div>
                          <div class="col-md-8 pe-0 ps-1">
                            <div class="mb-lg-3">
                              <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                              <input class="form-control rounded-2" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" v-model="formGuest.OtherInformation.idNumber" :class="{ 'input-error': validationMessages.idNumber }" />
                              <span class="error-message" v-if="validationMessages.idNumber">{{ validationMessages.idNumber }}</span>

                            </div>

                          </div>
                        </div>
                      </div>

                      <div class="col-md-6 pe-0">
                        <div class="row">
                          <div class="col-md-6 ps-1">
                          <label for="formGustIdentityIdType" class="col-form-label">ID Type</label>
                          <select class="form-select rounded-2" id="formGustIdentityIdType" aria-label="select ID Type" v-model="formGuest.OtherInformation.idType" :class="{ 'input-error': validationMessages.idType }">
                            <option value="" disabled selected>
                              Select
                              </option>
                                <option v-for="(nationalType, index) in getNationalTypes" :key="index" :value="index">
                                  {{ nationalType }}
                                </option>
                          </select>
                          <span class="error-message" v-if="validationMessages.idType">{{ validationMessages.idType }}</span>
                        </div>
                          <div class="col-md-6 ps-1">
                            <div class="mb-lg-3">
                              <label for="flatpickr-date-04" class="col-form-label">Expiry Date</label>
                            <input type="text" class="form-control rounded-2" placeholder="YYYY-MM-D " id="flatpickr-date-09" ref="datePicker9" aria-label="input Text to Expiry Date" v-model="formGuest.OtherInformation.expiryDate" :class="{ 'input-error': validationMessages.expiryDate }" />
                            <i class="fa-solid fa-calendar-days icon-date top"></i>
                            <span class="error-message" v-if="validationMessages.expiryDate">{{ validationMessages.expiryDate }}</span>
                            </div>

                        </div>
                        </div>

                      </div>
                    </div>
                    <div class="col-12 mb-lg-3">Personal Information</div>
                    <div class="row mb-lg-3 pe-0">

                      <div class="col-md-3">
                        <label for="flatpickr-date-07" class="col-form-label">Birth Date</label>
                        <input type="text" class="form-control rounded-2 flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Birth Date" v-model="formGuest.OtherInformation.paymentMethod
                          .birthDate
                          " />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>

                      </div>
                      <div class="col-md-3">
                        <label for="NationalityGuest" class="col-form-label">Nationality</label>
                        <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.OtherInformation.paymentMethod.nationality
                          ">

                          <option value="" disabled selected>
                            Select
                          </option>
                          <option v-for="(country, index) in getCountries" :key="index" :value="index">
                            {{country}}
                          </option>


                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="VIPGuest" class="col-form-label">VIP Status</label>
                        <select class="form-select rounded-2" id="formGustVIP" aria-label="select VIP" v-model="formGuest.OtherInformation.paymentMethod.vipStatus
                          ">
                          <option value="" disabled selected>
                            Select
                          </option>
                          <option v-for="(vipStatus, index) in getVipStatus" :key="index" :value="index">
                            {{vipStatus}}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-3 h_respons">
                        <label for="formGustInfoZip" class="col-form-label">Zip</label>
                        <input class="form-control rounded-2" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" v-model="formGuest.zip" />
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
import flatpickrMixin from "../Mixin/flatpickrMixin";
import DropzoneComponent from "./DropzoneComponent.vue";
import { addGuest } from "../../Api/userApi";
import { mapGetters } from 'vuex';

import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';


export default {
  name: "AddGuestSidebar",
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
        internationalNumber: "",
        OtherInformation: {
          image: null,
          idNumber: "",
          idType: "",
          expiryDate: "",
          paymentMethod: {
            birthDate: "",
            birthCountry: "",
            nationality: "",
            vipStatus: "",

          },
        },
      },
      validationMessages: {
        name: "",
        phone: "",
        gender: "",
      },
      uploadedFileData: null,
    };

  },

  components: {
    DropzoneComponent,
  },


  methods: {

    resetValidationMessages ()
    {
      this.validationMessages = {
        name: "",
        gender: "",
        phone: "",
      };

      // Remove error classes
      ["name", "gender", "phone"].forEach((field) =>
      {
        const element = this.$refs[field];
        if (element && element.classList) {
          element.classList.remove("input-error");
        }
      });
    },

    resetForm ()
    {
      this.formGuest = {
        image: "",
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
    },

    handleDropzoneError(error) {
      // Handle the error appropriately
      this.handleSubmissionError(error, "Error uploading image");
    },

    async submitFormGuest() {
      try {
        this.resetValidationMessages();
        this.isSubmitting = true;

        // Validate required fields
        const requiredFields = ["name", "gender", "phone", "idNumber", "idType", "expiryDate"];
        let hasError = false;

        requiredFields.forEach((field) => {
          if (!this.formGuest[field]) {
            hasError = true;
            this.validationMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;

            const element = this.$refs[field];
            if (element && element.classList) {
              element.classList.add("input-error");
            }
          }
        });

        if (hasError) {
          throw new Error("Please fill in all required fields");
        }

        // Create FormData instance
        const formData = new FormData();

        // Append all the text data
        const addGuestData = {
          name: this.formGuest.name,
          email: this.formGuest.email,
          mobile: this.formGuest.mobile,
          phone: this.formGuest.phone,
          gender: this.formGuest.gender,
          address: this.formGuest.address,
          country: this.formGuest.country,
          state: this.formGuest.state,
          city: this.formGuest.city,
          zip_code: this.formGuest.zip,
          international_phone: this.formGuest.internationalNumber,
          birth_date: this.formGuest.OtherInformation.paymentMethod.birthDate,
          vip_status: this.formGuest.OtherInformation.paymentMethod.vipStatus,
          nationality: this.formGuest.OtherInformation.paymentMethod.nationality,
          national_id: this.formGuest.OtherInformation.idNumber,
          national_expire_date: this.formGuest.OtherInformation.expiryDate,
          national_type: this.formGuest.OtherInformation.idType,
        };

        // Append all text data to FormData
        Object.keys(addGuestData).forEach(key => {
          formData.append(key, addGuestData[key]);
        });

        // Append images if they exist
        if (this.formGuest.image?.file) {
          formData.append('profile_image', this.formGuest.image.file);
        }

        if (this.formGuest.OtherInformation?.image?.file) {
          formData.append('identity_image', this.formGuest.OtherInformation.image.file);
        }

        // Make API call with FormData
        const response = await addGuest(formData);

        await showSuccessAlert("Guest added successfully!");
        this.resetForm();
        this.$emit("guest-added", response.data);
      } catch (error) {
        handleSubmissionError(error, "Please fill in all required fields");
      } finally {
        this.isSubmitting = false;
      }
    },
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
    height: {
      type: String,
      default: "1300px",
    },

  },
  computed: {

    ...mapGetters([

      'getCountries',
      'getVipStatus',
      'getNationalTypes',
      'getGenderTypes',
    ]),
  },
  mixins: [flatpickrMixin],
  watch: {
    isSidebarOpen (newVal)
    {
      if (newVal) {
        this.initFlatpickers();
      }
    },
  },
};
</script>

<style scoped>
@media (max-width:768px){
  .h_respons{
    padding-bottom: 35px;
  }
}
</style>
