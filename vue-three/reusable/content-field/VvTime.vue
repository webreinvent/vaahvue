<template>

    <div>
        <Calendar v-model="time"  hourFormat="12" timeOnly />
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

const time = ref()

onMounted(() => {
    time.value = props.content;
})

watch(time, async (newTime, oldTime) => {
    emit('onInput', moment(newTime).format('hh:mm A'));
})

</script>

<style scoped>



</style>
