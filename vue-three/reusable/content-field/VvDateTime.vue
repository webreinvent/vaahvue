<template>

    <div>
        <Calendar v-model="content_value"
                  dateFormat="dd/mm/yy"
                  showTime
                  hourFormat="12"
                  showIcon
                  class="w-full p-inputgroup"
                  inputClass="p-inputtext-sm"
                  :placeholder="props.placeholder"
                  :pt="{
                      dropdownButton: {
                          root: 'p-button-sm'
                      }
                  }"
        />
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

const content_value = computed({
    // getter
    get() {
        let content_value = null;
        if(props.content){
            const content = props.content;
            content_value = new Date(Date.parse(content.toString()));
        }
        return content_value;

    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        emit('onInput', newValue);
    }
})

</script>

<style scoped>



</style>
