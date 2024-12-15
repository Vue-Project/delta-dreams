<template>
  <div>
    <button type="button" class="btn btn-outline-secondary mb-3" @click="$emit('goBack')">
      Back
    </button>
    <h5>New Guest Form</h5>
    <form>
      <!-- Add form fields here -->
      <div class="mb-3">
        <label for="guestName" class="form-label">Guest Name</label>
        <input type="text" class="form-control" id="guestName" />
      </div>
      <div class="mb-3">
        <label for="guestEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="guestEmail" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewGuest",
};
</script>
