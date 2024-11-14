<template>
  <header id="main-header" :class="mode">
    <nav
      class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div class="container-fluid">
        <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
          <a href="index.html" class="app-brand-link gap-2">
            <span class="app-brand-logo demo"> </span>
            <span class="app-brand-text demo menu-text fw-bold"
              >Delta Dream</span
            >
          </a>

          <a
            href="javascript:void(0);"
            class="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
          >
            <i class="ti ti-x ti-sm align-middle"></i>
          </a>
        </div>

        <div
          class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
        >
          <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i class="ti ti-menu-2 ti-sm"></i>
          </a>
        </div>

        <div
          class="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <ul class="navbar-nav flex-row align-items-center ms-auto">
            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                class="nav-link dropdown-toggle hide-arrow"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
              >
                <div class="avatar avatar-online">
                  <img
                    src="https://swevey.com/public/assets/img/avatars/1.png"
                    class="h-auto rounded-circle"
                    alt="User Image"
                  />
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    class="dropdown-item"
                    href="https://swevey.com/public/admin/users/1/edit"
                  >
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img
                            src="https://swevey.com/public/assets/img/avatars/1.png"
                            class="img-circle"
                            alt="User Image"
                          />
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-medium d-block">
                          mohamed elsherbiny
                        </span>
                        <small class="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="https://swevey.com/public/admin/users/1/edit"
                  >
                    <i class="ti ti-user-check me-2 ti-sm"></i>
                    <span class="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="https://swevey.com/public/admin/users/1/edit"
                  >
                    <i class="ti ti-settings me-2 ti-sm"></i>
                    <span class="align-middle">Settings</span>
                  </a>
                </li>

                <li>
                  <div class="dropdown-divider"></div>
                </li>

                <li>
                  <a
                    class="dropdown-item"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                    style="cursor: pointer"
                  >
                    <form
                      id="logout-form"
                      action="https://swevey.com/public/admin/logout"
                      method="POST"
                      style="display: none"
                    >
                      <input
                        type="hidden"
                        name="_token"
                        value="CZA3pJw9S72QZr45RwxZtgQYETQy7mkQpnpQzv6w"
                        autocomplete="off"
                      />
                    </form>
                    <i class="ti ti-logout me-2 ti-sm"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
            <!--/ User -->
          </ul>
        </div>

        <!-- Search Small Screens -->
        <div
          class="navbar-search-wrapper search-input-wrapper container-xxl d-none"
        >
          <input
            type="text"
            class="form-control search-input border-0"
            placeholder="Search..."
            aria-label="Search..."
          />
          <i class="ti ti-x ti-sm search-toggler cursor-pointer"></i>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
// import SocialMedia from '../components/SocialMedia.vue';

export default {
  // components: {
  //   SocialMedia

  // },
  name: "Header",
  props: {
    mode: {
      type: String,
    },
  },
};
</script>

<style></style>
