<template>
    <div>
        <!-- <TheHeader /> -->
        <HeaderNav></HeaderNav>
        <NotificationAlert />
        <!-- <PusherStatus /> -->
        <Nuxt />
    </div>
</template>

<script>
    import { CursorFx } from '@luxdamore/vue-cursor-fx';
    import TheHeader from '../components/layout/TheHeader.vue';
    import HeaderNav from '../components/layout/HeaderNav.vue';
    import NotificationAlert from '../components/NotificationAlert.vue';
    import PusherStatus from '../components/PusherStatus.vue';
    // import 'themify-icons/css/themify-icons.css';

    export default {
        components: { CursorFx, TheHeader, HeaderNav, NotificationAlert, PusherStatus },
    };
</script>

<style src="@luxdamore/vue-cursor-fx/dist/CursorFx.css"></style>
