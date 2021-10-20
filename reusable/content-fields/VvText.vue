<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-input type="text"
                 :value="content"
                 :size="size"
                 :class="custom_class"
                 :placeholder="placeholder"
                 @input="emitOnInput"
        ></b-input>
    </b-field>


</template>

<script>

    export default {
        props:{
            content: {
                type: String|Number,
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
                this.$emit('input', data);
            },
            //----------------------------------------------------
        },
    }
</script>

