export default {
    mounted() {
        const globalChannel = this.$pusher.subscribe('global-channel');
        globalChannel.bind('global-event', this.handleGlobalEvent);
    },

    methods: {
        handleGlobalEvent(data) {
            // Handle global events
            console.log('Global event:', data);
        },
    },

    beforeDestroy() {
        this.$pusher.unsubscribe('global-channel');
    },
};
