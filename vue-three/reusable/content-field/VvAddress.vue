<template>

    <div>
        <div v-for="(field, index) in content_value.fields" :key="index">
            <InputText
                v-if="field.type === 'text'"
                v-model="field.content"
                type="text"
                :placeholder="field.name"
                class="p-inputtext-sm mb-1"
            />
            <small
                v-if="field.message">
                {{ field.message }}
            </small>
            <Textarea
                v-if="field.type === 'textarea'"
                v-model="field.content"
                :placeholder="field.name"
                autoResize
                rows="5" cols="30"
                class="p-inputtext-sm"
            />
        </div>

    </div>

</template>

<script setup>
import { ref, watch, computed, reactive } from 'vue'
const emit = defineEmits(["onInput"]);
const props = defineProps({
    content: {
        type: Object,
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

const field_list = ref({
    "address_line_1": {
        name: "Address Line 1",
        type: 'text',
        maxlength: 50,
        content: null
    },
    "address_line_2":{
        name: "Address Line 2",
        type: 'text',
        maxlength: 50,
        content: null
    },
    "landmark":{
        name: "Landmark",
        type: 'text',
        maxlength: 50,
        content: null
    },
    "city":{
        name: "City",
        type: 'text',
        maxlength: 50,
        content: null
    },
    "state":{
        name: "State",
        type: 'text',
        maxlength: 50,
        content: null
    },
    "country":{
        name: "Country",
        type: 'text',
        maxlength: 20,
        content: null
    },
    "zip_code": {
        name: "Zip Code",
        type: 'text',
        maxlength: 20,
        content: null
    }
});

const content_value = reactive({
    fields : props.content ? props.content : field_list.value
})

watch(content_value, (newValue, oldValue) => {
    emit('onInput', newValue.fields)
})
</script>

<style scoped>



</style>
