<template>
  <div>
    <button type="button" class="btn btn-outline-secondary mb-3 mt-2" @click="$emit('goBack')">
      <i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d"></i>

      Massage
    </button>
    <table class="table">
      <thead class="table-light">
        <tr>
          <th class="w-50">Message</th>
          <th>Guest Name</th>
          <th>Room</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody class="table-border-bottom-0">
        <td></td>
      </tbody>
    </table>
    <div class="col-12 d-flex justify-content-end">
      <button type="button" class="btn btn-outline-primary waves-effect">
        Save
      </button>
    </div>
  </div>
</template>


<script>

export default {
  name: "DefaultContent",

};
</script>
