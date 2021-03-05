<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <b-autocomplete
                expanded
                v-model="content_value"
                :data="data"
                :placeholder="placeholder"
                field="email"
                @input="emitOnInput"
                :loading="isFetching"
                @typing="getAsyncData">
            <template slot-scope="props">
                <div class="media">
                    <div class="media-content">
                                <span v-if="props.option && props.option.name">
                                    {{ props.option.name }}
                                    <small v-if="props.option.email">
                                        <br>
                                        Email: <b>{{ props.option.email }}</b>
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
    </b-field>

</template>
<script>

    import debounce from 'lodash/debounce'

    export default {
        computed:{
            root_state() {return this.$store.getters['root/state']},
        },
        props:{
            content: {
                type: String|Number,
                default: null
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
                default: "Type or select a date..."
            },
            icon: {
                type: String,
                default: "calendar-alt"
            },
        },
        data() {
            return {
                data: [],
                selected: null,
                content_value: null,
                name: '',
                isFetching: false
            }
        },
        mounted() {
            //----------------------------------------------------
            this.content_value = this.content;
            //----------------------------------------------------
            if(this.content_value){
                this.getUserDetailById();
            }
            //----------------------------------------------------
        },
        methods: {
            // You have to install and import debounce to use it,
            // it's not mandatory though.
            getAsyncData: debounce(function (name) {
                if (!name.length) {
                    this.data = [];
                    return
                }
                let self = this;
                this.data = [];
                this.isFetching = true;

                let url = this.root_state.ajax_url+'/json/users/';
                url += name;

                this.axios.get(url).then((response) => {
                    this.data = [];
                    response.data.forEach((item) => this.data.push(item));
                    self.isFetching = false;
                });

            }, 500),
            // You have to install and import debounce to use it,
            // it's not mandatory though.
            getUserDetailById: debounce(function () {

                let self = this;

                let url = this.root_state.ajax_url+'/json/getUserById/';
                url += this.content_value;

                this.axios.get(url).then((response) => {
                    self.content_value = response.data.email;
                });

            }, 500),
            //----------------------------------------------------
            onSelect: function (option) {
                this.selected = option;
                this.name = option.name;
                this.$emit('onSelect', option);
            },
            emitOnInput: function (data) {
                this.$emit('input', data);
            },
            //----------------------------------------------------
        }
    }


</script>
