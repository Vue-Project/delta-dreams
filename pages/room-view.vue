<template>
    <div class="row px-3">
        <div class="col-md-12 py-4">
            <UnitStatus />
        </div>
    </div>
</template>

<script>
    import UnitStatus from '../components/RoomView/UnitsStatus.vue';

    export default {
        name: 'RoomViewPage',
        layout: 'main',
        components: {
            UnitStatus,
        },
    };
</script>
