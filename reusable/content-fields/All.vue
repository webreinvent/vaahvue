<template>
    <div v-if="field_slug">

        <template v-if="field_slug === 'text'">
            <vv-text :content="value"
                     :type="type"
                     :size="size"
                     :class="custom_class"
                     :label="label"
                     :labelPosition="labelPosition"
                     :placeholder="placeholder"
                     :ref="field_slug"
                     @input="emitOnInput"
                     @onChange="emitOnChange"
                     @onBlur="emitOnBlur"
                     @onFocus="emitOnFocus" >
            </vv-text>
        </template>

        <template v-if="field_slug === 'editor'">
            <vv-editor :content="value"
                     :size="size"
                     :class="custom_class"
                     :label="label"
                     :labelPosition="labelPosition"
                     :placeholder="placeholder"
                     :ref="field_slug"
                     @input="emitOnInput"
                     @onChange="emitOnChange"
                     @onBlur="emitOnBlur"
                     @onFocus="emitOnFocus" >
            </vv-editor>
        </template>

        <template v-if="field_slug === 'slug'">
            <vv-slug :content="value"
                     :type="type"
                     :size="size"
                     :class="custom_class"
                     :label="label"
                     :labelPosition="labelPosition"
                     :placeholder="placeholder"
                     :ref="field_slug"
                     @input="emitOnInput"
                     @onChange="emitOnChange"
                     @onBlur="emitOnBlur"
                     @onFocus="emitOnFocus" >
            </vv-slug>
        </template>


        <template v-if="field_slug === 'seo-title'">
            <vv-slug :content="value"
                     :type="type"
                     :size="size"
                     :class="custom_class"
                     :label="label"
                     :labelPosition="labelPosition"
                     :placeholder="placeholder"
                     :ref="field_slug"
                     @input="emitOnInput"
                     @onChange="emitOnChange"
                     @onBlur="emitOnBlur"
                     @onFocus="emitOnFocus" >
            </vv-slug>
        </template>


    </div>
</template>

<script>
import VvAddress from "./VvAddress";
import VvBoolean from "./VvBoolean";
import VvCurrencyCode from "./VvCurrencyCode";
import VvDate from "./VvDate";
import VvDateTime from "./VvDateTime";
import VvEditor from "./VvEditor";
import VvEmail from "./VvEmail";
import VvFacebookCard from "./VvFacebookCard";
import VvImage from './VvImage';
import VvImageGroup from "./VvImageGroup";
import VvJson from "./VvJson";
import VvList from "./VvList";
import VvMarkdown from "./VvMarkdown";
import VvMedia from "./VvMedia";
import VvNumber from "./VvNumber";
import VvPassword from "./VvPassword";
import VvPhoneNumber from "./VvPhoneNumber";
import VvPrice from "./VvPrice";
import VvRelation from "./VvRelation";
import VvSEOMetaDescription from "./VvSEOMetaDescription";
import VvSEOMetaKeyword from "./VvSEOMetaKeyword";
import VvSEOTitle from "./VvSEOTitle";
import VvSlug from "./VvSlug";
import VvTags from "./VvTags";
import VvText from "./VvText";
import VvTextarea from "./VvTextarea";
import VvTime from "./VvTime";
import VvTitle from "./VvTitle";
import VvTwitterCard from "./VvTwitterCard";
import VvUUID from "./VvUUID";
import VvVisualEditor from "./VvVisualEditor";



export default {
    props: {
        field_type: {
            type: Object,
            default: null,
        },
        field_slug: {
            type: String,
            default: null,
        },
        value: {
            type: String|Number|Array|Object,
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

    },
    components:{
        VvAddress, VvBoolean, VvCurrencyCode, VvDate, VvDateTime,
        VvEditor, VvEmail, VvFacebookCard, VvImage, VvImageGroup,
        VvJson, VvList, VvMarkdown, VvMedia, VvNumber, VvPassword, VvPhoneNumber,
        VvPrice, VvRelation, VvSEOMetaDescription, VvSEOMetaKeyword, VvSEOTitle,
        VvSlug, VvTags, VvText, VvTextarea, VvTime, VvTitle, VvTwitterCard, VvUUID,
        VvVisualEditor,
    },
    data()
    {
        let obj = {



        };

        return obj;
    },

    created() {

    },
    watch: {
    },
    mounted() {
        //----------------------------------------------------
        //----------------------------------------------------
    },
    methods: {
        //----------------------------------------------------
        emitOnInput: function (data) {
            console.log('emitted data--->', data);
            this.$emit('input', data);
        },
        //----------------------------------------------------
        emitOnChange: function (data) {
            this.$emit('onChange', data);
        },
        //----------------------------------------------------
        emitOnBlur: function (data) {
            this.$emit('onBlur', data);
        },
        //----------------------------------------------------
        emitOnFocus: function (data) {
            this.$emit('onFocus', data);
        },
        //----------------------------------------------------
        //----------------------------------------------------
    },
}


</script>

