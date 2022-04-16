<template>

    <b-autocomplete
        expanded
        v-model="selected_string"
        :data="data"
        :disabled="is_disable"
        :placeholder="label"
        :field="display_column"
        :loading="isFetching"
        @typing="getAsyncData"
        :icon="icon"
        :open-on-focus="open_on_focus"
        @select="option => onSelect(option)">

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

    </b-autocomplete>

</template>
<script>

    import debounce from 'lodash/debounce'

    export default {
        props: {
            options: {
                type: Array|Object,
                default: null
            },
            selected_value:{
                type: String,
                default: null
            },
            label:{
                type: String,
                default: 'Search'
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
                default: 'id'
            },
            icon:{
                type: String,
                default: null,
            },
            open_on_focus: {
                type: Boolean,
                default: true
            },
            is_disable: {
                type: Boolean,
                default: false
            }
        },
        computed:{
        },
        watch: {

            selected_value: function (newValue, oldValue) {

                this.selected_string = newValue;

            },

        },
        mounted() {
            if(this.options)
            {
                this.data = this.options;
            }
            this.selected_string = this.selected_value;
        },
        data() {
            return {
                data: [],
                selected: null,
                selected_string: null,
                isFetching: false,
            }
        },

        methods: {
            // You have to install and import debounce to use it,
            // it's not mandatory though.
            getAsyncData: debounce(function (q) {
                if (!q.length) {
                    this.data = [];
                    return
                }
                let self = this;
                this.data = [];
                this.isFetching = true;

                let url = this.ajax_url+"?q="+q;

                let list;

                this.axios.get(url).then((response) => {
                    this.data = [];

                    list = response.data;

                    if(list.data && list.data.current_page)
                    {
                        list = list.data.data
                    }

                    list.forEach((item) => this.data.push(item));
                    self.isFetching = false;
                });

            }, 1000),
            //----------------------------------------------------
            onSelect: function (option) {
                if(!option) {
                    this.$emit('onSelect', null);
                    return;
                };

                this.selected = option;
                this.selected_string = option[this.display_column];
                this.$emit('onSelect', option);
            }
            //----------------------------------------------------
        }
    }


</script>
