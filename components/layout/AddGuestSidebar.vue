<template>
  <div class="add-guest-sidebar">
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content" :style="{ height: height }">
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
                      <label for="formGustInfoName" class="col-form-label">Name
                      </label>

                      <input type="text" class="form-control rounded-2" id="formGustInfoName" placeholder="Name Guest" aria-label="input text to Gust Name" v-model="formGuest.name" ref="name" :class="{ 'input-error': validationMessages.name }" />
                      <span class="error-message small" v-if="$v.formGuest.name.$error">
                        Name is required
                      </span>
                    </div>

                    <div class="mb-lg-3">
                      <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                      <input class="form-control rounded-2" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" ref="idNumber" v-model="formGuest.idNumber" :class="{ 'input-error': validationMessages.idNumber }" />
                      <span class="error-message small" v-if="$v.formGuest.idNumber.$error">
                        ID Number is required
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-lg-3">
                      <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                      <input class="form-control rounded-2" type="text" value="Phone" id="formGustInfoPhone" placeholder="phone" aria-label="input tel to Gust Phone" v-model="formGuest.phone" ref="phone" :class="{ 'input-error': validationMessages.phone }" />
                      <span class="error-message small" v-if="$v.formGuest.phone.$error">
                        Phone is required
                      </span>
                    </div>
                    <div class="mb-lg-3">
                      <label for="formGustIdentityIdType" class="col-form-label">ID Type</label>
                      <select class="form-select rounded-2" id="formGustIdentityIdType" aria-label="select ID Type" ref="idType" v-model="formGuest.idType" :class="{ 'input-error': validationMessages.idType }">
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option v-for="(nationalType, index) in getNationalTypes" :key="index" :value="index">
                          {{ nationalType }}
                        </option>
                      </select>
                      <span class="error-message small" v-if="$v.formGuest.idType.$error">
                        ID Type is required
                      </span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-lg-3">
                      <label for="formGustInformInternationalNumber" class="col-form-label internationalNumber">International Phone</label>
                      <input class="form-control rounded-2" type="text" value="International Number" placeholder="International Phone" id="formGustInformInternationalNumber" aria-label="input tel to Gust International Number" v-model="formGuest.internationalNumber" />
                    </div>
                    <div class="mb-lg-3 position-relative">
                      <label for="flatpickr-date-04" class="col-form-label">Expiry Date</label>
                      <input type="text" class="form-control rounded-2" placeholder="YYYY-MM-D " id="flatpickr-date-09" ref="datePicker9" aria-label="input Text to Expiry Date" v-model="formGuest.expiryDate" :class="{ 'input-error': validationMessages.expiryDate }" />
                      <span class="error-message small" v-if="$v.formGuest.expiryDate.$error">
                        Expiry Date is required
                      </span>
                      <i class="fa-solid fa-calendar-days icon-date top"></i>
                    </div>

                  </div>
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

                <div id="accordionOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample" style="">
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
                            <label for="formGustInfoEmail" class="col-form-label">Email
                      </label>
                      <input type="email" class="form-control rounded-2" id="formGustInfoEmail" placeholder="email" aria-label="input email to Gust Email" v-model="formGuest.email"  />

                          </div>
                          <div class="col-md-6">
                            <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                            <input class="form-control rounded-2" type="text" value="Mobile" placeholder="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" v-model="formGuest.mobile" />

                          </div>

                        </div>
                      </div>

                      <!-- <div class="col-md-6 pe-0">
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

                      <div data-v-a3b6683a="" class="row pe-0">
                        <div data-v-a3b6683a="" class="col-md-3 pe-0"><label data-v-a3b6683a="" for="formGustInfoAddress" class="col-form-label">Address</label> <input data-v-a3b6683a="" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" class="form-control rounded-2"></div>
                        <div data-v-a3b6683a="" class="col-md-3 pe-0"><label data-v-a3b6683a="" for="countryGuest" class="col-form-label">Country</label> <select data-v-a3b6683a="" id="countryGuest" class="form-select">
                            <option data-v-a3b6683a="" disabled="disabled" value="">Select Country</option>
                            <option data-v-a3b6683a="" value="AF">
                              Afghanistan
                            </option>
                            <option data-v-a3b6683a="" value="AX">
                              Åland Islands
                            </option>
                            <option data-v-a3b6683a="" value="AL">
                              Albania
                            </option>
                            <option data-v-a3b6683a="" value="DZ">
                              Algeria
                            </option>
                            <option data-v-a3b6683a="" value="AS">
                              American Samoa
                            </option>
                            <option data-v-a3b6683a="" value="AD">
                              Andorra
                            </option>
                            <option data-v-a3b6683a="" value="AO">
                              Angola
                            </option>
                            <option data-v-a3b6683a="" value="AI">
                              Anguilla
                            </option>
                            <option data-v-a3b6683a="" value="AQ">
                              Antarctica
                            </option>
                            <option data-v-a3b6683a="" value="AG">
                              Antigua and Barbuda
                            </option>
                            <option data-v-a3b6683a="" value="AR">
                              Argentina
                            </option>
                            <option data-v-a3b6683a="" value="AM">
                              Armenia
                            </option>
                            <option data-v-a3b6683a="" value="AW">
                              Aruba
                            </option>
                            <option data-v-a3b6683a="" value="AU">
                              Australia
                            </option>
                            <option data-v-a3b6683a="" value="AT">
                              Austria
                            </option>
                            <option data-v-a3b6683a="" value="AZ">
                              Azerbaijan
                            </option>
                            <option data-v-a3b6683a="" value="BS">
                              Bahamas
                            </option>
                            <option data-v-a3b6683a="" value="BH">
                              Bahrain
                            </option>
                            <option data-v-a3b6683a="" value="BD">
                              Bangladesh
                            </option>
                            <option data-v-a3b6683a="" value="BB">
                              Barbados
                            </option>
                            <option data-v-a3b6683a="" value="BY">
                              Belarus
                            </option>
                            <option data-v-a3b6683a="" value="BE">
                              Belgium
                            </option>
                            <option data-v-a3b6683a="" value="BZ">
                              Belize
                            </option>
                            <option data-v-a3b6683a="" value="BJ">
                              Benin
                            </option>
                            <option data-v-a3b6683a="" value="BM">
                              Bermuda
                            </option>
                            <option data-v-a3b6683a="" value="BT">
                              Bhutan
                            </option>
                            <option data-v-a3b6683a="" value="BO">
                              Bolivia
                            </option>
                            <option data-v-a3b6683a="" value="BA">
                              Bosnia and Herzegovina
                            </option>
                            <option data-v-a3b6683a="" value="BW">
                              Botswana
                            </option>
                            <option data-v-a3b6683a="" value="BV">
                              Bouvet Island
                            </option>
                            <option data-v-a3b6683a="" value="BR">
                              Brazil
                            </option>
                            <option data-v-a3b6683a="" value="IO">
                              British Indian Ocean Territory
                            </option>
                            <option data-v-a3b6683a="" value="BN">
                              Brunei Darussalam
                            </option>
                            <option data-v-a3b6683a="" value="BG">
                              Bulgaria
                            </option>
                            <option data-v-a3b6683a="" value="BF">
                              Burkina Faso
                            </option>
                            <option data-v-a3b6683a="" value="BI">
                              Burundi
                            </option>
                            <option data-v-a3b6683a="" value="KH">
                              Cambodia
                            </option>
                            <option data-v-a3b6683a="" value="CM">
                              Cameroon
                            </option>
                            <option data-v-a3b6683a="" value="CA">
                              Canada
                            </option>
                            <option data-v-a3b6683a="" value="CV">
                              Cape Verde
                            </option>
                            <option data-v-a3b6683a="" value="KY">
                              Cayman Islands
                            </option>
                            <option data-v-a3b6683a="" value="CF">
                              Central African Republic
                            </option>
                            <option data-v-a3b6683a="" value="TD">
                              Chad
                            </option>
                            <option data-v-a3b6683a="" value="CL">
                              Chile
                            </option>
                            <option data-v-a3b6683a="" value="CN">
                              China
                            </option>
                            <option data-v-a3b6683a="" value="CX">
                              Christmas Island
                            </option>
                            <option data-v-a3b6683a="" value="CC">
                              Cocos (Keeling) Islands
                            </option>
                            <option data-v-a3b6683a="" value="CO">
                              Colombia
                            </option>
                            <option data-v-a3b6683a="" value="KM">
                              Comoros
                            </option>
                            <option data-v-a3b6683a="" value="CG">
                              Congo
                            </option>
                            <option data-v-a3b6683a="" value="CD">
                              Congo, The Democratic Republic of The
                            </option>
                            <option data-v-a3b6683a="" value="CK">
                              Cook Islands
                            </option>
                            <option data-v-a3b6683a="" value="CR">
                              Costa Rica
                            </option>
                            <option data-v-a3b6683a="" value="CI">
                              Cote D'ivoire
                            </option>
                            <option data-v-a3b6683a="" value="HR">
                              Croatia
                            </option>
                            <option data-v-a3b6683a="" value="CU">
                              Cuba
                            </option>
                            <option data-v-a3b6683a="" value="CY">
                              Cyprus
                            </option>
                            <option data-v-a3b6683a="" value="CZ">
                              Czech Republic
                            </option>
                            <option data-v-a3b6683a="" value="DK">
                              Denmark
                            </option>
                            <option data-v-a3b6683a="" value="DJ">
                              Djibouti
                            </option>
                            <option data-v-a3b6683a="" value="DM">
                              Dominica
                            </option>
                            <option data-v-a3b6683a="" value="DO">
                              Dominican Republic
                            </option>
                            <option data-v-a3b6683a="" value="EC">
                              Ecuador
                            </option>
                            <option data-v-a3b6683a="" value="EG">
                              Egypt
                            </option>
                            <option data-v-a3b6683a="" value="SV">
                              El Salvador
                            </option>
                            <option data-v-a3b6683a="" value="GQ">
                              Equatorial Guinea
                            </option>
                            <option data-v-a3b6683a="" value="ER">
                              Eritrea
                            </option>
                            <option data-v-a3b6683a="" value="EE">
                              Estonia
                            </option>
                            <option data-v-a3b6683a="" value="ET">
                              Ethiopia
                            </option>
                            <option data-v-a3b6683a="" value="FK">
                              Falkland Islands (Malvinas)
                            </option>
                            <option data-v-a3b6683a="" value="FO">
                              Faroe Islands
                            </option>
                            <option data-v-a3b6683a="" value="FJ">
                              Fiji
                            </option>
                            <option data-v-a3b6683a="" value="FI">
                              Finland
                            </option>
                            <option data-v-a3b6683a="" value="FR">
                              France
                            </option>
                            <option data-v-a3b6683a="" value="GF">
                              French Guiana
                            </option>
                            <option data-v-a3b6683a="" value="PF">
                              French Polynesia
                            </option>
                            <option data-v-a3b6683a="" value="TF">
                              French Southern Territories
                            </option>
                            <option data-v-a3b6683a="" value="GA">
                              Gabon
                            </option>
                            <option data-v-a3b6683a="" value="GM">
                              Gambia
                            </option>
                            <option data-v-a3b6683a="" value="GE">
                              Georgia
                            </option>
                            <option data-v-a3b6683a="" value="DE">
                              Germany
                            </option>
                            <option data-v-a3b6683a="" value="GH">
                              Ghana
                            </option>
                            <option data-v-a3b6683a="" value="GI">
                              Gibraltar
                            </option>
                            <option data-v-a3b6683a="" value="GR">
                              Greece
                            </option>
                            <option data-v-a3b6683a="" value="GL">
                              Greenland
                            </option>
                            <option data-v-a3b6683a="" value="GD">
                              Grenada
                            </option>
                            <option data-v-a3b6683a="" value="GP">
                              Guadeloupe
                            </option>
                            <option data-v-a3b6683a="" value="GU">
                              Guam
                            </option>
                            <option data-v-a3b6683a="" value="GT">
                              Guatemala
                            </option>
                            <option data-v-a3b6683a="" value="GG">
                              Guernsey
                            </option>
                            <option data-v-a3b6683a="" value="GN">
                              Guinea
                            </option>
                            <option data-v-a3b6683a="" value="GW">
                              Guinea-bissau
                            </option>
                            <option data-v-a3b6683a="" value="GY">
                              Guyana
                            </option>
                            <option data-v-a3b6683a="" value="HT">
                              Haiti
                            </option>
                            <option data-v-a3b6683a="" value="HM">
                              Heard Island and Mcdonald Islands
                            </option>
                            <option data-v-a3b6683a="" value="VA">
                              Holy See (Vatican City State)
                            </option>
                            <option data-v-a3b6683a="" value="HN">
                              Honduras
                            </option>
                            <option data-v-a3b6683a="" value="HK">
                              Hong Kong
                            </option>
                            <option data-v-a3b6683a="" value="HU">
                              Hungary
                            </option>
                            <option data-v-a3b6683a="" value="IS">
                              Iceland
                            </option>
                            <option data-v-a3b6683a="" value="IN">
                              India
                            </option>
                            <option data-v-a3b6683a="" value="ID">
                              Indonesia
                            </option>
                            <option data-v-a3b6683a="" value="IR">
                              Iran, Islamic Republic of
                            </option>
                            <option data-v-a3b6683a="" value="IQ">
                              Iraq
                            </option>
                            <option data-v-a3b6683a="" value="IE">
                              Ireland
                            </option>
                            <option data-v-a3b6683a="" value="IM">
                              Isle of Man
                            </option>
                            <option data-v-a3b6683a="" value="IL">
                              Israel
                            </option>
                            <option data-v-a3b6683a="" value="IT">
                              Italy
                            </option>
                            <option data-v-a3b6683a="" value="JM">
                              Jamaica
                            </option>
                            <option data-v-a3b6683a="" value="JP">
                              Japan
                            </option>
                            <option data-v-a3b6683a="" value="JE">
                              Jersey
                            </option>
                            <option data-v-a3b6683a="" value="JO">
                              Jordan
                            </option>
                            <option data-v-a3b6683a="" value="KZ">
                              Kazakhstan
                            </option>
                            <option data-v-a3b6683a="" value="KE">
                              Kenya
                            </option>
                            <option data-v-a3b6683a="" value="KI">
                              Kiribati
                            </option>
                            <option data-v-a3b6683a="" value="KP">
                              Korea, Democratic People's Republic of
                            </option>
                            <option data-v-a3b6683a="" value="KR">
                              Korea, Republic of
                            </option>
                            <option data-v-a3b6683a="" value="KW">
                              Kuwait
                            </option>
                            <option data-v-a3b6683a="" value="KG">
                              Kyrgyzstan
                            </option>
                            <option data-v-a3b6683a="" value="LA">
                              Lao People's Democratic Republic
                            </option>
                            <option data-v-a3b6683a="" value="LV">
                              Latvia
                            </option>
                            <option data-v-a3b6683a="" value="LB">
                              Lebanon
                            </option>
                            <option data-v-a3b6683a="" value="LS">
                              Lesotho
                            </option>
                            <option data-v-a3b6683a="" value="LR">
                              Liberia
                            </option>
                            <option data-v-a3b6683a="" value="LY">
                              Libyan Arab Jamahiriya
                            </option>
                            <option data-v-a3b6683a="" value="LI">
                              Liechtenstein
                            </option>
                            <option data-v-a3b6683a="" value="LT">
                              Lithuania
                            </option>
                            <option data-v-a3b6683a="" value="LU">
                              Luxembourg
                            </option>
                            <option data-v-a3b6683a="" value="MO">
                              Macao
                            </option>
                            <option data-v-a3b6683a="" value="MK">
                              Macedonia, The Former Yugoslav Republic of
                            </option>
                            <option data-v-a3b6683a="" value="MG">
                              Madagascar
                            </option>
                            <option data-v-a3b6683a="" value="MW">
                              Malawi
                            </option>
                            <option data-v-a3b6683a="" value="MY">
                              Malaysia
                            </option>
                            <option data-v-a3b6683a="" value="MV">
                              Maldives
                            </option>
                            <option data-v-a3b6683a="" value="ML">
                              Mali
                            </option>
                            <option data-v-a3b6683a="" value="MT">
                              Malta
                            </option>
                            <option data-v-a3b6683a="" value="MH">
                              Marshall Islands
                            </option>
                            <option data-v-a3b6683a="" value="MQ">
                              Martinique
                            </option>
                            <option data-v-a3b6683a="" value="MR">
                              Mauritania
                            </option>
                            <option data-v-a3b6683a="" value="MU">
                              Mauritius
                            </option>
                            <option data-v-a3b6683a="" value="YT">
                              Mayotte
                            </option>
                            <option data-v-a3b6683a="" value="MX">
                              Mexico
                            </option>
                            <option data-v-a3b6683a="" value="FM">
                              Micronesia, Federated States of
                            </option>
                            <option data-v-a3b6683a="" value="MD">
                              Moldova, Republic of
                            </option>
                            <option data-v-a3b6683a="" value="MC">
                              Monaco
                            </option>
                            <option data-v-a3b6683a="" value="MN">
                              Mongolia
                            </option>
                            <option data-v-a3b6683a="" value="ME">
                              Montenegro
                            </option>
                            <option data-v-a3b6683a="" value="MS">
                              Montserrat
                            </option>
                            <option data-v-a3b6683a="" value="MA">
                              Morocco
                            </option>
                            <option data-v-a3b6683a="" value="MZ">
                              Mozambique
                            </option>
                            <option data-v-a3b6683a="" value="MM">
                              Myanmar
                            </option>
                            <option data-v-a3b6683a="" value="NA">
                              Namibia
                            </option>
                            <option data-v-a3b6683a="" value="NR">
                              Nauru
                            </option>
                            <option data-v-a3b6683a="" value="NP">
                              Nepal
                            </option>
                            <option data-v-a3b6683a="" value="NL">
                              Netherlands
                            </option>
                            <option data-v-a3b6683a="" value="AN">
                              Netherlands Antilles
                            </option>
                            <option data-v-a3b6683a="" value="NC">
                              New Caledonia
                            </option>
                            <option data-v-a3b6683a="" value="NZ">
                              New Zealand
                            </option>
                            <option data-v-a3b6683a="" value="NI">
                              Nicaragua
                            </option>
                            <option data-v-a3b6683a="" value="NE">
                              Niger
                            </option>
                            <option data-v-a3b6683a="" value="NG">
                              Nigeria
                            </option>
                            <option data-v-a3b6683a="" value="NU">
                              Niue
                            </option>
                            <option data-v-a3b6683a="" value="NF">
                              Norfolk Island
                            </option>
                            <option data-v-a3b6683a="" value="MP">
                              Northern Mariana Islands
                            </option>
                            <option data-v-a3b6683a="" value="NO">
                              Norway
                            </option>
                            <option data-v-a3b6683a="" value="OM">
                              Oman
                            </option>
                            <option data-v-a3b6683a="" value="PK">
                              Pakistan
                            </option>
                            <option data-v-a3b6683a="" value="PW">
                              Palau
                            </option>
                            <option data-v-a3b6683a="" value="PS">
                              Palestinian Territory, Occupied
                            </option>
                            <option data-v-a3b6683a="" value="PA">
                              Panama
                            </option>
                            <option data-v-a3b6683a="" value="PG">
                              Papua New Guinea
                            </option>
                            <option data-v-a3b6683a="" value="PY">
                              Paraguay
                            </option>
                            <option data-v-a3b6683a="" value="PE">
                              Peru
                            </option>
                            <option data-v-a3b6683a="" value="PH">
                              Philippines
                            </option>
                            <option data-v-a3b6683a="" value="PN">
                              Pitcairn
                            </option>
                            <option data-v-a3b6683a="" value="PL">
                              Poland
                            </option>
                            <option data-v-a3b6683a="" value="PT">
                              Portugal
                            </option>
                            <option data-v-a3b6683a="" value="PR">
                              Puerto Rico
                            </option>
                            <option data-v-a3b6683a="" value="QA">
                              Qatar
                            </option>
                            <option data-v-a3b6683a="" value="RE">
                              Reunion
                            </option>
                            <option data-v-a3b6683a="" value="RO">
                              Romania
                            </option>
                            <option data-v-a3b6683a="" value="RU">
                              Russian Federation
                            </option>
                            <option data-v-a3b6683a="" value="RW">
                              Rwanda
                            </option>
                            <option data-v-a3b6683a="" value="SH">
                              Saint Helena
                            </option>
                            <option data-v-a3b6683a="" value="KN">
                              Saint Kitts and Nevis
                            </option>
                            <option data-v-a3b6683a="" value="LC">
                              Saint Lucia
                            </option>
                            <option data-v-a3b6683a="" value="PM">
                              Saint Pierre and Miquelon
                            </option>
                            <option data-v-a3b6683a="" value="VC">
                              Saint Vincent and The Grenadines
                            </option>
                            <option data-v-a3b6683a="" value="WS">
                              Samoa
                            </option>
                            <option data-v-a3b6683a="" value="SM">
                              San Marino
                            </option>
                            <option data-v-a3b6683a="" value="ST">
                              Sao Tome and Principe
                            </option>
                            <option data-v-a3b6683a="" value="SA">
                              Saudi Arabia
                            </option>
                            <option data-v-a3b6683a="" value="SN">
                              Senegal
                            </option>
                            <option data-v-a3b6683a="" value="RS">
                              Serbia
                            </option>
                            <option data-v-a3b6683a="" value="SC">
                              Seychelles
                            </option>
                            <option data-v-a3b6683a="" value="SL">
                              Sierra Leone
                            </option>
                            <option data-v-a3b6683a="" value="SG">
                              Singapore
                            </option>
                            <option data-v-a3b6683a="" value="SK">
                              Slovakia
                            </option>
                            <option data-v-a3b6683a="" value="SI">
                              Slovenia
                            </option>
                            <option data-v-a3b6683a="" value="SB">
                              Solomon Islands
                            </option>
                            <option data-v-a3b6683a="" value="SO">
                              Somalia
                            </option>
                            <option data-v-a3b6683a="" value="ZA">
                              South Africa
                            </option>
                            <option data-v-a3b6683a="" value="GS">
                              South Georgia and The South Sandwich Islands
                            </option>
                            <option data-v-a3b6683a="" value="ES">
                              Spain
                            </option>
                            <option data-v-a3b6683a="" value="LK">
                              Sri Lanka
                            </option>
                            <option data-v-a3b6683a="" value="SD">
                              Sudan
                            </option>
                            <option data-v-a3b6683a="" value="SR">
                              Suriname
                            </option>
                            <option data-v-a3b6683a="" value="SJ">
                              Svalbard and Jan Mayen
                            </option>
                            <option data-v-a3b6683a="" value="SZ">
                              Swaziland
                            </option>
                            <option data-v-a3b6683a="" value="SE">
                              Sweden
                            </option>
                            <option data-v-a3b6683a="" value="CH">
                              Switzerland
                            </option>
                            <option data-v-a3b6683a="" value="SY">
                              Syrian Arab Republic
                            </option>
                            <option data-v-a3b6683a="" value="TW">
                              Taiwan, Province of China
                            </option>
                            <option data-v-a3b6683a="" value="TJ">
                              Tajikistan
                            </option>
                            <option data-v-a3b6683a="" value="TZ">
                              Tanzania, United Republic of
                            </option>
                            <option data-v-a3b6683a="" value="TH">
                              Thailand
                            </option>
                            <option data-v-a3b6683a="" value="TL">
                              Timor-leste
                            </option>
                            <option data-v-a3b6683a="" value="TG">
                              Togo
                            </option>
                            <option data-v-a3b6683a="" value="TK">
                              Tokelau
                            </option>
                            <option data-v-a3b6683a="" value="TO">
                              Tonga
                            </option>
                            <option data-v-a3b6683a="" value="TT">
                              Trinidad and Tobago
                            </option>
                            <option data-v-a3b6683a="" value="TN">
                              Tunisia
                            </option>
                            <option data-v-a3b6683a="" value="TR">
                              Turkey
                            </option>
                            <option data-v-a3b6683a="" value="TM">
                              Turkmenistan
                            </option>
                            <option data-v-a3b6683a="" value="TC">
                              Turks and Caicos Islands
                            </option>
                            <option data-v-a3b6683a="" value="TV">
                              Tuvalu
                            </option>
                            <option data-v-a3b6683a="" value="UG">
                              Uganda
                            </option>
                            <option data-v-a3b6683a="" value="UA">
                              Ukraine
                            </option>
                            <option data-v-a3b6683a="" value="AE">
                              United Arab Emirates
                            </option>
                            <option data-v-a3b6683a="" value="GB">
                              United Kingdom
                            </option>
                            <option data-v-a3b6683a="" value="US">
                              United States
                            </option>
                            <option data-v-a3b6683a="" value="UM">
                              United States Minor Outlying Islands
                            </option>
                            <option data-v-a3b6683a="" value="UY">
                              Uruguay
                            </option>
                            <option data-v-a3b6683a="" value="UZ">
                              Uzbekistan
                            </option>
                            <option data-v-a3b6683a="" value="VU">
                              Vanuatu
                            </option>
                            <option data-v-a3b6683a="" value="VE">
                              Venezuela
                            </option>
                            <option data-v-a3b6683a="" value="VN">
                              Viet Nam
                            </option>
                            <option data-v-a3b6683a="" value="VG">
                              Virgin Islands, British
                            </option>
                            <option data-v-a3b6683a="" value="VI">
                              Virgin Islands, U.S.
                            </option>
                            <option data-v-a3b6683a="" value="WF">
                              Wallis and Futuna
                            </option>
                            <option data-v-a3b6683a="" value="EH">
                              Western Sahara
                            </option>
                            <option data-v-a3b6683a="" value="YE">
                              Yemen
                            </option>
                            <option data-v-a3b6683a="" value="ZM">
                              Zambia
                            </option>
                            <option data-v-a3b6683a="" value="ZW">
                              Zimbabwe
                            </option>
                          </select></div>
                        <div data-v-a3b6683a="" class="col-md-3 pe-0"><label data-v-a3b6683a="" for="formGustInfoState" class="col-form-label">State</label> <input data-v-a3b6683a="" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" class="form-control rounded-2"></div>
                        <div data-v-a3b6683a="" class="col-md-3 pe-0"><label data-v-a3b6683a="" for="formGustInfoCity" class="col-form-label">City</label> <input data-v-a3b6683a="" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" class="form-control rounded-2"></div>
                      </div>
                    </div>
                    <div class="col-12 mb-lg-3">Personal Information</div>
                    <div class="row mb-lg-3 pe-0">

                      <div class="col-md-3">
                        <label for="flatpickr-date-07" class="col-form-label">Birth Date</label>
                        <input type="text" class="form-control rounded-2 flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Birth Date" v-model="formGuest.birthDate" />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>

                      </div>
                      <div class="col-md-3">
                        <label for="NationalityGuest" class="col-form-label">Nationality</label>
                        <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.nationality
      ">

                          <option value="" disabled selected>
                            Select
                          </option>
                          <option v-for="(country, index) in getCountries" :key="index" :value="index">
                            {{ country }}
                          </option>


                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="VIPGuest" class="col-form-label">VIP Status</label>
                        <select class="form-select rounded-2" id="formGustVIP" aria-label="select VIP" v-model="formGuest.vipStatus
      ">
                          <option value="" disabled selected>
                            Select
                          </option>
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'


