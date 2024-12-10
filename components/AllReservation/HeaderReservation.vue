<template>
  <div class="card mb-3">
    <div class="card-header p-4">
      <ul class="nav nav-tabs card-header-tabs pb-2 " role="tablist">
        <slot name="button"></slot>
      </ul>
    </div>

    <div class="tab-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderReservation",
};
</script>
