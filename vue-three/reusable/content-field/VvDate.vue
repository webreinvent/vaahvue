<template>

    <div>
        <Calendar v-model="content_value.date"
                  dateFormat="dd/mm/yy"
                  class="w-full p-inputgroup"
                  inputClass="p-inputtext-sm"
                  :placeholder="props.placeholder"
                  showIcon
                  :pt="{
                      dropdownButton: {
                          root: 'p-button-sm'
                      }
                  }"
        />
    </div>

</template>

<script setup>
import {computed, reactive, watch} from 'vue';
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
    date : props.content ?  new Date(Date.parse(props.content.toString())) : null
})

watch(content_value, (newValue, oldValue) => {
    emit('onInput', newValue.date);
})

</script>

<style scoped>



</style>
