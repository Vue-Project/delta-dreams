export const state = () => ({
    items: [],
});

export const mutations = {
    ADD_NOTIFICATION(state, notification) {
        if (!Array.isArray(state.items)) {
            state.items = [];
        }

        state.items = state.items.filter(item => item.id !== notification.id);

        state.items.unshift(notification);
    },

    REMOVE_NOTIFICATION(state, index) {
        state.items.splice(index, 1);
    },
};
