<template>
  <div>
    <div :id="dropzoneId" class="dropzone">
      <div class="dz-message">
        <span><i class="fa-solid fa-plus"></i></span> Upload
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

export default {
  name: "DropzoneComponent",
  props: {
    id: {
      type: String,
      required: true,
    },

    // formData: {
    //   type: Object,
    //   required: true,
    // },
  },
  computed: {
    dropzoneId ()
    {
      return this.id || "my-dropzone"; // Use prop or default to "my-dropzone"
    },
  },
  mounted ()
  {
    this.initializeDropzone();
  },
  methods: {
    initializeDropzone ()
    {
      Dropzone.autoDiscover = false;

      const dropzoneElement = document.querySelector(`#${this.dropzoneId}`);

      if (!dropzoneElement) {
        console.error("Dropzone element not found!");
        return;
      }

      // Initialize Dropzone
      const dz = new Dropzone(dropzoneElement, {
        url: "/upload",
        maxFilesize: 10, // Max file size in MB
        acceptedFiles: ".jpg,.png,.gif,.jpeg",
        addRemoveLinks: true,
        dictRemoveFile: "Remove",
        autoProcessQueue: false, // Do not auto-upload immediately
        init ()
        {
          // Handle file added to the dropzone
          this.on("addedfile", (file) =>
          {
            const progressElement = file.previewElement.querySelector(".dz-progress");
            if (file.type.startsWith("image/")) {
              progressElement.style.display = "none"; // Hide the progress bar
              const reader = new FileReader();
              reader.onload = (e) =>
              {
                file.previewElement.querySelector("img").src = e.target.result;
                file.previewElement.classList.add("dz-success");
                file.previewElement.querySelector(".dz-success-mark").style.display = "inline";
              };
              reader.readAsDataURL(file);
            }
          });

          // Handle successful file upload
          this.on("success", (file) =>
          {
            const progressElement = file.previewElement.querySelector(".dz-progress");
            progressElement.style.display = "none";
            file.previewElement.classList.add("dz-success");
            file.previewElement.querySelector(".dz-success-mark").style.display = "inline";

            // Emit the file to the parent component
            this.$emit("file-uploaded", file);
          });

          // Handle file upload error
          this.on("error", (file, errorMessage) =>
          {
            file.previewElement.classList.add("dz-error");
            console.error("File upload error:", errorMessage);
            file.previewElement.querySelector(".dz-error-mark").style.display = "inline";
          });
        },
      });

      // Prevent the file from being automatically removed from the dropzone
      dz.on("removedfile", (file) =>
      {
        // Do not remove the file automatically, we will handle it in the parent component
        console.log("File removed:", file);
      });
    },
  },
};
</script>
