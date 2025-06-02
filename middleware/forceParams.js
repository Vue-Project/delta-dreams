export default function ({ store, route, redirect }) {
    // If code and type already exist in the URL — do nothing
    if (route.query.code && route.query.type) {
        return;
    }
    // if (!store.state.code || !store.state.type) {
    //     store.commit('setParams', {
    //         code: 'DefaultCodeHere',
    //         type: 'DefaultTypeHere',
    //     });
    // }

    // Get code and type from store
    const code = store.state.code;
    const type = store.state.type;

    // If store has both — add them to the current URL
    if (code && type) {
        redirect({
            path: route.path,
            query: {
                ...route.query,
                code,
                type,
            },
        });
    }
}
