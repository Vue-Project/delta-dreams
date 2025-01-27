export const state = () => ({
  selectedDates: [],
  selectedResourceName: "", // Add selectedResourceId to the state
      // acces page in URl

  // accessAllowed: {}

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
  },
      // acces page in URl

  // setAccessAllowed(state, { path, value }) {
  //   state.accessAllowed[path] = value;
  // }
};
    // acces page in URl

// export const actions = {
//   allowAccess({ commit }, path) {
//     commit('setAccessAllowed', { path, value: true });
//   },
//   resetAccess({ commit }, path) {
//     commit('setAccessAllowed', { path, value: false });
//   }
// }
