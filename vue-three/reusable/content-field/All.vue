<template>

    <div v-if="props.field_slug">

        <template v-if="props.field_slug === 'text' || props.field_slug === 'slug'
        || props.field_slug === 'title' ">
            <vv-text :content="props.modelValue"
                     :type="props.type"
                     :size="props.size"
                     :class="props.custom_class"
                     :label="props.label"
                     :labelPosition="props.labelPosition"
                     :placeholder="props.placeholder"
                     :ref="props.field_slug"
                    @onInput="onInput">
            </vv-text>
        </template>

        <template v-if="props.field_slug === 'textarea'">
            <vv-textarea :content="props.modelValue"
                     :type="props.type"
                     :size="props.size"
                     :class="props.custom_class"
                     :label="props.label"
                     :labelPosition="props.labelPosition"
                     :placeholder="props.placeholder"
                     :ref="props.field_slug"
                    @onInput="onInput">
            </vv-textarea>
        </template>

        <template v-else-if="props.field_slug === 'editor'">

            <vv-text-editor
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-text-editor>

        </template>

        <template v-else-if="props.field_slug === 'select' && meta">
            <vv-select
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-select>

        </template>

        <template v-else-if="props.field_slug === 'date'">
            <vv-date
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-date>

        </template>

        <template v-else-if="props.field_slug === 'time'">
            <vv-time
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-time>

        </template>

        <template v-else-if="props.field_slug === 'date-time'">
            <vv-date-time
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-date-time>

        </template>

        <template v-else-if="props.field_slug === 'tags'">
            <vv-tags
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-tags>

        </template>

        <template v-else-if="props.field_slug === 'seo-meta-tags'">
            <vv-seo-meta-tags
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-seo-meta-tags>
        </template>

        <template v-else-if="props.field_slug === 'twitter-card'">
            <vv-twitter-card
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-twitter-card>
        </template>

        <template v-else-if="props.field_slug === 'facebook-card'">
            <vv-facebook-card
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-facebook-card>
        </template>

        <template v-else-if="props.field_slug === 'image'">
            <vv-image
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-image>
        </template>

        <template v-else-if="props.field_slug === 'json'">
            <vv-json
                :content="props.modelValue"
                :type="props.type"
                :size="props.size"
                :options="meta.option"
                :class="props.custom_class"
                :label="props.label"
                :labelPosition="props.labelPosition"
                :placeholder="props.placeholder"
                :ref="props.field_slug"
                @onInput="onInput"
            >
            </vv-json>
        </template>

    </div>

</template>

<script setup>

import VvText from './VvText.vue'
import VvDate from './VvDate.vue'
import VvTime from './VvTime.vue'
import VvTags from './VvTags.vue'
import VvJson from './VvJson.vue'
import VvImage from './VvImage.vue'
import VvSelect from './VvSelect.vue'
import VvDateTime from './VvDateTime.vue'
import VvTextarea from './VvTextarea.vue'
import VvTextEditor from './VvTextEditor.vue'
import VvSeoMetaTags from './VvSeoMetaTags.vue'
import VvTwitterCard from './VvTwitterCard.vue'
import VvFacebookCard from './VvFacebookCard.vue'

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    field_type: {
        type: Object,
        default: null,
    },
    field_slug: {
        type: String,
        default: null,
    },
    modelValue: {
        type:  [String, Object],
        default: null,
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
    app_url:{
        type: String,
        default: null
    },
    upload_url: {
        type: String,
        default: null
    },
    currency_options:{
        type: Array,
        default: null
    },
    ajax_url:{
        type: String,
        default: null
    },
    display_column:{
        type: String,
        default: 'name'
    },
    unique_column:{
        type: String,
        default: 'email'
    },
    is_simple: {
        type: Boolean,
        default: false,
    },
    meta:{
        type: Object,
        default: null
    }
})


const onInput = (value) => {
    emit('update:modelValue', value)
}
</script>

<style scoped>

</style>
