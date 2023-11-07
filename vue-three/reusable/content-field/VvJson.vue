<template>

    <div>
        <JsonEditorVue
            v-model="content_value"
            v-bind="{/* local props & attrs */}"
        />
    </div>

</template>

<script setup>
import { computed } from 'vue'
import JsonEditorVue from 'json-editor-vue'
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
        return props.content ? props.content : {} ;
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
