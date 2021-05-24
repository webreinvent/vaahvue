<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-taginput
                v-model="content_value"
                :data="data"
                autocomplete
                :field="display_column"
                :icon="icon"
                @add="onSelect"
                @remove="onSelect"
                :placeholder="placeholder"
                @typing="getAsyncData"
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
        },
        mounted() {
            //----------------------------------------------------
            this.content_value = this.content;
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            getAsyncData: debounce(function (text) {
                if (!text.length) {
                    this.data = [];
                    return
                }

                this.$emit('input', null);

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

                if (!this.content_value) return true;

                const add = this.content_value.find(({ id }) => id === item.id) ? false : true;

                return add;

            },
            //----------------------------------------------------
            onSelect: function () {
                this.$emit('input', this.content_value);
            },
            //----------------------------------------------------
        },
    }
</script>
