import createPersistedState from 'vuex-persistedstate';

export const state = () => ({
  selectedDates: [],
  selectedResourceName: "",
  reservationTypes: [],
  rateTypes: [],
  countries: [],
  vipStatus: [],
  nationalTypes: [],
  genderTypes: [],
  projects: [],
  remindGuestType: [],
  code: null,
  type: null,
  lastUpdated: null
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
  setProjects(state, projects) {
    state.projects = projects;
  },
  setRemindGuestType(state, remindGuestType) {
    state.remindGuestType = remindGuestType;
  },
  setParams(state, { code, type, lastUpdated }) {
    if (code) state.code = code;
    if (type) state.type = type;
    if (lastUpdated) state.lastUpdated = lastUpdated;
  }
};

export const getters = {
  getReservationTypes: state => state.reservationTypes,
  getRateTypes: state => state.rateTypes,
  getCountries: state => state.countries,
  getVipStatus: state => state.vipStatus,
  getNationalTypes: state => state.nationalTypes,
  getGenderTypes: state => state.genderTypes,
  getProjects: state => state.projects,
  getRemindGuestType: state => state.remindGuestType,
};

export const actions = {
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
  updateProjects({ commit }, projects) {
    commit('setProjects', projects);
  },
  updateRemindGuestType({ commit }, remindGuestType) {
    commit('setRemindGuestType', remindGuestType);
  }
};


export const plugins = [
  process.client
    ? createPersistedState({
        key: 'myVuexStore',
        paths: [
          'selectedDates',
          'selectedResourceName',
          'reservationTypes',
          'rateTypes',
          'countries',
          'vipStatus',
          'nationalTypes',
          'genderTypes',
          'projects',
          'remindGuestType',
          'code',
          'type',
          'lastUpdated'
        ]
      })
    : () => {}
];

