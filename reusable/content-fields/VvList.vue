<template>

    <b-field :label="label"
             :labelPosition="labelPosition">

        <b-field v-if="contents.length > 0" >
            <b-field v-for="(content_item, index) in contents" :key="index">
                <b-input type="text"
                         @blur="emitOnInput"
                         v-model="contents[index]">
                </b-input>
                <p class="control">
                    <b-button @click="removeNewContentItem(index)"
                              icon-left="trash"></b-button>
                </p>
            </b-field>

        </b-field>

        <b-field >
            <b-input type="text"
                     v-model="item"
                     :size="size"
                     :class="custom_class"
                     placeholder="Add New Item"
                     @keyup.enter.native="addNewContentItem"
            ></b-input>
            <p class="control">
                <b-button @click="addNewContentItem()"
                          icon-left="plus"></b-button>
            </p>

        </b-field>

    </b-field>


</template>

<script>

    export default {
        props:{
            content: {
                type: Array,
                default: function () {
                    return []
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

                item:null,
                contents:[],

            };

            return obj;
        },

        created() {

        },
        watch: {
            content(newVal, oldVal) {
                if(newVal){
                    this.contents = newVal;
                }else{
                    this.contents=[];
                }
            },
        },
        mounted() {
            //----------------------------------------------------
            if(this.content)
            {
                this.contents = this.content;
            }
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            addNewContentItem: function()
            {
                this.contents.push(this.item);
                this.item = null;
                this.emitOnInput();
            },
            //----------------------------------------------------
            removeNewContentItem: function(content_item_index)
            {
                this.contents.splice(content_item_index, 1);
                this.emitOnInput();
            },
            //----------------------------------------------------
            emitOnInput: function () {
                this.$emit('input', this.contents);
            },
            //----------------------------------------------------
        },
    }
</script>

