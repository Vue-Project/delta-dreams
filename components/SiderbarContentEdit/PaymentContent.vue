<template>
    <div class="modal-body">
        <div class="row">
            <div class="col mb-3">
                <label for="flatpickr-date-01" class="form-label">Date</label>
                <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" aria-label="input Text to Check-in Date" v-model="formAddPayment.date" />
                <i class="fa-solid fa-calendar-days icon-date me-3"></i>
            </div>
            </div>
            <div class="row g-2">
            <div class="col-6 mb-2">
                <div class="input-group">
                <select class="form-select" id="inputGroupSelect02" v-model="formAddPayment.type">
                    <option selected="">Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <label class="input-group-text" for="inputGroupSelect02">Type</label>
                </div>
            </div>
            <div class="col-6 mb-2">
                <div class="input-group">
                <select class="form-select" id="inputGroupSelect02" v-model="formAddPayment.method">
                    <option selected="">Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <label class="input-group-text" for="inputGroupSelect02">Method</label>
                </div>
            </div>
            <div class="col-12">
                <div class="input-group">
                <span class="input-group-text">EGP</span>
                <input type="text" class="form-control" placeholder="Amount" aria-label="Amount (to the nearest dollar)" v-model="formAddPayment.amount">
                </div>
            </div>
            <div class="col-12 mt-2">
                <select class="form-select" id="count">
                    <option selected="">Count</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div class="col-12 mb-2 ">
                <div class="input-group">
                <span class="input-group-text">Comment</span>
                <textarea class="form-control" aria-label="With textarea" placeholder="Comment" v-model="formAddPayment.comment"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
  
  <script>
    import flatpickr from "../Mixin/flatpickrMixin";
    export default {
    name: "PaymentContent",
    mixins: [flatpickr],
    data(){
        return{
            formAddPayment: {
            date: '',
            method: '',
            type: '',
            comment: '',
            reservation_id: null
        },  
        }
    },
    methods:{
        submitPayment() {
      this.$emit('add-payment', {
        ...this.formAddPayment,
        reservation_id: this.selectedEvent.id
      });
      this.cancelPayment();
    },
    cancelPayment() {
      this.resetPaymentForm();
    },
    resetPaymentForm() {
      this.formAddPayment = {
        date: '',
        method: '',
        type: '',
        comment: '',
        reservation_id: null
      }
    },
    }
};
</script>
  