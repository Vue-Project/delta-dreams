<template>
   <div class="add-guest-sidebar">
      <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
         <div class="sidebar-content">
            <h3>{{ title }}</h3>
            <hr class="my-2" />
            <slot>
               <form ref="guestForm" id="formGustInfo" @submit.prevent="submitFormGuest">
                  <div class="row p-3 mb-5">
                     <div class="col-md-6">
                        <div class="row">
                           <!-- <div div class="col-md-4">
                    <DropzoneComponent :id="'profile-image'" v-model="formGuest.profileImage" @dropzone-error="handleDropzoneError" />
                  </div> -->
                           <div class="col-md-12">
                              <div class="mb-lg-3">
                                 <label for="formGustInfoName" class="col-form-label">Name</label>
                                 <input type="text" class="form-control rounded-2" id="formGustInfoName" placeholder="Name Guest" aria-label="input text to Gust Name" v-model="formGuest.name" ref="name" :class="{ 'input-error': validationMessages.name }" />
                                 <!-- <span class="error-message small" v-if="$v.formGuest.name.$error">Name is required</span> -->
                              </div>
                           </div>
                        </div>
                     </div>

                     <div class="col-md-3">
                        <div class="mb-lg-3">
                           <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                           <input class="form-control rounded-2" type="text" value="Phone" id="formGustInfoPhone" placeholder="phone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone" :class="{ 'input-error': validationMessages.phone }" />
                           <!-- <span
                        class="error-message small"
                        v-if="$v.formGuest.phone.$error"
                      >
                        Phone is required
                      </span> -->
                        </div>
                     </div>
                     <div class="col-md-3">
                        <div class="mb-lg-3">
                           <label for="formGustInformInternationalNumber" class="col-form-label internationalNumber">International Phone</label>
                           <input class="form-control rounded-2" type="text" value="International Number" placeholder="International Phone" id="formGustInformInternationalNumber" aria-label="input tel to Gust International Number" v-model="formGuest.internationalNumber" />
                        </div>
                     </div>
                  </div>
                  <div class="accordion px-0 mt-3 mb-5" id="accordionExample">
                     <div class="card accordion-item active">
                        <h2 class="accordion-header" id="headingOne">
                           <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">Other Information</button>
                        </h2>

                        <div id="accordionOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
                           <div class="row accordion-body pe-0">
                              <div class="row p-3 mb-2">
                                 <div class="col-md-6">
                                    <label for="formGustIdentityGender" class="col-form-label">Gender</label>
                                    <select class="form-select" v-model="formGuest.gender" ref="gender" :class="{ 'input-error': validationMessages.gender }">
                                       <option value="" disabled selected>Select Gender</option>
                                       <option v-for="(gender, index) in getGenderTypes" :key="index" :value="index">
                                          {{ gender }}
                                       </option>
                                    </select>
                                 </div>
                                 <div class="col-md-6">
                                    <div class="row">
                                       <div class="col-md-6">
                                          <label for="formGustInfoEmail" class="col-form-label">Email</label>
                                          <input type="email" class="form-control" id="formGustInfoEmail" placeholder="email" aria-label="input email to Gust Email" v-model="formGuest.email" />
                                       </div>
                                       <div class="col-md-6">
                                          <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                                          <input class="form-control rounded-2" type="text" value="Mobile" placeholder="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="formGuest.mobile" />
                                       </div>
                                    </div>
                                 </div>

                                 <!-- <div class="col-md-6 pe-0">byubyubuy
                        <div class="row">
                          <div class="col-md-6 ps-1">
                            <label for="formGustInfoAddress" class="col-form-label">Address</label>
                            <input class="form-control rounded-2" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" v-model="formGuest.address" />
                          </div>
                          <div class="col-md-6 ps-1">
                            <div class="mb-lg-3">
                              <label for="formGustIdentityGender" class="col-form-label">Gender</label>
                              <select class="form-select" v-model="formGuest.gender" ref="gender" :class="{ 'input-error': validationMessages.gender }">
                                <option value="" disabled selected>Select Gender</option>
                                <option v-for="(gender, index) in getGenderTypes" :key="index" :value="index">
                                  {{ gender }}
                                </option>
                              </select>
                              <span class="error-message small" v-if="$v.formGuest.gender.$error">
                                Gender is required
                              </span>
                            </div>

                          </div>
                        </div>

                      </div> -->
                              </div>
                              <div class="row">
                                 <div class="col-md-6">
                                    <div class="row">
                                       <div class="col-md-6">
                                          <label for="formGustInfoAddress" class="col-form-label">Address</label>
                                          <input type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" class="form-control rounded-2" />
                                       </div>
                                       <div class="col-md-6">
                                          <label for="countryGuest" class="col-form-label">Country</label>
                                          <select id="countryGuest" class="form-select">
                                             <option value="" disabled selected>Select</option>
                                             <option v-for="(country, index) in getCountries" :key="index" :value="index">
                                                {{ country }}
                                             </option>
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-md-6">
                                    <div class="row">
                                       <div class="col-md-6">
                                          <label for="formGustInfoState" class="col-form-label">State</label>
                                          <input type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" class="form-control rounded-2" />
                                       </div>
                                       <div class="col-md-6">
                                          <label for="formGustInfoCity" class="col-form-label">City</label>
                                          <input type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" class="form-control rounded-2" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-12 mb-lg-3">Personal Information</div>
                              <div class="row mb-lg-3">
                                 <div class="col-md-3">
                                    <label for="flatpickr-date-07" class="col-form-label">Birth Date</label>
                                    <input type="text" class="form-control rounded-2 flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Birth Date" v-model="formGuest.birthDate" />
                                    <i class="fa-solid fa-calendar-days icon-date top"></i>
                                 </div>
                                 <div class="col-md-3">
                                    <label for="NationalityGuest" class="col-form-label">Nationality</label>
                                    <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.nationality">
                                       <option value="" disabled selected>Select</option>
                                       <option v-for="(country, index) in getCountries" :key="index" :value="index">
                                          {{ country }}
                                       </option>
                                    </select>
                                 </div>
                                 <div class="col-md-3">
                                    <label for="VIPGuest" class="col-form-label">VIP Status</label>
                                    <select class="form-select rounded-2" id="formGustVIP" aria-label="select VIP" v-model="formGuest.vipStatus">
                                       <option value="" disabled selected>Select</option>
                                       <option v-for="(vipStatus, index) in getVipStatus" :key="index" :value="index">
                                          {{ vipStatus }}
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
                     <button @click="$emit('close-sidebar')" class="btn btn-secondary waves-effect waves-light">Close</button>
                     <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>
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
   import flatpickrMixin from '../Mixin/flatpickrMixin';
   import DropzoneComponent from './DropzoneComponent.vue';
   import { addGuest } from '../../Api/userApi';
   import { mapGetters } from 'vuex';
   import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';
   import { validationMixin } from 'vuelidate';
   import { required, email } from 'vuelidate/lib/validators';
   export default {
      name: 'QuickAddGuestSidebar',
      layout: 'component',
      props: {
         isSidebarOpen: {
            type: Boolean,
            required: true,
            default: false,
         },
         title: {
            type: String,
            default: ' Add Guest',
         },
         width: {
            type: String,
            default: '1000px',
         },
         height: {
            type: String,
            default: '1300px',
         },
      },
      data() {
         return {
            formGuest: {
               profileImage: null,
               name: '',
               email: '',
               phone: '',
               mobile: '',
               gender: '',
               address: '',
               country: '',
               state: '',
               city: '',
               zip: '',
               internationalNumber: '',
               identityImage: null,
               idNumber: '',
               idType: '',
               expiryDate: '',

               birthDate: '',
               birthCountry: '',
               nationality: '',
               vipStatus: '',
            },
            validationMessages: {
               name: '',
               phone: '',
               gender: '',
               idNumber: '',
               idType: '',
               expiryDate: '',
            },
            uploadedFileData: null,
         };
      },
      validations: {
         formGuest: {
            // name: { required },
            // phone: { required },
            // idNumber: { required },
            // idType: { required },
            // expiryDate: { required },
         },
      },

      components: {
         DropzoneComponent,
      },

      methods: {
         resetValidationMessages() {
            this.validationMessages = {
               name: '',
               gender: '',
               phone: '',
               idNumber: '',
               idType: '',
               expiryDate: '',
            };

            // Remove error classes
            ['name', 'gender', 'phone', 'idNumber', 'idType', 'expiryDate'].forEach(field => {
               const element = this.$refs[field];
               if (element && element.classList) {
                  element.classList.remove('input-error');
               }
            });
         },

         resetForm() {
            this.formGuest = {
               profileImage: null,
               name: '',
               email: '',
               phone: '',
               mobile: '',
               gender: '',
               address: '',
               country: '',
               state: '',
               city: '',
               zip: '',
               internationalNumber: '',
               identityImage: null,
               idNumber: '',
               idType: '',
               expiryDate: '',

               birthDate: '',
               birthCountry: '',
               nationality: '',
               vipStatus: '',
            };
            this.resetValidationMessages();
         },

         handleDropzoneError(error) {
            // Handle the error appropriately
            this.handleSubmissionError(error, 'Error uploading image');
         },

         async submitFormGuest() {
            try {
               this.$v.$touch();
               if (this.$v.$invalid) {
                  return;
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
                  birth_date: this.formGuest.birthDate,
                  vip_status: this.formGuest.vipStatus,
                  nationality: this.formGuest.nationality,
                  national_id: this.formGuest.idNumber,
                  national_expire_date: this.formGuest.expiryDate,
                  national_type: this.formGuest.idType,
                  is_fast: 1,
               };

               // Append all text data to FormData
               Object.keys(addGuestData).forEach(key => {
                  formData.append(key, addGuestData[key]);
               });

               // Append images if they exist
               if (this.formGuest.profileImage?.file) {
                  formData.append('profile_image', this.formGuest.profileImage.file);
               }

               if (this.formGuest.identityImage?.file) {
                  formData.append('identity_image', this.formGuest.identityImage.file);
               }

               // Add this code to log all FormData entries
               // for (let pair of formData.entries()) {
               //   console.log(pair[0] + ': ' + pair[1]);
               // }

               // Make API call with FormData
               const response = await addGuest(formData);

               // await showSuccessAlert("Guest added successfully!");

               // Emit the new guest data to parent
               this.$emit('guest-added', response.data.data);

               // Reset form and close sidebar
               this.resetForm();
               this.$emit('close-sidebar');
            } catch (error) {
               handleSubmissionError(error, 'Please fill in all required fields');
            } finally {
               this.isSubmitting = false;
            }
         },
      },

      computed: {
         ...mapGetters(['getCountries', 'getVipStatus', 'getNationalTypes', 'getGenderTypes']),
      },
      mixins: [flatpickrMixin, validationMixin],
      watch: {
         isSidebarOpen(newVal) {
            if (newVal) {
               this.initFlatpickers();
            }
         },
      },
   };
</script>
