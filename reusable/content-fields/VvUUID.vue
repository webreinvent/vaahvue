<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-input type="text"
                 :value="content_value"
                 expanded
                 :size="size"
                 :class="custom_class"
                 :placeholder="placeholder"
                 @input="emitOnInput"
        ></b-input>
        <p class="control">
            <b-button icon-left="sync-alt" @click="generateUuid()"></b-button>
        </p>
    </b-field>


</template>

<script>
    import { v4 as uuidv4 } from 'uuid';
    export default {
        props:{
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
        },
        data()
        {
            let obj = {

                content_value: null,

            };

            return obj;
        },

        created() {

        },
        watch: {
            content: function (newVal, oldVal) {
                this.content_value = newVal;
            }
        },
        mounted() {
            //----------------------------------------------------
            this.content_value = this.content;
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            generateUuid: function()
            {
                this.content_value = uuidv4();
                this.emitOnInput(this.content_value);
            },
            //----------------------------------------------------
            //----------------------------------------------------
            emitOnInput: function (data) {
                this.$emit('input', data);
            },
            //----------------------------------------------------
        },
    }
</script>

