// store/index.js
export const state = () => ({
  selectedDates: [],
});

export const mutations = {
  setSelectedDates (state, dates)
  {
    state.selectedDates = dates;
  },
  clearSelectedDates (state)
  {
    state.selectedDates = [];
  },
};
