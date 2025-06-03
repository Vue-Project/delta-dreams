// src/mixins/dateMixin.js
import moment from 'moment';

export const dateMixin = {
    methods: {
        formatDate(date, format = 'MMMM D, YYYY') {
            if (!date) return 'N/A'; // Handle missing data
            return moment(date).format(format); // Format using Moment.js
        },
        formatDateNumber(date, format = 'YYYY-MM-DD') {
            // Changed default format
            if (!date) return 'N/A'; // Handle missing data
            return moment(date).format(format); // Format using Moment.js
        },
        formatTimeAndDate(date) {
            const d = new Date(date);
            // Format: YYYY-MM-DD HH:mm:ss
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}${hours}:${minutes}:${seconds}`;
        },
    },
};
