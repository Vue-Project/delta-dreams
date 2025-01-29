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
                    <DropzoneComponent :id="'my-dropzone'" />
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
                    <option value="" disabled selected>Select Gender</option>
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
            <div class="accordion mt-3 mb-5" id="accordionExample">
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
                                  Select
                                </option>

                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">Åland Islands</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-bissau">Guinea-bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                <option value="Korea, Republic of">Korea, Republic of</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macao">Macao</option>
                                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russian Federation">Russian Federation</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Helena">Saint Helena</option>
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Timor-leste">Timor-leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Viet Nam">Viet Nam</option>
                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                <option value="Wallis and Futuna">Wallis and Futuna</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
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
                                  Select
                                </option>
                                <option value="option1">بطاقه الرقم القومي</option>
                                <option value="option2">Driving License رخصه قياده</option>
                                <option value="option3">Passport جواز سفر</option>
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
                          <option value="0">Cash نقدي</option>
                          <option value="1">Credit Card فيزا</option>
                          <option value="2">تحويل بنكي</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="DirectBilling" class="col-form-label">Direct Billing A/C</label>
                        <select class="form-select" id="formGustDirectBilling" aria-label="select Direct Billing A/C Type" v-model="formGuest.OtherInformation.paymentMethod
                          .directBilling
                          ">
                          <option value="" disabled selected>
                            Select
                          </option>


                          <option value="0"> عبد الله سامى
                          </option>
                          <option value="1">samh ali</option>
                          <option value="2"> MOHAMED</option>
                          <option value="3">MOHAMED ABDOUMAHMOUD</option>
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
                            Select
                          </option>

                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Åland Islands">Åland Islands</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antarctica">Antarctica</option>
                          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                          <option value="Brunei Darussalam">Brunei Darussalam</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">Central African Republic</option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">Christmas Island</option>
                          <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote D'ivoire">Cote D'ivoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">Dominican Republic</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">Equatorial Guinea</option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">French Polynesia</option>
                          <option value="French Southern Territories">French Southern Territories</option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guernsey">Guernsey</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-bissau">Guinea-bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                          <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Isle of Man">Isle of Man</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jersey">Jersey</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                          <option value="Korea, Republic of">Korea, Republic of</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macao">Macao</option>
                          <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">Marshall Islands</option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                          <option value="Moldova, Republic of">Moldova, Republic of</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Netherlands Antilles">Netherlands Antilles</option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">Papua New Guinea</option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russian Federation">Russian Federation</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Helena">Saint Helena</option>
                          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                          <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">Solomon Islands</option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-leste">Timor-leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Viet Nam">Viet Nam</option>
                          <option value="Virgin Islands, British">Virgin Islands, British</option>
                          <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                          <option value="Wallis and Futuna">Wallis and Futuna</option>
                          <option value="Western Sahara">Western Sahara</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="NationalityGuest" class="col-form-label">Nationality</label>
                        <select class="form-select" id="formGustNationality" aria-label="select Nationality" v-model="formGuest.OtherInformation.paymentMethod.nationality
                          ">

                          <option value="" disabled selected>
                            Select
                          </option>

                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Åland Islands">Åland Islands</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antarctica">Antarctica</option>
                          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                          <option value="Brunei Darussalam">Brunei Darussalam</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">Central African Republic</option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">Christmas Island</option>
                          <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote D'ivoire">Cote D'ivoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">Dominican Republic</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">Equatorial Guinea</option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">French Polynesia</option>
                          <option value="French Southern Territories">French Southern Territories</option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guernsey">Guernsey</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-bissau">Guinea-bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                          <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Isle of Man">Isle of Man</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jersey">Jersey</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                          <option value="Korea, Republic of">Korea, Republic of</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macao">Macao</option>
                          <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">Marshall Islands</option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                          <option value="Moldova, Republic of">Moldova, Republic of</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Netherlands Antilles">Netherlands Antilles</option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">Papua New Guinea</option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russian Federation">Russian Federation</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Helena">Saint Helena</option>
                          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                          <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">Solomon Islands</option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-leste">Timor-leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Viet Nam">Viet Nam</option>
                          <option value="Virgin Islands, British">Virgin Islands, British</option>
                          <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                          <option value="Wallis and Futuna">Wallis and Futuna</option>
                          <option value="Western Sahara">Western Sahara</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="VIPGuest" class="col-form-label">VIP Status</label>
                        <select class="form-select" id="formGustVIP" aria-label="select VIP" v-model="formGuest.OtherInformation.paymentMethod.vipStatus
                          ">
                          <option value="" disabled selected>
                            Select
                          </option>

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
import { addGuest } from "../../Api/userApi";

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
        OtherInformation: {
          image: null,
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
      uploadEndpoint: "", // Replace with your server's upload endpoint
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

    async submitFormGuest ()
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
        const addGuestData = {
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
          zip: this.formGuest.zip,
          OtherInformation: {
            image: this.formGuest.OtherInformation.image,
            idNumber: this.formGuest.OtherInformation.idNumber,
            idType: this.formGuest.OtherInformation.idType,
            issuingCountry: this.formGuest.OtherInformation.issuingCountry,
            issuingCity: this.formGuest.OtherInformation.issuingCity,
            expiryDate: this.formGuest.OtherInformation.expiryDate,
            paymentMethod: {
              paymentMethod: this.formGuest.OtherInformation.paymentMethod.paymentMethod,
              directBilling: this.formGuest.OtherInformation.paymentMethod.directBilling,
              birthDate: this.formGuest.OtherInformation.paymentMethod.birthDate,
              birthCountry: this.formGuest.OtherInformation.paymentMethod.birthCountry,
              nationality: this.formGuest.OtherInformation.paymentMethod.nationality,
              vipStatus: this.formGuest.OtherInformation.paymentMethod.vipStatus,
              spouseBirthDate: this.formGuest.OtherInformation.paymentMethod.spouseBirthDate,
              weddingAnniversary: this.formGuest.OtherInformation.paymentMethod.weddingAnniversary,
              registrationNo: this.formGuest.OtherInformation.paymentMethod.registrationNo,
            },

          },
        };
        // console.log(addGuestData);


        // Make API call
        const response = await addGuest(addGuestData);

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
        this.initFlatpickers();
      }
    },
  },
};
</script>

<style scoped></style>
