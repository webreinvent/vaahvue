<template>

    <div>
        <h5 class="title is-5">Address</h5>
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

                list:{
                    "address_line_1": {
                        name: "Address Line 1",
                        type: 'text',
                        maxlength: 50,
                        content: null
                    },
                    "address_line_2":{
                        name: "Address Line 2",
                        type: 'text',
                        maxlength: 50,
                        content: null
                    },
                    "landmark":{
                        name: "Landmark",
                        type: 'text',
                        maxlength: 50,
                        content: null
                    },
                    "city":{
                        name: "City",
                        type: 'text',
                        maxlength: 50,
                        content: null
                    },
                    "state":{
                        name: "State",
                        type: 'text',
                        maxlength: 50,
                        content: null
                    },
                    "country":{
                        name: "Country",
                        type: 'text',
                        maxlength: 20,
                        content: null
                    },
                    "zip_code": {
                        name: "Zip Code",
                        type: 'text',
                        maxlength: 20,
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
                        "address_line_1": {
                            name: "Address Line 1",
                            type: 'text',
                            maxlength: 50,
                            content: null
                        },
                        "address_line_2":{
                            name: "Address Line 2",
                            type: 'text',
                            maxlength: 50,
                            content: null
                        },
                        "landmark":{
                            name: "Landmark",
                            type: 'text',
                            maxlength: 50,
                            content: null
                        },
                        "city":{
                            name: "City",
                            type: 'text',
                            maxlength: 50,
                            content: null
                        },
                        "state":{
                            name: "State",
                            type: 'text',
                            maxlength: 50,
                            content: null
                        },
                        "country":{
                            name: "Country",
                            type: 'text',
                            maxlength: 20,
                            content: null
                        },
                        "zip_code": {
                            name: "Zip Code",
                            type: 'text',
                            maxlength: 20,
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

