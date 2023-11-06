<template>

    <div>
        <Calendar v-model="content_value.time"
                  hourFormat="12"
                  timeOnly
                  showIcon
                  :placeholder="props.placeholder"
                  class="w-full p-inputgroup"
                  inputClass="p-inputtext-sm"
                  :pt="{
                      dropdownButton: {
                          root: 'p-button-sm'
                      }
                  }"
        />
    </div>

</template>

<script setup>
import {computed, ref, onMounted, watch, reactive} from 'vue';
import moment from 'moment/moment';
const emit = defineEmits(["onInput"]);
const props = defineProps({
    content: {
        type: [String, Date],
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

const content_value = reactive({
    time : props.content ?  new Date(Date.parse(props.content.toString())) : null
})

watch(content_value, (newValue, oldValue) => {
    emit('onInput', newValue.time);
})

</script>

<style scoped>



</style>
