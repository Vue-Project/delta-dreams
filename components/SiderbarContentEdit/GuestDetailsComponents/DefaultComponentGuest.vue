<template>
    <form ref="guestForm" id="formGustInfo" @submit.prevent="submitFormUpdateGuest">
        <fieldset :disabled="!isClientEditable">
            <!-- <p>{{ isClientEditable }}</p> -->

            <div class="row pe-0 p-3 mb-5">
                <div class="col-md-6">
                    <div class="row">
                        <!-- <div div class="col-md-4">
            <DropzoneComponent :id="'my-dropzone'" />
          </div> -->
                        <div class="col-md-12 ps-0">
                            <div class="mb-3">
                                <label for="formGustInfoName" class="col-form-label">Name</label>

                                <input type="text" class="form-control" id="formGustInfoName" placeholder="Name Guest" aria-label="input text to Gust Name" v-model="formGuest.name" ref="name" :class="{ 'input-error': validationMessages.name }" />
                                <span class="error-message small" v-if="$v.formGuest.name.$error">Name is required</span>
                            </div>

                            <div class="mb-3">
                                <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                                <input class="form-control" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" v-model="formGuest.OtherInformation.idNumber" />
                                <span class="error-message small" v-if="$v.formGuest.OtherInformation.idNumber.$error">ID Number is required</span>
                            </div>
                            <div class="mb-2">
                                <label class="form-label" for="payment_Image">Id Number Image</label>
                                <input type="file" class="form-control" id="payment_Image" multiple @change="handleIdImagesUpload" accept="image/*" />
                                <div class="mt-2" v-if="IdImagesPreview.length > 0">
                                    <div class="d-flex flex-wrap gap-2 mt-2">
                                        <div v-for="(preview, index) in IdImagesPreview" :key="index" class="position-relative" style="width: 80px; height: 80px">
                                            <img :src="preview.url" class="img-thumbnail" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer" :alt="preview.name" @click="showImg(preview.url)" />
                                            <button type="button" class="btn btn-sm btn-danger position-absolute" style="top: -10px; right: -10px; border-radius: 50%; padding: 0.2rem 0.5rem" @click="removeImage(index)">
                                                <i class="fa-solid fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <vue-easy-lightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide" />

                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6 ps-0">
                            <div class="mb-3">
                                <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                                <input class="form-control rounded-2" type="text" value="Phone" id="formGustInfoPhone" placeholder="phone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone" :class="{ 'input-error': validationMessages.phone }" />
                                <span class="error-message small" v-if="$v.formGuest.phone.$error">Phone is required</span>
                            </div>
                        </div>
                        <div class="col-md-6 ps-0">
                            <div class="mb-3">
                                <label for="formGustInformInternationalNumber" class="col-form-label internationalNumber">International Phone</label>
                                <input class="form-control rounded-2" type="text" value="International Number" placeholder="International Phone" id="formGustInformInternationalNumber" aria-label="input tel to Gust International Number" v-model="formGuest.internationalNumber" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12 ps-0">
                            <label for="formGustIdentityIdType" class="col-form-label">ID Type</label>
                            <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type" v-model="formGuest.OtherInformation.idType">
                                <option value="" disabled selected>Select</option>
                                <option v-for="(nationalType, index) in getNationalTypes" :key="index" :value="index">
                                    {{ nationalType }}
                                </option>
                            </select>
                            <span class="error-message small" v-if="$v.formGuest.OtherInformation.idType.$error">ID Type is required</span>
                        </div>
                        <div class="col-md-6 col-12 ps-0">
                            <label for="flatpickr-date-08" class="col-form-label">Expiry Date</label>
                            <input type="text" class="form-control" placeholder="YYYY-MM-D " id="flatpickr-date-08" ref="datePicker8" aria-label="input Text to Expiry Date" v-model="formGuest.OtherInformation.expiryDate" />
                            <!-- <span class="error-message small" v-if="$v.formGuest.OtherInformation.expiryDate.$error">Expiry Date is required</span> -->
                            <i class="fa-solid fa-calendar-days icon-date top"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion px-0 mt-3" id="accordionExample">
                <div class="card px-0 accordion-item active">
                    <h2 class="accordion-header" id="headingOne">
                        <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">Other Information</button>
                    </h2>

                    <div id="accordionOne" class="accordion-collapse px-0 collapse" data-bs-parent="#accordionExample" style="">
                        <div class="row accordion-body px-0">
                            <!-- <div class="row p-3 mb-2"> -->
                            <!-- <div class="col-md-6 pe-0">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone2" v-model="formGuest.OtherInformation.image" />
                  </div>
                  <div class="col-md-8"></div>
                </div>
              </div> -->

                            <!-- <div class="col-md-6"></div> -->
                            <!-- </div> -->

                            <div class="row">
                                <div class="col-md-6">
                                    <label for="formGustIdentityGender" class="col-form-label">Gender</label>
                                    <select class="form-select" v-model="formGuest.gender" ref="gender" :class="{ 'input-error': validationMessages.gender }">
                                        <option value="" disabled selected>Select Gender</option>
                                        <option v-for="(gender, index) in getGenderTypes" :key="index" :value="index">
                                            {{ gender }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                                        <input class="form-control" type="text" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" placeholder="Mobile" v-model="formGuest.mobile" />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label for="formGustInfoEmail" class="col-form-label">Email</label>
                                        <input type="email" class="form-control" id="formGustInfoEmail" placeholder="Email" aria-label="input email to Gust Email" v-model="formGuest.email" r />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <label for="formGustInfoAddress" class="col-form-label">Address</label>
                                    <input class="form-control" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" v-model="formGuest.address" />
                                </div>
                                <div class="col-md-3">
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
                                <div class="col-md-3">
                                    <label for="formGustInfoState" class="col-form-label">State</label>
                                    <input class="form-control" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" v-model="formGuest.state" />
                                </div>
                                <div class="col-md-3">
                                    <label for="formGustInfoCity" class="col-form-label">City</label>
                                    <input class="form-control" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" v-model="formGuest.city" />
                                </div>
                            </div>

                            <div class="col-12 my-3">Personal Information</div>
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <label for="flatpickr-date-07" class="col-form-label">Birth Date</label>
                                    <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Birth Date" v-model="formGuest.OtherInformation.paymentMethod.birthDate" />
                                    <i class="fa-solid fa-calendar-days icon-date top"></i>
                                </div>
                                <div class="col-md-3">
                                    <label for="NationalityGuest" class="col-form-label">Nationality</label>
                                    <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.OtherInformation.paymentMethod.nationality">
                                        <option value="" disabled selected>Select</option>
                                        <option v-for="(nationality, index) in getCountries" :key="index" :value="index">
                                            {{ nationality }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="VIPGuest" class="col-form-label">VIP Status</label>
                                    <select class="form-select" id="formGustVIP" aria-label="select VIP" v-model="formGuest.OtherInformation.paymentMethod.vipStatus">
                                        <option value="" disabled selected>Select</option>
                                        <option v-for="(vipStatus, index) in getVipStatus" :key="index" :value="index">
                                            {{ vipStatus }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="formGustInfoZip" class="col-form-label">Zip</label>
                                    <input class="form-control" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" v-model="formGuest.zip" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="offset-md-10 col-md-2 col-12 text-end">
                    <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light w-100">Update</button>
                </div>
            </div>
        </fieldset>
    </form>
</template>

<script>
    import DropzoneComponent from '../../layout/DropzoneComponent.vue';
    import flatpickrMixin from '../../Mixin/flatpickrMixin';
    import { PostUpdateGuest } from '../../../Api/userApi';
    import { mapGetters } from 'vuex';
    import { handleSubmissionError, showSuccessAlert } from '../../../Api/MassageValidation/alertUtilities';
    import { validationMixin } from 'vuelidate';
    import { required, email } from 'vuelidate/lib/validators';

    export default {
        name: 'DefaultContent',
        components: {
            DropzoneComponent,
        },
        mixins: [flatpickrMixin, validationMixin],
        data() {
            return {
                reservationIds: '',
                formGuest: {
                    image: null,
                    name: '',
                    email: '',
                    phone: '',
                    internationalNumber: '',
                    mobile: '',
                    gender: '',
                    address: '',
                    country: '',
                    state: '',
                    city: '',
                    zip: '',
                    OtherInformation: {
                        image: null,
                        idNumber: '',
                        idType: '',
                        expiryDate: '',
                        paymentMethod: {
                            birthDate: '',
                            nationality: '',
                            vipStatus: '',
                        },
                    },
                },
                validationMessages: {
                    name: '',
                    phone: '',
                    gender: '',
                },
                IdImages: [],
                IdImagesPreview: [],
                visible: false,
                index: 0,
                imgs: [],
            };
        },
        validations: {
            formGuest: {
                name: { required },
                phone: { required },
                OtherInformation: {
                    idNumber: { required },
                    idType: { required },
                    // expiryDate: { required },
                },
            },
        },
        methods: {
            // New method to handle payment image uploads
            handleIdImagesUpload(event) {
                // Get selected files from event
                const files = event.target.files;

                if (!files.length) return;

                // Add to existing selections rather than replacing them
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    // Only add if it's an image
                    if (file.type.startsWith('image/')) {
                        // Create URL for preview
                        const fileURL = URL.createObjectURL(file);

                        // Add to storage arrays
                        this.IdImages.push(file);
                        this.IdImagesPreview.push({
                            name: file.name,
                            size: (file.size / 1024).toFixed(2) + ' KB',
                            url: fileURL,
                        });
                    }
                }

                // Reset the file input so the same files can be selected again if needed
                event.target.value = '';
            },

            // Method to remove an image from the selection
            removeImage(index) {
                // Remove the URL to prevent memory leaks
                if (this.IdImagesPreview[index] && this.IdImagesPreview[index].url) {
                    URL.revokeObjectURL(this.IdImagesPreview[index].url);
                }

                // Remove from arrays
                this.IdImages.splice(index, 1);
                this.IdImagesPreview.splice(index, 1);
            },

            resetValidationMessages() {
                this.validationMessages = {
                    name: '',
                    gender: '',
                    phone: '',
                };

                // Remove error classes
                ['name', 'gender', 'phone'].forEach(field => {
                    const element = this.$refs[field];
                    if (element && element.classList) {
                        element.classList.remove('input-error');
                    }
                });
            },

            resetForm() {
                this.formGuest = {
                    image: '',
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
                    OtherInformation: {
                        image: '',
                        idNumber: '',
                        idType: '',
                        issuingCountry: '',
                        issuingCity: '',
                        expiryDate: '',
                        paymentMethod: {
                            paymentMethod: '',
                            directBilling: '',
                            birthDate: '',
                            birthCountry: '',
                            nationality: '',
                            vipStatus: '',
                            spouseBirthDate: '',
                            weddingAnniversary: '',
                            registrationNo: '',
                        },
                    },
                };
                // Reset payment images as well
                // Clean up any created object URLs to prevent memory leaks
                this.IdImagesPreview.forEach(preview => {
                    if (preview.url) {
                        URL.revokeObjectURL(preview.url);
                    }
                });
                this.IdImages = [];
                this.IdImagesPreview = [];
                this.resetValidationMessages();
            },

            async submitFormUpdateGuest() {
                try {
                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    }
                    const formData = new FormData();

                    // Create basic guest data object
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

                    // Convert object to FormData for sending files
                    Object.keys(updateGuestData).forEach(key => {
                        if (updateGuestData[key] !== null && updateGuestData[key] !== undefined) {
                            formData.append(key, updateGuestData[key]);
                        }
                    });

                    // Append payment images if available
                    if (this.IdImages.length > 0) {
                        this.IdImages.forEach((file, index) => {
                            formData.append(`all_images[${index}]`, file);
                        });
                    }

                    // Make API call with FormData which includes both text data and files
                    const response = await PostUpdateGuest(this.reservationData.client.id, formData);

                    // Show success message
                    await showSuccessAlert('Guest updated successfully.');

                    // Emit event to parent component
                    this.$emit('guest-updated');

                    this.isSubmitting = false;
                } catch (error) {
                    await handleSubmissionError(error);
                } finally {
                    this.isSubmitting = false;
                }
            },
            fillFormGuest(reservationData) {
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
                            vipStatus: client.vip_status || '',
                        },
                    },
                };

                // Reset payment images when loading new data
                // Clean up any created object URLs first
                this.IdImagesPreview.forEach(preview => {
                    if (preview.url) {
                        URL.revokeObjectURL(preview.url);
                    }
                });
                this.IdImages = [];
                this.IdImagesPreview = [];
            },
            showImg(img) {
                this.imgs = [img];
                this.index = 0;
                this.visible = true;
            },
            handleHide() {
                this.visible = false;
            },
        },
        computed: {
            isClientEditable() {
                return this.reservationData.is_client_edit;
            },
            ...mapGetters(['getCountries', 'getVipStatus', 'getNationalTypes', 'getGenderTypes']),
        },
        props: {
            reservationId: {
                type: [String, Number],
                required: true,
            },
            reservationData: {
                type: Object,
                default: () => ({}),
            },
        },
        watch: {
            reservationData: {
                immediate: true, // This ensures the watcher is triggered immediately when the component is created
                handler(newData) {
                    if (newData) {
                        this.fillFormGuest(newData);
                    }
                },
            },
        },
    };
</script>
