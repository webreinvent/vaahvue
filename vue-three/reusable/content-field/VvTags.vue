<template>

    <div>
        <Chips v-model="content_value"
               separator=","
               :placeholder="props.placeholder"
               class="w-full is-small"
               :pt="{
                   container: {
                       class: 'p-inputtext-sm'
                   },
                   inputtoken: ({ props }) => ({
                       class: {
                           'py-1': props.modelValue && props.modelValue.length !== 0
                       }
                   })
               }"
        />
    </div>

</template>

<script setup>
import { computed } from 'vue'
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

const getPtData = (data) => {
    console.log(data);
    return true;
}

const content_value = computed({
    // getter
    get() {
        return props.content;
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        emit('onInput', newValue)
    }
})
</script>

<style scoped>



</style>
