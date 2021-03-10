<template>

    <b-field :label="label"
             :labelPosition="labelPosition">

        <b-timepicker
                rounded
                v-model="content_value"
                :placeholder="placeholder"
                icon="clock"
                @input="emitOnInput"
                :enable-seconds="enableSeconds"
                :hour-format="hourFormat"
                :locale="locale">
        </b-timepicker>
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
                hourFormat: undefined, // Browser locale
                content_value: null,
                enableSeconds: false,
                locale: undefined // Browser locale

            };

            return obj;
        },

        created() {

        },
        watch: {
            content: function (newVal, oldVal) {
                if(newVal)
                {
                    newVal = '2020-11-04 '+newVal;
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
                this.content_value = '2020-11-04 '+this.content_value;
                this.content_value = new Date(Date.parse(this.content_value));
            }
        },
        methods: {
            //----------------------------------------------------
            emitOnInput: function (data) {
                let formatted_value = Vaah.formatTime(data);
                this.$emit('input', formatted_value);
            },
            //----------------------------------------------------
            dateFormat: function (data) {
                let val = Vaah.formatTime(data);
                return val;
            }
            //----------------------------------------------------
        },
    }
</script>
