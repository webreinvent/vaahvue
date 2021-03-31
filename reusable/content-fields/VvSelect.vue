<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-select :placeholder="placeholder"
                  v-model="content"
                  :class="custom_class"
                  :size="size"
                  @input="emitOnInput"
                  :multiple="is_multiple"
                  expanded>
            <option value="">
                Select an Option
            </option>
            <option v-for="(option,index) in options"
                    :value="option"
                    :key="index">
                {{option}}
            </option>
        </b-select>
    </b-field>


</template>

<script>

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
            options: {
                type: Array,
                default: null,
            },
            is_multiple: {
                type: Boolean,
                default: false,
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

