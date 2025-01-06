<template>
  <div>
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content">
        <h3>{{ title }}</h3>
        <hr class="my-2" />
        <slot>
          <form ref="guestForm" id="formGustInfo" @submit.prevent="submitFormGuest">
            <div class="row p-3 mb-5">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone1" @change="handleImageUpload" />
                  </div>
                  <div class="col-md-8">
                    <div class="mb-3">
                      <label for="formGustInfoName" class="col-form-label">Name
                      </label>

                      <input type="text" class="form-control" id="formGustInfoName" placeholder="Name Guest" aria-label="input text to Gust Name" v-model="formGuest.name" ref="name" :class="{ 'input-error': validationMessages.name }" />
                      <span class="error-message" v-if="validationMessages.name">{{ validationMessages.name }}</span>
                    </div>

                    <div class="mb-3">
                      <label for="formGustInfoEmail" class="col-form-label">Email
                      </label>
                      <input type="email" class="form-control" id="formGustInfoEmail" placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email" v-model="formGuest.email" r />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                      <input class="form-control" type="text" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone" :class="{ 'input-error': validationMessages.phone }" />
                      <span class="error-message" v-if="validationMessages.phone">{{ validationMessages.phone }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                      <input class="form-control" type="text" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="formGuest.mobile" />
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <label for="formGustIdentityGender" class="col-form-label">Gender</label>
                  <select class="form-select" v-model="formGuest.gender" ref="gender" :class="{ 'input-error': validationMessages.gender }">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <span class="error-message" v-if="validationMessages.gender">{{ validationMessages.gender }}</span>
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
                              <select class="form-select" id="formGustIssuingCountry" aria-label="select Issuing Country" v-model="formGuest.OtherInformation.issuingCountry
                                ">
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
                                <input class="form-control" type="text" id="formGustIssuingCity" placeholder="City" aria-label="Enter Issuing City" v-model="formGuest.OtherInformation.issuingCity
                                  " />
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
                        <select class="form-select" id="formGustPaymentMethod" aria-label="select Payment Method" v-model="formGuest.OtherInformation.paymentMethod
                            .paymentMethod
                          ">
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
                        <select class="form-select" id="formGustDirectBilling" aria-label="select Direct Billing A/C Type" v-model="formGuest.OtherInformation.paymentMethod
                            .directBilling
                          ">
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
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-05" ref="datePicker5" aria-label="input Text to Birth Date" v-model="formGuest.OtherInformation.paymentMethod.birthDate
                          " />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="BirthCountry" class="col-form-label">Birth Country</label>
                        <select class="form-select" id="formGustBirthCountry" aria-label="select Birth Country" v-model="formGuest.OtherInformation.paymentMethod
                            .birthCountry
                          ">
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
                        <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.OtherInformation.paymentMethod.nationality
                          ">
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
                        <select class="form-select" id="formGustVIP" aria-label="select VIP" v-model="formGuest.OtherInformation.paymentMethod.vipStatus
                          ">
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
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-06" ref="datePicker6" aria-label="input Text to Spouse Birth Date" v-model="formGuest.OtherInformation.paymentMethod
                            .spouseBirthDate
                          " />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="flatpickr-date-07" class="col-form-label">Wedding Anniversary</label>
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Wedding Anniversary" v-model="formGuest.OtherInformation.paymentMethod
                            .weddingAnniversary
                          " />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="formGustRegistration" class="col-form-label">Registration No</label>
                        <input class="form-control" type="text" id="formGustRegistration" placeholder="Registration No" aria-label="input Text to Gust Registration" v-model="formGuest.OtherInformation.paymentMethod
                            .registrationNo
                          " />
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
import Swal from "sweetalert2"; // Import SweetAlert2
import flatpickrMixin from "../Mixin/flatpickrMixin";
import DropzoneComponent from "./DropzoneComponent.vue";
import { addGuest } from "../Api/api";

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
        name: "",
        phone: "",
        gender: "",
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
    handleImageUpload (event)
    {
      const file = event.target.files[0];
      if (file) {
        this.formGuest.image = file;
      }
    },
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
    },

    async submitFormGuest ()
    {
      try {
        this.resetValidationMessages();
        this.isSubmitting = true;

        // Validate required fields
        const requiredFields = ["name", "gender", "phone"];
        let hasError = false;

        requiredFields.forEach((field) =>
        {
          if (!this.formGuest[field]) {
            hasError = true;
            this.validationMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)
              } is required`;

            const element = this.$refs[field];
            if (element && element.classList) {
              element.classList.add("input-error");
            }
          }
        });

        if (hasError) {
          throw new Error("Please fill in all required fields");
        }

        // Create formGuestData for image upload
        const formGuestData = new formGuestData();
        if (this.formGuest.image) {
          formGuestData.append("image", this.formGuest.image);
        }

        // Append all other form data
        Object.entries(this.formGuest).forEach(([key, value]) =>
        {
          if (key !== "image") {
            if (typeof value === "object") {
              formGuestData.append(key, JSON.stringify(value));
            } else {
              formGuestData.append(key, value);
            }
          }
        });

        // Make API call
        const response = await addGuest(formGuestData);

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Guest added successfully.",
          confirmButtonText: "OK",
        });

        // Reset form after success
        this.resetForm();

        // Emit event for parent component
        this.$emit("guest-added", response.data);
      } catch (error) {
        // Handle validation errors
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach((field) =>
          {
            if (this.$refs[field]) {
              this.$refs[field].classList.add("input-error");
              this.validationMessages[field] = errors[field][0];
            }
          });
        }

        // Show error message
        await Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            error.message ||
            "Failed to add guest. Please try again.",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped></style>
