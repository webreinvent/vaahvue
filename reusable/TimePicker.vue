<template>

    <div >
        <b-timepicker
            v-model="selected"
            :placeholder="placeholder"
            :icon="icon"
            :disabled="disabled"
            :min-time="min_time_value"
            @input="onSelect"
            hour-format="12"
            :time-formatter="timeFormat"
            editable>
        </b-timepicker>
    </div>


</template>

<script>
    import {VaahHelper as Vaah} from "../../vaahvue/helpers/VaahHelper";

    export default {
        props: {
            icon: {
                type: String,
                default: "calendar-alt"
            },
            selected_value: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: "Type or select a time..."
            },
            disabled: {
                type: Boolean,
                default: false
            },
            min_time: {
                type: String,
                default: null
            },
            time_format: {
                type: String,
                default: "hh:mm A"
            },
        },
        components:{

        },
        data()
        {
            let obj = {
                selected: null,
                min_time_value: null,
            };

            return obj;
        },
        created() {
        },
        mounted(){
            if(this.selected_value)
            {
                this.selected_value.toString();

                let val = '1970-08-08 '+this.selected_value;

                this.selected = new Date(Date.parse(val));

            }
            if(this.min_time)
            {
                this.min_time.toString();
                let min_val = '1970-08-08 '+this.min_time;
                this.min_time_value = new Date(Date.parse(min_val));
            }
        },
        computed: {
        },
        watch: {
            selected_value: function (newVal, oldVal) {
                if(newVal)
                {
                    newVal.toString();

                    let val = '1970-08-08 '+newVal;

                    this.selected = new Date(Date.parse(val));

                } else {
                    this.selected = null;
                }
            },
            min_time: function (newVal, oldVal) {
                if(newVal)
                {
                    newVal.toString();

                    let val = '1970-08-08 '+newVal;

                    this.min_time_value = new Date(Date.parse(val));

                } else {
                    this.min_time_value = null;
                }
            }
        },
        methods: {
            //---------------------------------------------------------------------

            //---------------------------------------------------------------------
            onSelect: function (selected_time) {
                let val = Vaah.formatTime(selected_time);
                this.$emit('blur', val);
                this.$emit('input', val);
                this.$emit('onSelect', val);
            },
            //---------------------------------------------------------------------
            timeFormat: function (data) {
                let val = Vaah.formatTime(data,this.time_format);
                return val;
            }
            //---------------------------------------------------------------------
        }
    }
</script>

