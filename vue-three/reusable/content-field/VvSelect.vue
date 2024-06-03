<template>

    <div>
        <Dropdown
            v-model="content_value"
            :options="props.options"
            :optionLabel="props.optionLabel"
            :placeholder="props.placeholder"
            class="w-full is-small"
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
    optionLabel: {
        type: String,
        default:null
    },
    labelPosition: {
        type: String,
        default: null,
    },
    placeholder: {
        type: String,
        default: null,
    },
    options: {
        type: Array,
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
        emit('onInput', newValue)
    }
})
</script>

<style scoped>



</style>
