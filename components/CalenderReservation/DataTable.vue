<template>
  <v-container>
    <!-- Data Table Card -->
    <v-card class="pa-3 elevation-2">
      <!-- Header Section -->
      <v-row align="center" class="mb-3">
        <!-- Dropdown Menu -->
        <v-col cols="2">
          <v-select v-model="selectedRoomType" :items="roomTypes" label="Select Room Type" outlined dense></v-select>
        </v-col>

        <!-- Previous & Next Buttons -->
        <v-col cols="10" class="d-flex justify-center">
          <!-- <v-btn @click="loadPreviousDays" color="primary" outlined small class="mr-2">
            <v-icon left>mdi-chevron-left</v-icon>
            Previous 20 Days
          </v-btn>
          <v-btn @click="loadNextDays" color="primary" outlined small class="ml-2">
            Next 20 Days
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn> -->
          <v-col v-for="(day, index) in dateHeaders" :key="index" class="text-center day-header">
            <v-sheet :class="getDayStyle(day)" class="pa-2 rounded" outlined>
              <div class="font-weight-bold">{{ day.day }}</div>
              <div>{{ day.date }}</div>
            </v-sheet>
          </v-col>
        </v-col>
      </v-row>

      <!-- 20-Day Headers in One Row -->
      <!-- <v-row no-gutters class="header-row">
        <v-col v-for="(day, index) in dateHeaders" :key="index" class="text-center day-header">
          <v-sheet :class="getDayStyle(day)" class="pa-2 rounded" outlined>
            <div class="font-weight-bold">{{ day.day }}</div>
            <div>{{ day.date }}</div>
          </v-sheet>
        </v-col>
      </v-row> -->

      <!-- Data Table -->
      <v-data-table :headers="headers" :items="items" hide-default-footer dense class="elevation-1 mt-4">
        <!-- Custom Rows -->
        <template v-slot:body>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <!-- Room Name -->
              <td class="font-weight-bold">{{ item.room }}</td>
              <!-- Data for 20 Days -->
              <td v-for="(day, dIndex) in dateHeaders" :key="dIndex" class="text-center">
                <div class="cell-content">
                  <div class="highlighted-value">{{ item.value }}</div>
                  <div>{{ item.price }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </template>

        <!-- Footer -->
        <template v-slot:footer>
          <tfoot>
            <tr>
              <!-- Footer Title -->
              <td class="font-weight-bold text-left">Room Occupancy %</td>
              <!-- Footer Data -->
              <td v-for="(day, index) in footerData" :key="index" class="text-center footer-cell">
                {{ day.value }}
              </td>
            </tr>
          </tfoot>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data ()
  {
    return {
      // Dropdown options
      roomTypes: ["Single Room", "Double Room", "Suite"],
      selectedRoomType: "Single Room",

      // Date Headers
      dateHeaders: [],

      // Table Body Data
      items: [
        { room: "102", value: "2", price: "0.00" },
        { room: "103", value: "2", price: "0.00" },
      ],

      // Footer Data
      footerData: [],

      // Current Start Date
      currentStartDate: new Date(),
    };
  },
  created ()
  {
    this.loadInitialDates();
  },
  methods: {
    // Load Initial 20 Days
    loadInitialDates ()
    {
      this.dateHeaders = this.generateDateHeaders(this.currentStartDate, 20);
      this.footerData = this.generateFooterData(20);
    },

    // Load Next 20 Days
    loadNextDays ()
    {
      this.currentStartDate.setDate(this.currentStartDate.getDate() + 20);
      this.loadInitialDates();
    },

    // Load Previous 20 Days
    loadPreviousDays ()
    {
      this.currentStartDate.setDate(this.currentStartDate.getDate() - 20);
      this.loadInitialDates();
    },

    // Generate 20-Day Headers
    generateDateHeaders (startDate, numberOfDays)
    {
      const headers = [];
      for (let i = 0; i < numberOfDays; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        headers.push({
          day: date.getDate(),
          date: date.toLocaleDateString(),
          special: i % 5 === 0 ? "red" : "normal", // Mark every 5th day as special
        });
      }
      return headers;
    },

    // Generate Footer Data for 20 Days
    generateFooterData (numberOfDays)
    {
      return Array.from({ length: numberOfDays }, () => ({ value: "0" }));
    },

    // Styling Logic for Day Headers
    getDayStyle (day)
    {
      return day.special === "red" ? "red-day" : "normal-day";
    },
  },
};
</script>

<style scoped>
/* Header Row Styling */
.header-row {
  margin-bottom: 10px;
}

.day-header {
  border: 1px solid #e0e0e0;
  margin-right: 1px;
}

/* Styling for Red and Normal Days */
.red-day {
  background-color: #ffcdd2;
  border: 1px solid #b71c1c;
}

.normal-day {
  background-color: #e3f2fd;
  border: 1px solid #0d47a1;
}

/* Cell Content Styling */
.cell-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
}

.highlighted-value {
  background-color: #ffeb3b;
  border-radius: 4px;
  padding: 2px 6px;
  margin-bottom: 2px;
}

/* Footer Styling */
tfoot {
  background-color: #f5f5f5;
}

.footer-cell {
  font-weight: bold;
  color: #424242;
}
</style>
