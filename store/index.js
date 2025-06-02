import createPersistedState from 'vuex-persistedstate';

export const state = () => ({
    selectedDates: [],
    selectedResourceName: '',
    reservationTypes: [],
    rateTypes: [],
    countries: [],
    vipStatus: [],
    nationalTypes: [],
    genderTypes: [],
    projects: [],
    reservationStatus: [],
    reservationRejects: [],
    remindGuestType: [],
    code: 'Iz0lUumVPWzPek7Z',
    type: 'admin',
    lastUpdated: null,
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
        state.selectedResourceName = '';
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
    setReservationStatus(state, reservationStatus) {
        state.reservationStatus = reservationStatus;
    },
    setReservationRejects(state, reservationRejects) {
        state.reservationRejects = reservationRejects;
    },
    setRemindGuestType(state, remindGuestType) {
        state.remindGuestType = remindGuestType;
    },
    setParams(state, { code, type }) {
        if (code !== null && code !== undefined) state.code = code;
        if (type !== null && type !== undefined) state.type = type;
    },
    resetStore(state) {
        Object.assign(state, state());
    },
};

export const getters = {
    getReservationTypes: state => state.reservationTypes,
    getRateTypes: state => state.rateTypes,
    getCountries: state => state.countries,
    getVipStatus: state => state.vipStatus,
    getNationalTypes: state => state.nationalTypes,
    getGenderTypes: state => state.genderTypes,
    getProjects: state => state.projects,
    getReservationStatus: state => state.reservationStatus,
    getReservationRejects: state => state.reservationRejects,
    getRemindGuestType: state => state.remindGuestType,
    getCode: state => state.code,
    getType: state => state.type,
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
    updateReservationRejects({ commit }, reservationRejects) {
        commit('setReservationRejects', reservationRejects);
    },
    updateReservationStatus({ commit }, reservationStatus) {
        commit('setReservationStatus', reservationStatus);
    },
    updateRemindGuestType({ commit }, remindGuestType) {
        commit('setRemindGuestType', remindGuestType);
    },
    initializeStore({ commit, state }) {
        if (process.client) {
            // Get data from localStorage
            const storedData = localStorage.getItem('myVuexStore');

            if (storedData) {
                const parsedData = JSON.parse(storedData);

                // Initialize all stored data
                if (parsedData.rateTypes) {
                    commit('setRateTypes', parsedData.rateTypes);
                }
                if (parsedData.reservationTypes) {
                    commit('setReservationTypes', parsedData.reservationTypes);
                }
                if (parsedData.countries) {
                    commit('setCountries', parsedData.countries);
                }
                if (parsedData.vipStatus) {
                    commit('setVipStatus', parsedData.vipStatus);
                }
                if (parsedData.nationalTypes) {
                    commit('setNationalTypes', parsedData.nationalTypes);
                }
                if (parsedData.genderTypes) {
                    commit('setGenderTypes', parsedData.genderTypes);
                }
                if (parsedData.projects) {
                    commit('setProjects', parsedData.projects);
                }
                if (parsedData.reservationStatus) {
                    commit('setReservationStatus', parsedData.reservationStatus);
                }
                if (parsedData.reservationRejects) {
                    commit('setReservationRejects', parsedData.reservationRejects);
                }
                if (parsedData.remindGuestType) {
                    commit('setRemindGuestType', parsedData.remindGuestType);
                }
                if (parsedData.code || parsedData.type) {
                    commit('setParams', {
                        code: parsedData.code || '',
                        type: parsedData.type || '',
                    });
                }
            }
        }
    },
};

export const plugins = [
    process.client
        ? createPersistedState({
              key: 'myVuexStore',
              paths: ['selectedDates', 'selectedResourceName', 'reservationTypes', 'rateTypes', 'countries', 'vipStatus', 'nationalTypes', 'genderTypes', 'projects', 'reservationRejects', 'reservationStatus', 'remindGuestType', 'code', 'type', 'lastUpdated'],
              storage: window.localStorage,
          })
        : () => {},
];
