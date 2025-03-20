<template>

  <form ref="guestForm" id="formGustInfo" @submit.prevent="submitFormUpdateGuest">
    <div class="row pe-0 p-3 mb-5">
      <div class="col-md-6">
        <div class="row">
          <div div class="col-md-4">
            <DropzoneComponent :id="'my-dropzone'" />
          </div>
          <div class="col-md-8 ps-0">
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
          <div class="col-md-6 ps-0">
            <div class="mb-3">
              <label for="formGustInfoPhone" class="col-form-label">Phone</label>
              <input class="form-control" type="text" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone" :class="{ 'input-error': validationMessages.phone }" />
              <span class="error-message" v-if="validationMessages.phone">{{ validationMessages.phone }}</span>
            </div>
          </div>
          <div class="col-md-6 ps-0">
            <div class="mb-3">
              <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
              <input class="form-control" type="text" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="formGuest.mobile" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-12 ps-0">
            <label for="formGustIdentityGender" class="col-form-label">Gender</label>
            <select class="form-select" v-model="formGuest.gender" ref="gender" :class="{ 'input-error': validationMessages.gender }">
              <option value="" disabled selected>Select Gender</option>
              <option v-for="(gender, index) in getGenderTypes" :key="index" :value="index">
                {{ gender }}
              </option>
            </select>
            <span class="error-message" v-if="validationMessages.gender">{{ validationMessages.gender }}</span>
          </div>
          <div class="col-md-6 col-12 ps-0">
            <label for="formGustInformInternationalNumber" class="col-form-label">International Number</label>
            <input class="form-control" type="text" value="International Number" id="formGustInformInternationalNumber" aria-label="input tel to Gust International Number" v-model="formGuest.internationalNumber" />
          </div>
        </div>
      </div>
      <div class="row px-0">
        <div class="col-md-3 pe-0">
          <label for="formGustInfoAddress" class="col-form-label">Address</label>
          <input class="form-control" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" v-model="formGuest.address" />
        </div>
        <div class="col-md-3 pe-0">
          <!-- <label for="countryGuest" class="col-form-label">Country</label>
                  <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" v-model="formGuest.country" /> -->
          <label for="countryGuest" class="col-form-label">Country</label>
          <select class="form-select" v-model="formGuest.country" id="countryGuest">
            <option disabled value="">Select Country</option>
            <option v-for="(country, index) in getCountries" :key="index" :value="index">
              {{ country }}
            </option>
          </select>
        </div>
        <div class="col-md-3 pe-0">
          <label for="formGustInfoState" class="col-form-label">State</label>
          <input class="form-control" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" v-model="formGuest.state" />
        </div>
        <div class="col-md-3 pe-0">
          <label for="formGustInfoCity" class="col-form-label">City</label>
          <input class="form-control" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" v-model="formGuest.city" />
        </div>
      </div>
    </div>
    <div class="accordion px-0 mt-3" id="accordionExample">
      <div class="card px-0 accordion-item active">
        <h2 class="accordion-header" id="headingOne">
          <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">
            Other Information
          </button>
        </h2>

        <div id="accordionOne" class="accordion-collapse px-0 collapse show" data-bs-parent="#accordionExample" style="">
          <div class="row accordion-body px-0">
            <div class="col-12 mb-3">Identity Information</div>

            <div class="row p-3 pe-0  mb-2">
              <div class="col-md-6 pe-0 ">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone2" v-model="formGuest.OtherInformation.image" />
                  </div>
                  <div class="col-md-8">
                    <div class="mb-3">
                      <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                      <input class="form-control" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" v-model="formGuest.OtherInformation.idNumber" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6 pe-0 ">
                    <div class="mb-3 ">
                      <label for="formGustIdentityIdType" class="col-form-label">ID Type</label>
                      <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type" v-model="formGuest.OtherInformation.idType">
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option v-for="(nationalType, index) in getNationalTypes" :key="index" :value="index">
                          {{ nationalType }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 pe-0">
                    <div class="mb-3">
                      <label for="flatpickr-date-08" class="col-form-label">Expiry Date</label>
                      <input type="text" class="form-control" placeholder="YYYY-MM-D " id="flatpickr-date-08" ref="datePicker8" aria-label="input Text to Expiry Date" v-model="formGuest.OtherInformation.expiryDate" />
                      <i class="fa-solid fa-calendar-days icon-date top"></i>

                    </div>
                  </div>
                </div>

              </div>
            </div>


            <div class="col-12 mb-3">Personal Information</div>
            <div class="row mb-3 pe-0">

              <div class="col-md-3 pe-0">
                <label for="flatpickr-date-07" class="col-form-label">Birth Date</label>
                <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Birth Date" v-model="formGuest.OtherInformation.paymentMethod
                  .birthDate
                  " />
                <i class="fa-solid fa-calendar-days icon-date top"></i>

              </div>
              <div class="col-md-3 pe-0">
                <label for="NationalityGuest" class="col-form-label">Nationality</label>
                <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.OtherInformation.paymentMethod.nationality
                  ">

                  <option value="" disabled selected>
                    Select
                  </option>
                  <option v-for="(nationality, index) in getCountries" :key="index" :value="index">
                    {{ nationality }}
                  </option>


                </select>
              </div>
              <div class="col-md-3 pe-0">
                <label for="VIPGuest" class="col-form-label">VIP Status</label>
                <select class="form-select" id="formGustVIP" aria-label="select VIP" v-model="formGuest.OtherInformation.paymentMethod.vipStatus
                  ">
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option v-for="(vipStatus, index) in getVipStatus" :key="index" :value="index">
                    {{ vipStatus }}
                  </option>
                </select>
              </div>
              <div class="col-md-3 pe-0">
                <label for="formGustInfoZip" class="col-form-label">Zip</label>
                <input class="form-control" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" v-model="formGuest.zip" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="offset-md-10 col-md-2 col-12 text-end ">
        <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light w-100">
          Update
        </button>
      </div>
    </div>
  </form>



</template>

<script>
import DropzoneComponent from "../../layout/DropzoneComponent.vue";
import flatpickrMixin from "../../Mixin/flatpickrMixin";
import { PostUpdateGuest } from "../../../Api/userApi";
import { mapGetters } from 'vuex';
import { handleSubmissionError, showSuccessAlert } from "../../../Api/MassageValidation/alertUtilities";


export default {
  name: "DefaultContent",
  components: {
    DropzoneComponent
  },
  mixins: [flatpickrMixin],
  data ()
  {
    return {
      reservationIds: "",
      formGuest: {
        image: null,
        name: "",
        email: "",
        phone: "",
        internationalNumber: "",
        mobile: "",
        gender: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        OtherInformation: {
          image: null,
          idNumber: "",
          idType: "",
          expiryDate: "",
          paymentMethod: {
            birthDate: "",
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
    };
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

    async submitFormUpdateGuest ()
    {
      try {
        const formData = new FormData();
        formData.append('image', this.formGuest.image ? this.formGuest.image.file : null);
        formData.append('image', this.formGuest.OtherInformation.image ? this.formGuest.OtherInformation.image.file : null);

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
        const updateGuestData = {
          image: this.formGuest.image,
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
          nationality: this.formGuest.OtherInformation.paymentMethod.nationality,
          vip_status: this.formGuest.OtherInformation.paymentMethod.vipStatus,
          national_id: this.formGuest.OtherInformation.idNumber,
          national_expire_date: this.formGuest.OtherInformation.expiryDate,
          national_type: this.formGuest.OtherInformation.idType,
        };
        // const updateGuestData = {
        //   reservationId: this.reservationId,
        //   image: this.formGuest.image,
        //   name: this.formGuest.name,
        //   email: this.formGuest.email,
        //   mobile: this.formGuest.mobile,
        //   phone: this.formGuest.phone,
        //   gender: this.formGuest.gender,
        //   address: this.formGuest.address,
        //   country: this.formGuest.country,
        //   state: this.formGuest.state,
        //   city: this.formGuest.city,
        //   zip: this.formGuest.zip,
        //   OtherInformation: {
        //     image: this.formGuest.OtherInformation.image,
        //     idNumber: this.formGuest.OtherInformation.idNumber,
        //     idType: this.formGuest.OtherInformation.idType,
        //     issuingCountry: this.formGuest.OtherInformation.issuingCountry,
        //     issuingCity: this.formGuest.OtherInformation.issuingCity,
        //     expiryDate: this.formGuest.OtherInformation.expiryDate,
        //     paymentMethod: {
        //       paymentMethod: this.formGuest.OtherInformation.paymentMethod.paymentMethod,
        //       directBilling: this.formGuest.OtherInformation.paymentMethod.directBilling,
        //       birthDate: this.formGuest.OtherInformation.paymentMethod.birthDate,
        //       birthCountry: this.formGuest.OtherInformation.paymentMethod.birthCountry,
        //       nationality: this.formGuest.OtherInformation.paymentMethod.nationality,
        //       vipStatus: this.formGuest.OtherInformation.paymentMethod.vipStatus,
        //       spouseBirthDate: this.formGuest.OtherInformation.paymentMethod.spouseBirthDate,
        //       weddingAnniversary: this.formGuest.OtherInformation.paymentMethod.weddingAnniversary,
        //       registrationNo: this.formGuest.OtherInformation.paymentMethod.registrationNo,
        //     },

        //   },

        // };

        // Make API call
        const response = await PostUpdateGuest(this.reservationData.client.id, updateGuestData);

        // Show success message
        await showSuccessAlert("Guest updated successfully.");

        // Emit event to parent component
        this.$emit('guest-updated');

        this.isSubmitting = false;

      } catch (error) {
        await handleSubmissionError(error);
      } finally {
        this.isSubmitting = false;
      }
    },
    fillFormGuest (reservationData)
    {
      if (!reservationData || typeof reservationData !== 'object') {
        console.warn('Invalid reservation data received');
        return;
      }

      // Debug log to see what data we're receiving

      const client = reservationData.client || reservationData.user || {};

      this.formGuest = {
        ...this.formGuest,
        image: client.image || null,
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        mobile: client.mobile || '',
        gender: client.gender || '',
        address: client.address || '',
        country: client.country || '',
        state: client.state || '',
        city: client.city || '',
        zip: client.zip_code || '',
        internationalNumber: client.international_phone || '',
        OtherInformation: {
          ...this.formGuest.OtherInformation,
          image: client.national_id_image || null,
          idNumber: client.national_id || '',
          idType: client.national_type || '',
          expiryDate: client.national_expire_date || '',
          paymentMethod: {
            ...this.formGuest.OtherInformation.paymentMethod,
            birthDate: client.birth_date || '',
            nationality: client.nationality || '',
            vipStatus: client.vip_status || ''
          }
        }
      };

      // Debug log to see the final form data
    }
  },
  computed: {

    ...mapGetters([

      'getCountries',
      'getVipStatus',
      'getNationalTypes',
      'getGenderTypes',
    ]),
  },
  props: {
    reservationId: {
      type: [String, Number],
      required: true,
    },
    reservationData: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    reservationData: {
      immediate: true, // This ensures the watcher is triggered immediately when the component is created
      handler (newData)
      {
        if (newData) {
          this.fillFormGuest(newData);
        }
      },
    },


  },

};
</script>
