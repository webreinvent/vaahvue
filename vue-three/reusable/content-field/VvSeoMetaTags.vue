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
                <span v-if="field.maxlength"
                      class="flex justify-content-end line-height-1 mt-1"
                      style="font-size: x-small"
                >
                    {{ field.content.length }}/{{ field.maxlength }}
                </span>
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
                    {{ field.content.length }}/{{ field.maxlength }}
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

const field_list = ref({ "seo_title":{
        name: "SEO Title",
        type: 'text',
        maxlength: 70,
        content: null
    },
    "seo_description":{
        name: "SEO Meta Description",
        type: 'textarea',
        message: "Description of content",
        maxlength: 200,
        content: null
    },
    "seo_keywords":{
        name: "SEO Meta Keywords",
        type: 'textarea',
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
