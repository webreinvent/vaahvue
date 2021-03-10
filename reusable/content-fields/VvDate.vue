<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-datepicker
            v-model="content_value"
            :placeholder="placeholder"
            @input="emitOnInput"
            :date-formatter="dateFormat"
            editable>
        </b-datepicker>
    </b-field>


</template>

<script>

    import {VaahHelper as Vaah} from "../../helpers/VaahHelper";

    export default {
        props:{
            content: {
                type: String,
                default: null
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
                default: "Type or select a date..."
            },
            icon: {
                type: String,
                default: "calendar-alt"
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
                if(newVal)
                {
                    newVal.toString();
                    this.content_value = new Date(Date.parse(newVal));
                }
            }
        },
        mounted() {
            //----------------------------------------------------
            this.content_value = this.content;
            //----------------------------------------------------
            if(this.content_value)
            {
                this.content_value.toString();
                this.content_value = new Date(Date.parse(this.content_value));
            }
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            emitOnInput: function (data) {
                let formatted_value = Vaah.formatDate(data);
                this.$emit('input', formatted_value);
            },
            //----------------------------------------------------
            dateFormat: function (data) {
                let val = Vaah.formatDate(data);
                return val;
            }
            //----------------------------------------------------
        },
    }
</script>
