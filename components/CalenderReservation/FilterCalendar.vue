<template>
    <div>
        <HeaderCalender ref="headerCalender" @date-selected="handleDateSelected" @show-all-resources="$emit('show-all-resources')" @show-building-resources="$emit('show-building-resources', $event)" :statistics="statistics" :buildingNames="buildingNames" />
        <span class="badge bg-primary bg-glow units-count">All Units:{{ allUnits }}</span>
    </div>
</template>

<script>
    import HeaderCalender from './HeaderCalender.vue';

    export default {
        name: 'FilterCalendar',
        components: {
            HeaderCalender,
        },
        props: {
            statistics: {
                type: Object,
                required: true,
            },
            buildingNames: {
                type: Array,
                required: true,
            },
            allUnits: {
                type: Number,
                required: true,
            },
        },
        methods: {
            handleDateSelected(selectedDate) {
                this.$emit('date-selected', selectedDate);
            },
        },
    };
</script>
