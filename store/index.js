export const state = () => ({
  selectedDates: [],
  selectedResourceName: "", // Add selectedResourceId to the state
  reservationTypes: [], // Add new state
  rateTypes: [], // Add new state
  countries: [], // Add new state
  vipStatus: [],
  nationalTypes: [],
  genderTypes: [],
// acces page in URl
  // accessAllowed: {},


});

export const mutations = {
  setSelectedDates(state, dates) {
    state.selectedDates = dates;
  },

  setSelectedResourceName(state, resourceName) {
    state.selectedResourceName = resourceName;
  },

  clearSelectedDates(state) {
    state.selectedDates = [];
  },

  clearSelectedResourceName(state) {
    state.selectedResourceName = "";
  },

  clearAll(state) {
    state.selectedDates = [];
    state.selectedResourceName = "";
    state.reservationTypes = [];
    state.rateTypes = [];
    state.countries = [];
    state.vipStatus = [];
    state.nationalTypes = [];
    state.genderTypes = [];
  },
      // acces page in URl

  // setAccessAllowed(state, { path, value }) {
  //   state.accessAllowed[path] = value;
  // },

  setReservationTypes(state, types) {
    state.reservationTypes = types;
  },

  setRateTypes(state, types) {
    state.rateTypes = types;
  },

  setCountries(state, countries) {
    state.countries = countries;
  },

  setVipStatus(state, vipStatus) {
    state.vipStatus = vipStatus;
  },

  setNationalTypes(state, nationalTypes) {
    state.nationalTypes = nationalTypes;
  },

  setGenderTypes(state, genderTypes) {
    state.genderTypes = genderTypes;
  },

};
    // acces page in URl

export const getters = {
  getReservationTypes: state => state.reservationTypes,
  getRateTypes: state => state.rateTypes,
  getCountries: state => state.countries,
  getVipStatus: state => state.vipStatus,
  getNationalTypes: state => state.nationalTypes,
  getGenderTypes: state => state.genderTypes,
};

export const actions = {
  // Add actions to fetch and set the data
  updateReservationTypes({ commit }, types) {
    commit('setReservationTypes', types);
  },
  updateRateTypes({ commit }, types) {
    commit('setRateTypes', types);
  },
  updateCountries({ commit }, countries) {
    commit('setCountries', countries);
  },
  updateVipStatus({ commit }, vipStatus) {
    commit('setVipStatus', vipStatus);
  },
  updateNationalTypes({ commit }, nationalTypes) {
    commit('setNationalTypes', nationalTypes);
  },
  updateGenderTypes({ commit }, genderTypes) {
    commit('setGenderTypes', genderTypes);
  },
};
