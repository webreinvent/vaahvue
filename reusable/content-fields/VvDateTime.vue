<template>

    <b-field :label="label"
             :labelPosition="labelPosition">

        <b-datetimepicker
                rounded
                v-model="content_value"
                :placeholder="placeholder"
                @input="emitOnInput"
                icon="calendar"
                :locale="locale"
                :datepicker="{ showWeekNumber }"
                :timepicker="{ enableSeconds, hourFormat }"
                horizontal-time-picker>
        </b-datetimepicker>
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
                showWeekNumber: false,
                enableSeconds: false,
                hourFormat: undefined, // Browser locale
                locale: undefined // Browser locale

            };

            return obj;
        },

        created() {

        },
        watch: {
            value: function (newVal, oldVal) {
                if(newVal)
                {
                    newVal.toString();
                    this.selected = new Date(Date.parse(newVal));
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
                let formatted_value = Vaah.formatDateTime(data);
                this.$emit('input', formatted_value);
            },
            //----------------------------------------------------
            dateFormat: function (data) {
                let val = Vaah.formatDateTime(data);
                return val;
            }
            //----------------------------------------------------
        },
    }
</script>
