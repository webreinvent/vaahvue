<template>

    <div>
        <Calendar v-model="content_value"
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
        const content = props.content;
        const content_value = new Date(Date.parse(content.toString()));
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
