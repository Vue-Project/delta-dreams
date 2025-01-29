// src/mixins/dateMixin.js
import moment from "moment";

export const dateMixin = {
  methods: {
    formatDate(date, format = "MMMM D, YYYY") {
      if (!date) return "N/A"; // Handle missing data
      return moment(date).format(format); // Format using Moment.js
    },
    formatDateNumber(date, format = "YYYY-MM-DD") {  // Changed default format
      if (!date) return "N/A"; // Handle missing data
      return moment(date).format(format); // Format using Moment.js
    },
  },
};
