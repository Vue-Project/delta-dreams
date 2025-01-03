<template>
  <form id="formGustDetails">
    <div class="row p-3 mb-5">
      <div class="col-md-6">
        <div class="row">
          <div div class="col-md-4">
            <DropzoneComponent id="dropzone3" />
          </div>
          <div class="col-md-8 mb-1">
            <div class="mb-4">
              <label for="formGustDetailsName" class="col-form-label">
                Name</label>
              <div class="input-group">

                <input type="text" class="form-control w-50" aria-label="Text input with select list" id="formGustDetailsName" placeholder="Name of guest" />
              </div>
            </div>
            <div class="mb-3">
              <label for="formGustDetailsEmail" class="form-label">Email
              </label>
              <input type="email" class="form-control" id="formGustDetailsEmail" placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="row">
          <!-- Phone Field (Half width) -->
          <div class="col-md-6">
            <div class="">
              <label for="formGustDetailsPhone" class="col-form-label">Phone</label>
              <input class="form-control" type="tel" value="Phone" id="formGustDetailsPhone" aria-label="input tel to Gust Phone" />
            </div>
          </div>

          <!-- Mobile Field (Half width) -->
          <div class="col-md-6 mb-3">
            <div class="">
              <label for="formGustDetailsMobile" class="col-form-label">Mobile</label>
              <input class="form-control" type="tel" value="Mobile" id="formGustDetailsMobile" aria-label="input tel to Gust Mobile" />
            </div>
          </div>

          <!-- ID Type Field (Half width) -->
          <div class="col-md-3">
            <div class="mb-3">
              <label for="formGustIdentityIdType" class="col-form-label">Gender</label>
              <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                <option value="" disabled selected>-Select-</option>
                <option value="option1">Male</option>
                <option value="option2">Female</option>
                <option value="option3">Other</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <label for="formGustIdentityIdType" class="col-form-label">Guest Type</label>
              <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                <option value="" disabled selected>-Select-</option>
                <option value="option1">Adult</option>
                <option value="option2">Child</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="formGustIdentityIdType" class="col-form-label">
                VIP Status</label>
              <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                <option value="" disabled selected>-Select-</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <label for="formGustDetailsAddress" class="col-form-label">Address</label>
        <input class="form-control" type="text" id="formGustDetailsAddress" placeholder="Address" aria-label="input Text to Gust Address" />
      </div>
      <div class="row mt-2">
        <div class="col-md-3">
          <label for="countryGuest" class="col-form-label">Country</label>
          <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" />
        </div>
        <div class="col-md-3">
          <label for="formGustDetailsState" class="col-form-label">State</label>
          <input class="form-control" type="text" id="formGustDetailsState" placeholder="state" aria-label="input Text to Gust state" />
        </div>
        <div class="col-md-3">
          <label for="formGustDetailsCity" class="col-form-label">City</label>
          <input class="form-control" type="text" id="formGustDetailsCity" placeholder="city" aria-label="input Text to Gust city" />
        </div>
        <div class="col-md-3">
          <label for="formGustDetailsZip" class="col-form-label">Zip</label>
          <input class="form-control" type="text" id="formGustDetailsZip" placeholder="Zip" aria-label="input Text to Gust Zip" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-3">
          <label for="countryGuest" class="col-form-label">Nationality</label>
          <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" />
        </div>
        <div class="col-md-3">
          <label for="formGustDetailsState" class="col-form-label">Company</label>
          <input class="form-control" type="text" id="formGustDetailsState" placeholder="state" aria-label="input Text to Gust state" />
        </div>
        <div class="col-md-3">
          <label for="formGustDetailsCity" class="col-form-label">Fax</label>
          <input class="form-control" type="text" id="formGustDetailsCity" placeholder="city" aria-label="input Text to Gust city" />
        </div>
        <div class="col-md-3">
          <label for="formGustDetailsZip" class="col-form-label">Registration No
          </label>
          <input class="form-control" type="text" id="formGustDetailsZip" placeholder="Zip" aria-label="input Text to Gust Zip" />
        </div>
      </div>
    </div>

    <!-- other information -->

    <div class="accordion mt-3" id="accordionExample">
      <div class="card accordion-item active">
        <h2 class="accordion-header" id="headingOne">
          <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="false" aria-controls="accordionOne">
            Identity Information
          </button>
        </h2>

        <div id="accordionOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample01" style="">
          <div class="row accordion-body">
            <div class="col-12 mb-3">Identity Information</div>

            <div class="row p-3 mb-2">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone4" />
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
                      <label for="flatpickr-date-10" class="col-form-label">Expiry Date</label>
                      <input type="text" class="form-control" placeholder="YYYY-MM-D " id="flatpickr-date-04" ref="datePicker4" aria-label="input Text to Expiry Date" />
                      <i class="fa-solid fa-calendar-days icon-date top"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card accordion-item ">
        <h2 class="accordion-header" id="headingTwo">
          <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionTwo" aria-expanded="true" aria-controls="accordionTwo">
            Other Information
          </button>
        </h2>
        <div id="accordionTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExampleveveve" style="">
          <div class="row accordion-body">
            <!-- Personal Information part 1 -->
            <div class="col-12 mb-3">Personal Information</div>
            <div class="row mb-3">
              <div class="col-md-3">
                <label for="formGustPersonalInfoBirth " class="col-form-label">Birth Date</label>
                <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-05" ref="datePicker5" aria-label="input Text to Birth Date" />
                <i class="fa-solid fa-calendar-days icon-date top"></i>
              </div>
              <div class="col-md-3">
                <label for="BirthCity" class="col-form-label">Birth City</label>
                <input class="form-control" type="text" id="formGustIssuingCity" placeholder="City" aria-label="Enter Issuing City" />
              </div>
              <div class="col-md-3">
                <label for="BirthCountry" class="col-form-label">Birth Country</label>
                <select class="form-select" id="formGustBirthCountry" aria-label="select Birth Country">
                  <option value="" disabled selected>Select option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
            </div>
            <!-- Personal Information part 2 -->

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
            </div>
          </div>
        </div>
      </div>

    </div>
    <hr m-0 />
    <div class="row">
      <div class="col-3">
        <button type="button" class="btn btn-outline-primary waves-effect">
          Black List
        </button>
      </div>
      <div class="col-9 d-flex justify-content-end">
        <button type="button" class="btn btn-outline-primary waves-effect me-1">
          Pick Up / Drop off
        </button>
        <button type="button" class="btn btn-outline-primary waves-effect me-1">
          Add Signature
        </button>
        <div class="btn-group">
          <button type="button" class="btn btn-outline-secondary dropdown-toggle waves-effect me-1" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </button>
          <ul class="dropdown-menu" style="">
            <li>
              <a class="dropdown-item" href="javascript:void(0);">Print GR Card</a>
            </li>
          </ul>
        </div>
        <button type="button" class="btn btn-outline-primary waves-effect" disabled>
          Save
        </button>
      </div>
    </div>
  </form>



