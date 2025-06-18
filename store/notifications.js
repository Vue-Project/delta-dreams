export const state = () => ({
    items: [],
});

export const mutations = {
    ADD_NOTIFICATION(state, notification) {
        state.items.push(notification);
    },
    REMOVE_NOTIFICATION(state, index) {
        state.items.splice(index, 1);
    },
};
