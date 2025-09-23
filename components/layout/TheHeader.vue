<template>
  <header id="main-header" :class="mode">
    <nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
      <div class="container-fluid">
        <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4 w-100 justify-content-between">
          <a href="/" class="app-brand-link gap-2">
            <span class="app-brand-logo demo"> </span>
            <span class="app-brand-text demo menu-text fw-bold">Delta Dream</span>
          </a>
          <a class="nav-item nav-link px-0 me-xl-4 fw-bold" href="/room-view">
            Room View
          </a>


        </div>

        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">

        </div>



      </div>

    </nav>
  </header>
  
</template>

<script>
export default {
  name: "Header",
  layout: "component",
  data ()
  {
    return {
      mode: "light", // or some default value, 'light' or 'dark'
    };
  },
};
</script>

<style></style>
