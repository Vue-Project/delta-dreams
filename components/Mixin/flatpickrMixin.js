// flatpickrMixin.js
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default {
  mounted ()
  {
    this.initFlatpickers();
  },
  methods: {
    initFlatpickers ()
    {
      this.$nextTick(() =>
      {
        // Array of date pickers (1 to 7)
        const datePickers = [
          this.$refs.datePicker1,
          this.$refs.datePicker2,
          this.$refs.datePicker3,
          this.$refs.datePicker4,
          this.$refs.datePicker5,
          this.$refs.datePicker6,
          this.$refs.datePicker7,
          this.$refs.datePicker8,
          this.$refs.datePicker9,
        ].filter(Boolean); // Filter out undefined refs

        // Initialize date pickers
        datePickers.forEach((picker) =>
        {
          flatpickr(picker, {
            dateFormat: "Y-m-d", // Set the desired date format
          });
        });

        // Array of time pickers (1 to 3)
        const timePickers = [
          this.$refs.timePicker1,
          this.$refs.timePicker2,
          this.$refs.timePicker3,
        ].filter(Boolean);

        // Initialize time pickers
        timePickers.forEach((picker) =>
        {
          flatpickr(picker, {
            enableTime: true, // Enable time selection
            noCalendar: true, // Disable calendar, only time picker
            dateFormat: "H:i", // Set time format
          });
        });

        // Array of range pickers (1 to 4)
        const rangePickers = [
          this.$refs.rangePicker1,
          this.$refs.rangePicker2,
          this.$refs.rangePicker3,
          this.$refs.rangePicker4,
        ].filter(Boolean); // Filter out undefined refs

        // Initialize range pickers
        rangePickers.forEach((picker) =>
        {
          flatpickr(picker, {
            mode: "range", // Enable range selection
            dateFormat: "Y-m-d", // Set the desired date format
            onChange: (selectedDates, dateStr) =>
            {
              console.log("Range Selected:", dateStr); // Optional: Handle date change
            },
          });
        });
      });
    },
  },
};
