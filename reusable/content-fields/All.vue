<template>
    <div v-if="field_slug">

        <template v-if="field_slug === 'text' || field_slug === 'slug'
        || field_slug === 'title'
        ">
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

        <template v-else-if="field_slug === 'textarea'">
            <vv-textarea :content="value"
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
            </vv-textarea>
        </template>

        <template v-else-if="field_slug === 'number' || field_slug === 'phone-number'
         || field_slug === 'price'">
            <vv-number :content="value"
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
            </vv-number>
        </template>

        <template v-else-if="field_slug === 'boolean'">
            <vv-boolean :content="value"
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
            </vv-boolean>
        </template>




        <template v-else-if="field_slug === 'editor'">
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




        <template v-else-if="field_slug === 'date'">
            <vv-date :content="value"
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
            </vv-date>
        </template>

        <template v-else-if="field_slug === 'time'">
            <vv-time :content="value"
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
            </vv-time>
        </template>



        <template v-else-if="field_slug === 'date-time'">
            <vv-date-time :content="value"
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
            </vv-date-time>
        </template>


        <template v-else-if="field_slug === 'user'">
            <vv-auto-complete-users :content="value"
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
            </vv-auto-complete-users>
        </template>

        <template v-else-if="field_slug === 'email'">
            <vv-email :content="value"
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
            </vv-email>
        </template>

        <template v-else-if="field_slug === 'password'">
            <vv-password :content="value"
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
            </vv-password>
        </template>

        <template v-else-if="field_slug === 'uuid'">
            <vv-uuid :content="value"
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
            </vv-uuid>
        </template>


        <template v-else-if="field_slug === 'currency-code'">
            <vv-currency-code :content="value"
                     :size="size"
                     :class="custom_class"
                     :label="label"
                     :labelPosition="labelPosition"
                     :placeholder="placeholder"
                     :ref="field_slug"
                     :options="currency_options"
                     @input="emitOnInput"
                     @onChange="emitOnChange"
                     @onBlur="emitOnBlur"
                     @onFocus="emitOnFocus" >
            </vv-currency-code>
        </template>



        <template v-else-if="field_slug === 'list'">
            <vv-list :content="value"
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
            </vv-list>
        </template>

        <template v-else-if="field_slug === 'image'">
            <vv-image :content="value"
                      :size="size"
                      :class="custom_class"
                      :label="label"
                      :labelPosition="labelPosition"
                      :placeholder="placeholder"
                      :upload_url="upload_url"
                      :app_url="app_url"
                      @input="emitOnInput"
                      @onChange="emitOnChange"
                      @onBlur="emitOnBlur"
                      @onFocus="emitOnFocus" >
            </vv-image>
        </template>

        <template v-else-if="field_slug === 'media'">
            <vv-media :content="value"
                      :size="size"
                      :class="custom_class"
                      :label="label"
                      :labelPosition="labelPosition"
                      :placeholder="placeholder"
                      :upload_url="upload_url"
                      :app_url="app_url"
                      @input="emitOnInput"
                      @onChange="emitOnChange"
                      @onBlur="emitOnBlur"
                      @onFocus="emitOnFocus" >
            </vv-media>
        </template>

        <template v-else-if="field_slug === 'image-group'">
            <vv-image-group :content="value"
                     :size="size"
                     :class="custom_class"
                     :label="label"
                     :labelPosition="labelPosition"
                     :placeholder="placeholder"
                     :upload_url="upload_url"
                     :app_url="app_url"
                     @input="emitOnInput"
                     @onChange="emitOnChange"
                     @onBlur="emitOnBlur"
                     @onFocus="emitOnFocus" >
            </vv-image-group>
        </template>

        <template v-else-if="field_slug === 'phone-number'">
            <vv-phone-number :content="value"
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
            </vv-phone-number>
        </template>

        <template v-else-if="field_slug === 'address'">
            <vv-address :content="value"
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
            </vv-address>
        </template>


        <template v-else-if="field_slug === 'relation'">
            <vv-relation :content="value"
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
            </vv-relation>
        </template>

        <template v-else-if="field_slug === 'tags'">
            <vv-tags :content="value"
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
            </vv-tags>
        </template>

        <template v-else-if="field_slug === 'json'">
            <vv-json :content="value"
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
            </vv-json>
        </template>

        <template v-else-if="field_slug === 'seo-meta-tags'">
            <vv-seo-meta-tags :content="value"
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
            </vv-seo-meta-tags>
        </template>

        <template v-else-if="field_slug === 'twitter-card'">
            <vv-twitter-card :content="value"
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
            </vv-twitter-card>
        </template>

        <template v-else-if="field_slug === 'facebook-card'">
            <vv-facebook-card :content="value"
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
            </vv-facebook-card>
        </template>

        <template v-else>
            {{placeholder}}
        </template>

    </div>
</template>

<script>
import VvAutoCompleteUsers from "./VvAutoCompleteUsers";
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
import VvRelation from "./VvRelation";
import VvSeoMetaTags from "./VvSeoMetaTags";
import VvSlug from "./VvSlug";
import VvTags from "./VvTags";
import VvText from "./VvText";
import VvTextarea from "./VvTextarea";
import VvTime from "./VvTime";
import VvTitle from "./VvTitle";
import VvTwitterCard from "./VvTwitterCard";
import VvUuid from "./VvUuid";
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

    },
    components:{
        VvAddress, VvBoolean, VvCurrencyCode, VvDate, VvDateTime,
        VvEditor, VvEmail, VvFacebookCard, VvImage, VvImageGroup,
        VvJson, VvList, VvMarkdown, VvMedia, VvNumber, VvPassword, VvPhoneNumber,
        VvRelation, VvSeoMetaTags,
        VvSlug, VvTags, VvText, VvTextarea, VvTime, VvTitle, VvTwitterCard, VvUuid,
        VvVisualEditor,VvAutoCompleteUsers
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

