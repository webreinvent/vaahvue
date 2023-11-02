<template>

    <div>
        <Calendar v-model="content_value"
                  dateFormat="dd/mm/yy"
                  class="w-full"
                  :pt="{
                     input: 'p-inputtext-sm'
                  }"
        />
    </div>

</template>

<script setup>
import { computed } from 'vue';
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

const content_value = computed({
    // getter
    get() {
        return props.content;
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        emit('onInput', moment(newValue).format('DD/MM/YYYY'));
    }
})
</script>

<style scoped>



</style>
