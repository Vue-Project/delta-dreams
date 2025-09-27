<template>
    <div>
        <HeaderNav></HeaderNav>
        <Nuxt />
        <NotificationTest />
    </div>
</template>

<script>
    import HeaderNav from '../components/layout/HeaderNav.vue';
    import NotificationTest from '../components/SiderbarContentEdit/Notification.vue';

    export default {
        components: { HeaderNav, NotificationTest },
    };
</script>
