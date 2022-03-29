<template>

    <div>
        <h5 class="title is-5">Facebook Card</h5>
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
                    "og_title":{
                        name: "og:title",
                        type: 'text',
                        message: "Title of content (max 70 characters).",
                        maxlength: 70,
                        content: null
                    },
                    "og_description":{
                        name: "og:description",
                        type: 'textarea',
                        message: "Description of content (maximum 200 characters)",
                        maxlength: 200,
                        content: null
                    },
                    "og_image":{
                        name: "og:image",
                        type: 'text',
                        message: "URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported.",
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
            content(newVal, oldVal) {

                if(!newVal){
                    this.list = {
                        "og_title":{
                            name: "og:title",
                            type: 'text',
                            message: "Title of content (max 70 characters).",
                            maxlength: 70,
                            content: null
                        },
                        "og_description":{
                            name: "og:description",
                            type: 'textarea',
                            message: "Description of content (maximum 200 characters)",
                            maxlength: 200,
                            content: null
                        },
                        "og_image":{
                            name: "og:image",
                            type: 'text',
                            message: "URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported.",
                            maxlength: 200,
                            content: null
                        }
                    };
                }else{
                    this.list = newVal;
                }

            },
        },
        mounted() {
            //----------------------------------------------------
            if(this.content)
            {
                this.list = this.content;
            }
            console.log('--->this.list', this.list);
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

