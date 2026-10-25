<template>
    <div class="row px-3">
        <div class="col-md-12 py-4">
            <UnitsData />
        </div>
    </div>
</template>
<style scoped></style>

<script>
    import UnitsData from '../components/ReservationData/UnitsData.vue';

    export default {
        name: 'RoomViewPage',
        layout: 'main',
        components: {
            UnitsData,
        },
    };
</script>
