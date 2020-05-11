<template>

    <div>
    <!--autocomplete users-->

    <b-autocomplete
        v-if="options"
        expanded
        v-model="q"
        :data="getSearchedData"
        :field="field_name"
        :placeholder="placeholder"
        :icon="icon"
        :open-on-focus="open_on_focus"
        ref="autocomplete"
        @select="option => selected = option">

        <template slot-scope="props">
            <div class="media">
                <div class="media-content" v-if="props.option">
                            <span v-if="props.option[field_name]">
                                {{props.option.slug}} ({{ props.option[field_name] }})
                            </span>
                </div>
            </div>
        </template>

        <template slot="empty">No results found</template>
    </b-autocomplete>
    <!--/autocomplete users-->
    </div>

</template>

<script>

    import Fuse from "fuse.js";

    export default {
        props: {
            content: {
                type: String|Number,
                default: function () {
                    return null
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
            options: {
                type: Array|Object,
                required: true
            },
            field_name: {
                type: String,
                default: "name"
            },
            search_fields: {
                type: Array,
                default: function () {
                    return ["name", "slug"]
                }
            },
            icon: {
                type: String,
                default: "search"
            },
            open_on_focus: {
                type: Boolean,
                default: true
            },
        },
        components:{

        },
        data()
        {
            let obj = {
                //----autocomplete users
                q: null,
                data: [],
                content_value: null,
                selected: null,
                fuse_config: {
                    shouldSort: true,
                    threshold: 0.2,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: []
                }
                //----/autocomplete users
            };

            return obj;
        },
        created() {
        },
        mounted(){

            if(this.content)
            {
                this.setSelectedValue(this.content);
            }
            this.fuse_config.keys = this.search_fields;

        },
        computed: {
            getSearchedData() {

                let list_filtered = this.options;

                if(this.options && this.q && this.q != this.content)
                {
                    let fuse = new Fuse(this.options, this.fuse_config);
                    list_filtered = fuse.search(this.q);
                }


                return list_filtered;
            }

        },
        watch: {
            options: function (newValue, oldValue) {
                this.currency_options = newValue;
            },
            selected: function (newValue, oldValue) {

                console.log('--->', newValue);

                if(newValue && newValue != this.content)
                {
                    this.emitOnInput(newValue.slug);
                } else{
                    this.emitOnInput(null);
                }
            },

        },
        methods: {
            //---------------------------------------------------------------------
            setSelectedValue: function (selected_value) {

                console.log('--->selected_value', selected_value);

                this.$refs.autocomplete.setSelected(selected_value);
            },
            //---------------------------------------------------------------------
            emitOnInput: function (data) {
                this.$emit('input', data);
            },
            //---------------------------------------------------------------------
        }
    }
</script>

