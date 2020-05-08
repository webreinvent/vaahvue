<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-input type="text"
                 ref="VvText"
                 :value="slug"
                 :type="type"
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

                slug: null

            };

            return obj;
        },

        created() {

        },
        watch: {
            content: function (newVal, oldVal) {
                this.slug = this.$vaah.strToSlug(newVal);
            }
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
