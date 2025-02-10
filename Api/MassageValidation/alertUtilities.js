// alertUtilities.js
import Swal from 'sweetalert2'
export async function showConfirmationAlert(title, text, confirmText = "Yes", cancelText = "No",router,routeName) {
  return await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    
  });
}

export const showSuccessAlert = (successMessage = "Operation completed successfully!", router, routeName) => {
  return Swal.fire({
    icon: "success",
    title: "Success!",
    text: successMessage,
    confirmButtonText: "OK",
  }).then(() => {
    if (router && routeName) {
      router.push({ name: routeName });
    }
  });
}

export const handleSubmissionError = (error, defaultMessage = "There was an issue submitting the form.") => {
  let errorMessage = defaultMessage;

  if (error.response?.data?.errors) {
    const validationErrors = error.response.data.errors;
    if (typeof validationErrors === 'object') {
      errorMessage = Object.values(validationErrors)
        .flat()
        .join('\n');
    }
  }
  // If no errors found, check for message in response
  else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  }
  else if (error.response?.data?.error) {
    errorMessage = error.response.data.error;
  }
  // If no response data at all, use the error message
  else if (error.message) {
    errorMessage = error.message;
  }

  return Swal.fire({
    icon: "error",
    title: "Error",
    text: errorMessage,
    confirmButtonText: "OK",
  });
}
