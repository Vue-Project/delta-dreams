<template>
  <div>
    <!-- Overlay -->
    <div
      v-if="isOpen"
      class="sidebar-overlay"
      @click="$emit('close')"
    ></div>

    <!-- Sidebar -->
    <div class="room-details-sidebar" :class="{ 'show': isOpen }">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <div class="d-flex align-items-center">
            <button class="btn btn-icon me-2" @click="$emit('close')">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <h5 class="mb-0">Room Details - {{ room.name }}</h5>
          </div>
        </div>

        <div class="sidebar-body">
          <!-- Basic Information -->
          <div class="details-section">
            <h6 class="mb-3">Basic Information</h6>
            <dl class="row">
              <dt class="col-5">Room Code</dt>
              <dd class="col-7">{{ room.code }}</dd>

              <dt class="col-5">Area</dt>
              <dd class="col-7">{{ room.area }}</dd>

              <dt class="col-5">Status</dt>
              <dd class="col-7">
                <span :class="['badge', getStatusBadgeClass(room.status)]">
                  {{ room.status_name }}
                </span>
              </dd>
            </dl>
          </div>

          <!-- Room Configuration -->
          <div class="details-section">
            <h6 class="mb-3">Room Configuration</h6>
            <dl class="row">
              <dt class="col-5">Rooms</dt>
              <dd class="col-7">{{ room.rooms }}</dd>

              <dt class="col-5">Bathrooms</dt>
              <dd class="col-7">{{ room.bathroom }}</dd>

              <dt class="col-5">Kitchen Type</dt>
              <dd class="col-7">{{ room.kitchen_type }}</dd>
            </dl>
          </div>

          <!-- Capacity & Price -->
          <div class="details-section">
            <h6 class="mb-3">Capacity & Price</h6>
            <dl class="row">
              <dt class="col-5">Adults</dt>
              <dd class="col-7">{{ room.adults }}</dd>

              <dt class="col-5">Children</dt>
              <dd class="col-7">{{ room.children }}</dd>

              <dt class="col-5">Price</dt>
              <dd class="col-7">EGP {{ room.price }}</dd>
            </dl>
          </div>

          <!-- Location Details -->
          <div class="details-section">
            <h6 class="mb-3">Location</h6>
            <dl class="row">
              <dt class="col-5">Floor</dt>
              <dd class="col-7">{{ room.floor?.name }}</dd>

              <dt class="col-5">Direction</dt>
              <dd class="col-7">{{ room.direction?.name }}</dd>

              <dt class="col-5">View</dt>
              <dd class="col-7">{{ room.unit_view?.name }}</dd>
            </dl>
          </div>

          <!-- Room Features -->
          <div class="details-section">
            <h6 class="mb-3">Features</h6>
            <dl class="row">
              <dt class="col-5">Smoking</dt>
              <dd class="col-7">
                <div class="d-flex align-items-center">
                  <i class="fa-solid me-2" :class="room.is_smoking ? 'fa-smoking' : 'fa-ban-smoking'"></i>
                  {{ room.is_smoking ? 'Allowed' : 'Not Allowed' }}
                </div>
              </dd>

              <dt class="col-5">Cleanliness</dt>
              <dd class="col-7">
                <div class="d-flex align-items-center">
                  <i class="fa-solid me-2" :class="room.is_clean ? 'fa-broom' : 'fa-dust'"></i>
                  {{ room.is_clean ? 'Clean' : 'Needs Cleaning' }}
                </div>
              </dd>

              <dt class="col-5">Availability</dt>
              <dd class="col-7">
                <div class="d-flex align-items-center">
                  <i class="fa-solid me-2" :class="room.is_available ? 'fa-check-circle' : 'fa-times-circle'"></i>
                  {{ room.is_available ? 'Available' : 'Not Available' }}
                </div>
              </dd>
            </dl>
          </div>

          <!-- Action Buttons -->
          <!-- <div class="details-section">
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="handleBookRoom" v-if="room.is_available">
                Book Room
              </button>
              <button class="btn btn-outline-secondary" @click="handleViewHistory">
                View History
              </button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomDetailsSidebar',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    room: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      const statusClasses = {
        vacant: 'bg-vacant',
        occupied: 'bg-occupied',
        reserved: 'bg-reserved',
        blocked: 'bg-blocked',
        dirty: 'bg-dirty'
      };
      return statusClasses[status] || 'bg-primary';
    },
    handleBookRoom() {
      // Emit event to parent for booking
      this.$emit('book-room', this.room);
    },
    handleViewHistory() {
      // Emit event to parent for viewing history
      this.$emit('view-history', this.room);
    }
  }
};
</script>

<style scoped>
/* Overlay styles */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  animation: fadeIn 0.3s ease;
}

/* Sidebar styles */
.room-details-sidebar {
  position: fixed;
  top: 0;
  left: -400px; /* Changed from right to left */
  width: 400px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15); /* Updated shadow direction */
  transition: left 0.3s ease; /* Changed from right to left */
  z-index: 1050;
  overflow-y: auto;
}

.room-details-sidebar.show {
  left: 0; /* Changed from right to left */
}

/* Content styles */
.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
}

.btn-icon {
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: #566a7f;
  transition: background-color 0.2s ease;
}

.btn-icon:hover {
  background-color: #f0f0f0;
}

.sidebar-body {
  padding: 1.5rem;
  flex-grow: 1;
}

.details-section {
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.375rem;
}

.details-section:last-child {
  margin-bottom: 0;
}

.details-section h6 {
  color: #566a7f;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.5rem;
}

dl.row {
  margin-bottom: 0;
}

dt {
  color: #566a7f;
  font-weight: 500;
}

dd {
  margin-bottom: 0.5rem;
}

dd:last-child {
  margin-bottom: 0;
}

.badge {
  padding: 0.5em 0.75em;
}

/* Animation keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive styles */
@media (max-width: 576px) {
  .room-details-sidebar {
    width: 100%;
    left: -100%;
  }
}

/* Status badge colors */
.bg-vacant { background-color: #23be28 !important; }
.bg-occupied { background-color: #2196F3 !important; }
.bg-reserved { background-color: #ffcc00 !important; }
.bg-blocked { background-color: #bdbdbd !important; }
.bg-dirty { background-color: #ff6f00 !important; }

/* Icon styles */
.fa-solid {
  width: 20px;
  text-align: center;
}
</style>
