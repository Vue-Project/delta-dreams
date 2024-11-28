<template>
  <div>
    <div v-if="isSidebarOpen" :class="['sidebar', { 'sidebar-open': isSidebarOpen }]" :style="{ width: width }">
      <div class="sidebar-content">
        <h3>{{ title }}</h3>
        <hr class="my-2">
        <slot>
          <form id="formGustInfo" >
            <div class="row p-3 mb-5">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent />
                  </div>
                  <div class="col-md-8">
                    <div class="mb-3">

                      <label for="formGustInfoName" class=" col-form-label"> Name</label>
                      <div class="input-group">
                        <select class="form-select" id="formGustInfoName" >
                          <option value="" disabled selected>Select option</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>


                        <input type="text" class="form-control" aria-label="Text input with select list"
                          id="formGustInfoName" />


                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="formGustInfoEmail" class="form-label">Email </label>
                      <input type="email" class="form-control" id="formGustInfoEmail"
                        placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email">
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3 ">
                      <label for="formGustInfoPhone" class=" col-form-label">Phone</label>
                        <input class="form-control" type="tel" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3 ">
                      <label for="formGustInfoMobile" class=" col-form-label">Mobile</label>
                        <input class="form-control" type="tel" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile">

                    </div>

                  </div>


                </div>
                <div class="mb-0">
                  <label class="d-block form-label mb-3">Gender</label>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-check mb-2">
                        <input type="radio" id="formGustInfoMale" name="formGustInfoGender"
                          class="form-check-input"  aria-label="input radio to Gust Gender Male" >
                        <label class="form-check-label" for="formGustInfoMale">Male</label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-check">
                        <input type="radio" id="formGustInfoFemale" name="formGustInfoGender"
                          class="form-check-input"  aria-label="input radio to Gust Gender Female">
                        <label class="form-check-label" for="formGustInfoFemale">Female</label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-check">
                        <input type="radio" id="formGustInfoOther" name="formGustInfoGender"
                          class="form-check-input"   aria-label="input radio to Gust Gender Other">
                        <label class="form-check-label" for="formGustInfoOther">Other</label>
                      </div>
                    </div>
                  </div>



                </div>


              </div>
              <div class="col-md-7">
              <label for="formGustInfoAddress" class="col-form-label">Address</label>
              <input class="form-control" type="text" id="formGustInfoAddress" placeholder="Address"  aria-label="input Text to Gust Address" />
            </div>
            <div class="row">
              <div class="col-md-3">
                <label for="countryGuest" class="col-form-label">Country</label>
                <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" />
              </div>
              <div class="col-md-3">
                <label for="formGustInfoState" class="col-form-label">State</label>
                <input class="form-control" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" />
              </div>
              <div class="col-md-3">
                <label for="formGustInfoCity" class="col-form-label">City</label>
                <input class="form-control" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" />
              </div>
              <div class="col-md-3">
                <label for="formGustInfoZip" class="col-form-label">Zip</label>
                <input class="form-control" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" />
              </div>
            </div>
            </div>



            <div class="accordion mt-3" id="accordionExample">
              <div class="card accordion-item active">
                <h2 class="accordion-header" id="headingOne">
                  <button type="button" class="accordion-button" data-bs-toggle="collapse"
                    data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">
                    Other Information </button>
                </h2>

                <div id="accordionOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample"
                  style="">
                  <div class="accordion-body">


                  </div>
                </div>
              </div>

            </div>
            <button @click="$emit('close-sidebar')" class="btn btn-danger">Close</button>
          </form>


        </slot>

      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isSidebarOpen" class="overlay" @click="$emit('close-sidebar')"></div>
  </div>
</template>

<script>
import DropZone from "dropzone";
import "dropzone/dist/dropzone.css";
import DropzoneComponent from "./DropzoneComponent.vue";
export default {
  name: 'Sidebar',
  layout: "component",
  components: {
    DropzoneComponent
  },

  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: ' Add Guest',
    },
    width: {
      type: String,
      default: '1000px',
    },
  },

}
</script>

<style scoped>

</style>
