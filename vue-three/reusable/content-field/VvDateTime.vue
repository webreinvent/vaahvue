<template>

    <div>
        <Calendar v-model="date_time" dateFormat="dd/mm/yy"  showTime hourFormat="12" showIcon />
    </div>

</template>

<script setup>
import {computed, ref, onMounted,  watch } from 'vue';
import moment from 'moment/moment';
const emit = defineEmits(["onInput"]);
const props = defineProps({
    content: {
        type: String,
        default: function () {
            return null
        }
    },
    type: {
        type: String,
        default: null,
    },
    size: {
        type: String,
        default: null,
    },
    custom_class: {
        type: String,
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
    labelPosition: {
        type: String,
        default: null,
    },
    placeholder: {
        type: String,
        default: null,
    },
})

const date_time = ref()

onMounted(() => {
    date_time.value = props.content;
})

watch(date_time, async (newDateTime, oldDateTime) => {

    emit('onInput', moment(newDateTime).format('DD/MM/YYYY hh:mm A'));
})

</script>

<style scoped>



</style>
