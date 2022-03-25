<template>

    <b-autocomplete
        expanded
        :data="data"
        placeholder="Search Users"
        field="name"
        :loading="isFetching"
        ref="autocompleteuser"
        @typing="getAsyncData"
        @select="option => onSelect(option)">

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

</template>
<script>

let base_url = document.getElementsByTagName('base')[0].getAttribute("href");

    import debounce from 'lodash/debounce'

    export default {
        props: {
            selected_value: String|Number,
        },
        computed:{
            root_state() {return this.$store.getters['root/state']},
        },
        data() {
            return {
                data: [],
                selected: null,
                name: '',
                isFetching: false
            }
        },
        watch: {
            options: function (newValue, oldValue) {
                this.options = newValue;

            },
            selected_value: function (newValue, oldValue) {
                console.log('--->newValue auto', newValue);
                this.setSelectedValue(newValue);
            },
            selected: function (newValue, oldValue) {
                if(newValue && newValue != this.selected_value)
                {
                    this.$emit('onSelect', newValue);
                }
            },

        },
        mounted(){

            this.setSelectedValue(this.selected_value);
        },
        methods: {
            setSelectedValue: function (selected_value) {
                if(selected_value)
                {
                    this.$refs.autocompleteuser.setSelected(selected_value);
                } else
                {
                    this.$refs.autocompleteuser.setSelected('');
                }

            },
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

                let url = base_url+'/backend/json/users/';
                url += name;

                this.axios.get(url).then((response) => {
                    this.data = [];
                    response.data.forEach((item) => this.data.push(item));
                    self.isFetching = false;
                });

            }, 500),
            //----------------------------------------------------
            onSelect: function (option) {
                this.selected = option;
                this.name = option.name;
                this.$emit('onSelect', option);
            }
            //----------------------------------------------------
        }
    }


</script>
