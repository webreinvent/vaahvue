<template>

    <div>
        <div v-for="(field, index) in content_value.fields" :key="index">
            <div v-if="field.type === 'text'">
                <small v-if="field.name"
                       class="line-height-1"
                >
                    {{ field.name }}
                </small>
                <InputText
                    v-model="field.content"
                    type="text"
                    :placeholder="field.name"
                    class="p-inputtext-sm"
                    :maxlength="field.maxlength"
                />
                <div v-if="field.maxlength"
                      class="flex justify-content-between line-height-1 mt-1 gap-2"
                      style="font-size: x-small"
                >
                    <div>
                        <span v-if="field.message && field.name === 'og:image'"
                               class="line-height-2 font-medium"
                        >
                            {{ field.message }}
                        </span>
                    </div>
                    <div>
                        <span v-if="field.content">{{ field.content.length }}</span>
                        <span v-else>0</span>/{{ field.maxlength }}
                    </div>
                </div>
            </div>
            <div v-if="field.type === 'textarea'">
                <small v-if="field.name"
                       class="line-height-1"
                >
                    {{ field.name }}
                </small>
                <Textarea
                    v-model="field.content"
                    :placeholder="field.name"
                    autoResize
                    rows="5" cols="30"
                    class="p-inputtext-sm"
                    :maxlength="field.maxlength"
                />
                <span v-if="field.maxlength"
                      class="flex justify-content-end line-height-1"
                      style="font-size: x-small"
                >
                    <span v-if="field.content">{{ field.content.length }}</span>
                    <span v-else>0</span>/{{ field.maxlength }}
                </span>
            </div>
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
    "og_title":{
        name: "og:title",
        type: 'text',
        message: "Title of content (max 70 characters).",
        maxlength: 70,
        content: null
    },
    "og_description":{
        name: "og:description",
        type: 'textarea',
        message: "Description of content (maximum 200 characters)",
        maxlength: 200,
        content: null
    },
    "og_image":{
        name: "og:image",
        type: 'text',
        message: "URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported.",
        maxlength: 200,
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