export default {
  name: "AddGuestSidebar",
  layout: "component",
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
  data ()
  {
    return {
      formGuest: {
        profileImage: null,
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
        identityImage: null,
        idNumber: "",
        idType: "",
        expiryDate: "",

        birthDate: "",
        birthCountry: "",
        nationality: "",
        vipStatus: "",



      },
      validationMessages: {
        name: "",
        phone: "",
        gender: "",
        idNumber: "",
        idType: "",
        expiryDate: "",
      },
      uploadedFileData: null,
    };

  },
  validations: {
    formGuest: {
      name: { required },
      phone: { required },
      idNumber: { required },
      idType: { required },
      expiryDate: { required },


    }
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
        idNumber: "",
        idType: "",
        expiryDate: "",
      };

      // Remove error classes
      ["name", "gender", "phone", "idNumber", "idType", "expiryDate"].forEach((field) =>
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
        profileImage: null,
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
        identityImage: null,
        idNumber: "",
        idType: "",
        expiryDate: "",

        birthDate: "",
        birthCountry: "",
        nationality: "",
        vipStatus: "",



      }
      this.resetValidationMessages();
    },

    handleDropzoneError (error)
    {
      // Handle the error appropriately
      this.handleSubmissionError(error, "Error uploading image");
    },

    async submitFormGuest ()
    {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return
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
          national_expiry_date: this.formGuest.expiryDate,
          national_type: this.formGuest.idType,
        };

        // Append all text data to FormData
        Object.keys(addGuestData).forEach(key =>
        {
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


        await showSuccessAlert("Guest added successfully!");

        // Emit the new guest data to parent
        this.$emit("guest-added", response.data.data);

        // Reset form and close sidebar
        this.resetForm();
        this.$emit('close-sidebar');

      } catch (error) {
        handleSubmissionError(error, "Please fill in all required fields");
      } finally {
        this.isSubmitting = false;
      }
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
  mixins: [flatpickrMixin, validationMixin],
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

<style scoped></style>
