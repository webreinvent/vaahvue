<template>

    <div>
        <h5 class="title is-5">SEO Meta Tags</h5>
        <b-field  v-for="(item, index) in list"
                  :label="list[index].name"
                  :message="list[index].message"
                  :key="index"
                  :labelPosition="labelPosition" >
            <b-input :type="list[index].type"
                     v-model="list[index].content"
                     :maxlength="list[index].maxlength"
                     :size="size"
                     :class="custom_class"
                     :placeholder="list[index].name"
                     @input="emitOnInput"
            ></b-input>
        </b-field>
    </div>

</template>

<script>

    export default {
        props:{
            content: {
                type: Object,
                default: function () {
                    return {}
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

                list: {
                    "seo_title":{
                        name: "SEO Title",
                        type: 'text',
                        maxlength: 70,
                        content: null
                    },
                    "seo_description":{
                        name: "SEO Meta Description",
                        type: 'textarea',
                        message: "Description of content (maximum 200 characters)",
                        maxlength: 200,
                        content: null
                    },
                    "seo_keywords":{
                        name: "SEO Meta Keywords",
                        type: 'textarea',
                        maxlength: 200,
                        content: null
                    }
                },

            };

            return obj;
        },

        created() {

        },
        watch: {
            content(to, from) {
                this.list = to;
            },
        },
        mounted() {
            //----------------------------------------------------
            if(this.content)
            {
                this.list = this.content;
            }
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            emitOnInput: function () {
                this.$emit('input', this.list);
            },
            //----------------------------------------------------
        },
    }
</script>

