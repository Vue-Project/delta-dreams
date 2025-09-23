<template>
    <div>
        <!-- <TheHeader /> -->
        <HeaderNav></HeaderNav>
        <!-- <PusherStatus /> -->
        <Nuxt />
        <NotificationTest />
    </div>
</template>

<script>
    import { CursorFx } from '@luxdamore/vue-cursor-fx';
    import TheHeader from '../components/layout/TheHeader.vue';
    import HeaderNav from '../components/layout/HeaderNav.vue';
    import NotificationTest from '../components/SiderbarContentEdit/Notification.vue';

    // import 'themify-icons/css/themify-icons.css';

    export default {
        components: { CursorFx, TheHeader, HeaderNav, NotificationTest },
    };
</script>

<style src="@luxdamore/vue-cursor-fx/dist/CursorFx.css"></style>
