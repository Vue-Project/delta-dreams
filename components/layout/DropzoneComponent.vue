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
      new Dropzone(dropzoneElement, {
        url: "/upload",
        maxFilesize: 10,
        acceptedFiles: ".jpg,.png,.gif,.jpeg",
        addRemoveLinks: true,
        dictRemoveFile: "Remove",
        autoProcessQueue: false,
        init ()
        {
          this.on("addedfile", function (file)
          {
            const progressElement = file.previewElement.querySelector(".dz-progress");
            if (file.type.startsWith("image/")) {
              progressElement.style.display = "none";
              const reader = new FileReader();
              reader.onload = function (e)
              {
                file.previewElement.querySelector("img").src = e.target.result;
                file.previewElement.classList.add("dz-success");
                file.previewElement.querySelector(".dz-success-mark").style.display = "inline";
              };
              reader.readAsDataURL(file);
            }
          });

          this.on("success", function (file)
          {
            const progressElement = file.previewElement.querySelector(".dz-progress");
            progressElement.style.display = "none";
            file.previewElement.classList.add("dz-success");
            file.previewElement.querySelector(".dz-success-mark").style.display = "inline";
          });

          this.on("error", function (file, errorMessage)
          {
            file.previewElement.classList.add("dz-error");
            console.error("File upload error:", errorMessage);
            file.previewElement.querySelector(".dz-error-mark").style.display = "inline";
          });
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
