// alertUtilities.js
import Swal from 'sweetalert2'

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

  return Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: errorMessage,
    confirmButtonText: "OK",
  });
}
