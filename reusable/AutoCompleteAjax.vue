<template>

    <b-autocomplete
        expanded
        v-model="selected_value"
        :data="data"
        :placeholder="label"
        :field="display_column"
        :loading="isFetching"
        @typing="getAsyncData"
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
            selected_value:{
                type: Object,
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
            }
        },
        computed:{
        },
        data() {
            return {
                data: [],
                selected: null,
                isFetching: false,
            }
        },
        mounted() {

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

                let url = this.ajax_url;
                let params = {
                    q: q
                };

                console.log('--->', params);

                this.axios.post(url, params).then((response) => {
                    this.data = [];

                    console.log('--->', response);

                    response.data.forEach((item) => this.data.push(item));
                    self.isFetching = false;
                });

            }, 1000),
            //----------------------------------------------------
            onSelect: function (option) {
                this.selected = option;
                this.$emit('onSelect', option);
            }
            //----------------------------------------------------
        }
    }


</script>
