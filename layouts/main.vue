<template>
    <div>
        <HeaderNav></HeaderNav>
        <Nuxt />
        <NotificationTest />
    </div>
</template>

<script>
    import HeaderNav from '../components/Helper/partial/HeaderNav.vue';
    import NotificationTest from '../components/Helper/partial/Notification.vue';

    export default {
        components: { HeaderNav, NotificationTest },
    };
</script>
