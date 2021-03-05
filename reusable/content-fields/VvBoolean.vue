<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-switch v-model="switch_value"
                  :true-value="1"
                  :false-value="0"
                  @input="emitOnInput"
                  type="is-success">
        </b-switch>
    </b-field>


</template>

<script>

    export default {
        props:{
            content: {
                type: Number,
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

                switch_value: null,

            };

            return obj;
        },

        created() {

        },
        watch: {
        },
        mounted() {
            //----------------------------------------------------
            this.switch_value = this.content;
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