</template>

<script>
import DropzoneComponent from "../../layout/DropzoneComponent.vue";
import flatpickrMixin from "../../Mixin/flatpickrMixin";

export default {
  name: "DefaultContent",
  components: {
    DropzoneComponent
  },
  mixins: [flatpickrMixin],
  data ()
  {
    return {
      formData: {
        photo: null,
        name: '',
        email: '',
        phone: '',
        mobile: '',
        gender: '',
        guestType: '',
        vipStatus: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        nationality: '',
        company: '',
        fax: '',
        registrationNo: '',
        identity: {
          photo: null,
          idNumber: '',
          issuingCountry: '',
          idType: '',
          issuingCity: '',
          expiryDate: ''
        },
        otherInfo: {
          birthDate: '',
          birthCity: '',
          birthCountry: '',
          spouseBirthDate: '',
          weddingAnniversary: ''
        }
      },
      locationFields: [
        { id: 'country', label: 'Country', placeholder: 'Country' },
        { id: 'state', label: 'State', placeholder: 'State' },
        { id: 'city', label: 'City', placeholder: 'City' },
        { id: 'zip', label: 'Zip', placeholder: 'Zip' }
      ],
      additionalFields: [
        { id: 'nationality', label: 'Nationality', placeholder: 'Nationality' },
        { id: 'company', label: 'Company', placeholder: 'Company' },
        { id: 'fax', label: 'Fax', placeholder: 'Fax' },
        { id: 'registrationNo', label: 'Registration No', placeholder: 'Registration No' }
      ]
    };
  },

};
</script>
