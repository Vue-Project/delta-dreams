export const state = () => ({
  selectedDates: [],
  selectedResourceName: "", // Add selectedResourceId to the state
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
};
