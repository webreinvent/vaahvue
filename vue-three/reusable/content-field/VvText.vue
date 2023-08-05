<template>

    <div class="flex flex-column gap-2">
        <label>{{props.label}}</label>
        <InputText type="text" v-model="props.content" :placeholder="props.placeholder" />
    </div>

</template>

<script setup>
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
</script>

<style scoped>

</style>
