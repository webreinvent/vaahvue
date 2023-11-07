<template>

    <div>
        <InputText
            v-model="content_value"
            :placeholder="props.placeholder"
            class="p-inputtext-sm"
            :class="{'p-invalid': !is_email_valid}"
        />
        <small class="text-red-700" v-if="!is_email_valid">Invalid Email.</small>
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

const is_email_valid = computed(() => {
      return /^[^@]+@\w+(\.\w+)+\w$/.test(props.content);
})
</script>

<style scoped>



</style>
