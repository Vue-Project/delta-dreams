<template>
  <!-- <ul class="pagination">
    <li class="page-item" :class="{ disabled: currentPage === 1 }">
      <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
    </li>
    <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
      <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
      <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
    </li>
  </ul> -->
  <nav aria-label="Page navigation">
                          <ul class="pagination justify-content-center">
                            <li class="page-item prev" :class="{ disabled: currentPage === 1 }">
                              <a class="page-link waves-effect" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fa-solid fa-angles-left"></i></a>
                            </li>
                            <li  v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                              <a class="page-link waves-effect" href="#" @click.prevent="changePage(currentPage - 1)">{{ page }}</a>
                            </li>

                            <li class="page-item next" :class="{ disabled: currentPage === totalPages }">
                              <a class="page-link waves-effect" href="#" @click.prevent="changePage(currentPage + 1)"><i class="fa-solid fa-angles-right"></i></a>
                            </li>
                          </ul>
                        </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.$emit('page-changed', page);
    }
  }
};
</script>

<style scoped>
/* .pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.page-item {
  margin: 0 5px;
}
.page-link {
  cursor: pointer;
}
.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.6;
}
.active .page-link {
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
} */
</style>
