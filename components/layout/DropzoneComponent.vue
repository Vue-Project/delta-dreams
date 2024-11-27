<template>
  <div>
    <div id="my-dropzone" class="dropzone">
      <div class="dz-message"> <span><i class="fa-solid fa-plus"></i></span>Upload</div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

export default {
  name: "DropzoneComponent",
  mounted() {
    this.initializeDropzone();
  },
  methods: {
    initializeDropzone() {
      Dropzone.autoDiscover = false;

      const dropzoneElement = document.querySelector("#my-dropzone");

      if (!dropzoneElement) {
        console.error("Dropzone element not found!");
        return;
      }

      // Initialize Dropzone (without uploading the image)
      new Dropzone(dropzoneElement, {
        url: "/upload", // Fake endpoint (not used, no upload happening)
        maxFilesize: 10, // Max file size in MB
        acceptedFiles: ".jpg,.png,.gif,.jpeg", // Allowed file types
        addRemoveLinks: true, // Allow file removal
        dictRemoveFile: "Remove", // Custom remove button text
        autoProcessQueue: false, // Prevent auto upload
        init() {
          // File preview (only show images)
          this.on("addedfile", function (file) {
            // Immediately hide progress bar for image files
            const progressElement = file.previewElement.querySelector(".dz-progress");
            if (file.type.startsWith("image/")) {
              // Remove progress bar on image file add
              progressElement.style.display = "none"; // Hide progress bar immediately

              // Load image preview
              const reader = new FileReader();
              reader.onload = function (e) {
                file.previewElement.querySelector("img").src = e.target.result;
                // Add success mark (checkmark) once the image is loaded
                file.previewElement.classList.add("dz-success");
                file.previewElement.querySelector(".dz-success-mark").style.display = "inline"; // Show checkmark
              };
              reader.readAsDataURL(file);
            }
          });

          this.on("success", function (file) {
            //  ! Mark the file as successfully added
            const progressElement = file.previewElement.querySelector(".dz-progress");
            progressElement.style.display = "none"; // Hide the progress bar after success
            file.previewElement.classList.add("dz-success"); // Add success class
            file.previewElement.querySelector(".dz-success-mark").style.display = "inline"; // Show checkmark
          });

          this.on("error", function (file, errorMessage) {
            file.previewElement.classList.add("dz-error"); // Add error class
            console.error("File upload error:", errorMessage);
            file.previewElement.querySelector(".dz-error-mark").style.display = "inline"; // Show error icon
          });
        },
      });
    },
  },
};
</script>

<style scoped>

.dz-preview .dz-progress {
  display: none !important;
}

.dropzone {
  min-height: 150px;
  border: 2px dashed #868788 ;
  border-radius: 5px;
  padding: 0;
  background: #f7f7f7;
  text-align: center;
}

.dz-message {
  color: #868788;
  font-size: 15px;
}

.dz-image img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
