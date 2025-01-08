import Swal from 'sweetalert2';

export const formUtils = {
  async showError(message) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  },

  async showSuccess(message) {
    await Swal.fire({
      icon: 'success',
      title: 'Success Block Room',
      text: message
    });
  },

  validateBlockRoomForm(formData) {
    const { dateStartAndEnd, roomType, room, reason } = formData;
    if (!dateStartAndEnd || !roomType || !room || !reason) {
      throw new Error('Please fill in all required fields');
    }
  }
};
 export default {
  formUtils
 };

