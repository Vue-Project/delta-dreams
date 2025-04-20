// alertUtilities.js
import Swal from 'sweetalert2';
export async function showConfirmationAlert(title, text, confirmText = 'Yes', cancelText = 'No', router, routeName) {
    return await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
    });
}

export const showSuccessAlert = (successMessage = 'Operation completed successfully!', router, routeName) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successMessage,
        confirmButtonText: 'OK',
    }).then(() => {
        if (router && routeName) {
            router.push({ name: routeName });
        }
    });
};

export const handleSubmissionError = (error, defaultMessage = 'There was an issue submitting the form.') => {
    let errorMessage = defaultMessage;

    if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        if (typeof validationErrors === 'object') {
            errorMessage = Object.values(validationErrors).flat().join('\n');
        }
    }
    // If no errors found, check for message in response
    else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
    }
    // If no response data at all, use the error message
    else if (error.message) {
        errorMessage = error.message;
    }

    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'OK',
    });
};

export const showConfirmationDialog = (message = 'Are you sure you want to proceed?') => {
    return Swal.fire({
        title: 'Confirm Changes',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7367f0',
        cancelButtonColor: '#e2e1e5',
        confirmButtonText: 'Yes, proceed!',
    });
};
export const showUpdateConfirmationDialog = (startDate, endDate, currentPrice, buildingInfo) => {
    return Swal.fire({
        title: 'Confirm Update',
        html: `<p>Are you sure you want to update this reservation to ${startDate} to ${endDate} for Unit ${buildingInfo} ?</p>
        <div class="mt-3">
                <label  class="form-label  text-start d-block " style="font-size: 20px;">Unit Price:</label>
            </div>`,
        input: 'number',
        inputValue: `${currentPrice}`, // Set the current price as the default value
        inputPlaceholder: 'New price',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#7367f0',
        cancelButtonColor: '#e2e1e5',
    });
};

export const showAlert = ({ title = 'Notification', text = '', icon = 'success', timer, timerProgressBar = false, showConfirmButton = true, confirmButtonText = 'OK', confirmButtonColor = '#7367f0', showCancelButton = false, cancelButtonColor = '#e2e1e5', error = null } = {}) => {
    // Handle server error if provided
    if (error) {
        let errorMessage = '';

        if (error.response?.data?.errors) {
            const validationErrors = error.response.data.errors;
            if (typeof validationErrors === 'object') {
                errorMessage = Object.values(validationErrors).flat().join('\n');
            }
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An unexpected error occurred';
        }

        return Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            confirmButtonColor: '#7367f0',
            confirmButtonText: 'OK',
        });
    }

    // Regular alert if no error
    return Swal.fire({
        title,
        text,
        icon,
        timer,
        timerProgressBar,
        showConfirmButton,
        confirmButtonText,
        confirmButtonColor,
        showCancelButton,
        cancelButtonColor,
    });
};
