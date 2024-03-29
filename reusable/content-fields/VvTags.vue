<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-taginput
                v-model="content_value"
                :data="data"
                autocomplete
                :allow-new="true"
                :field="display_column"
                :icon="icon"
                @add="onSelect"
                @remove="onSelect"
                :placeholder="placeholder"
                @typing="getAsyncData"
                @focus="getAsyncData('')"
                :open-on-focus="open_on_focus"
                :before-adding="doesItemExist"
        >
            <template slot-scope="props">
                <div class="media">
                    <div class="media-content">
                       <span v-if="props.option && props.option[display_column]">
                            {{ props.option[display_column] }}
                            <small v-if="props.option[unique_column]">
                                <br>
                                <b> {{unique_column.toUpperCase()}}: {{ props.option[unique_column] }}</b>
                            </small>
                        </span>

                    </div>
                </div>
            </template>

            <template slot="empty">
                <span v-if="isFetching">Searching...</span>
                <span v-else>No results found</span>
            </template>
        </b-taginput>
    </b-field>


</template>

<script>

    import debounce from 'lodash/debounce'

    export default {
        props:{
            content: {
                type: Array|Object,
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
                default: 'Type ...',
            },
            icon: {
                type: String,
                default: "plus"
            },
            ajax_url:{
                type: String,
                default: null
            },
            display_column:{
                type: String,
                default: 'name'
            },
            unique_column:{
                type: String,
                default: 'email'
            },
            open_on_focus: {
                type: Boolean,
                default: true
            }
        },
        data()
        {
            let obj = {
                data: [],
                content_value: null,
                isFetching: false
            };

            return obj;
        },

        created() {

        },
        watch: {
            content: function(newContent) {
                if (newContent.length < 1) {
                    this.content_value = null;
                }
            }
        },
        mounted() {
            //----------------------------------------------------
            if(typeof this.content == 'array'
                || typeof this.content == 'object'){
                this.content_value = this.content;
            }else{
                this.content_value = [];
                this.content_value[0] = this.content;
            }
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            getAsyncData: debounce(function (text) {
                if (!this.ajax_url) {
                    this.data = [];
                    return
                }

                let self = this;
                this.data = [];
                this.isFetching = true;

                let url = this.ajax_url;
                url += text;

                this.axios.get(url).then((response) => {
                    response.data.forEach((item) => this.data.push(item));
                    self.isFetching = false;
                });

            }, 500),

            doesItemExist(item) {
                let self = this;

                if (!this.content_value) return true;

                let add = this.content_value.find(function (el) {
                    if (item instanceof Object)
                        return el[self.unique_column] === item[self.unique_column];

                    return el[self.unique_column] === item;

                });

                if (!add) {
                    return true;
                }

            },
            //----------------------------------------------------
            onSelect: function () {
                this.$emit('input', this.content_value);
            },
            //----------------------------------------------------
        },
    }
</script>
