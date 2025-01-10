<template>
<nav aria-label="Page navigation">
  <ul class="pagination pagination-sm">
    <!-- Previous Button -->
    <li class="page-item prev" :class="{ disabled: currentPage === 1 }">
      <a
        class="page-link waves-effect"
        href="javascript:void(0);"
        @click="fetchPage(currentPage - 1)"
      >
        <i class="tf-icon fs-6 ti ti-chevrons-left"></i>
      </a>
    </li>

    <!-- Page Numbers -->
    <li
      class="page-item"
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage === page }"
    >
      <a
        class="page-link waves-effect"
        href="javascript:void(0);"
        @click="fetchPage(page)"
      >
        {{ page }}
      </a>
    </li>

    <!-- Next Button -->
    <li class="page-item next" :class="{ disabled: currentPage === totalPages }">
      <a
        class="page-link waves-effect"
        href="javascript:void(0);"
        @click="fetchPage(currentPage + 1)"
      >
        <i class="tf-icon fs-6 ti ti-chevrons-right"></i>
      </a>
    </li>
  </ul>
</nav>

</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // Current active page
      totalPages: 1,  // Total number of pages
      perPage: 10,    // Number of items per page
    };
  },
  methods: {
    async fetchPage(page) {
      if (page < 1 || page > this.totalPages) return; // Prevent invalid page requests

      this.currentPage = page;

      try {
        const response = await getReservationData({
          type: this.tabsMap[this.activeTab],
          page
        });

        // Update data and meta
        this.tabData[this.activeTab].data = response.data;
        const meta = response.meta;
        this.totalPages = meta.total_pages;
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    },
  },
  mounted() {
    // Fetch initial data
    this.fetchPage(this.currentPage);
  },
};

</script>

<style scoped>

</style>
