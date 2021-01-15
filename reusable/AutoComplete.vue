<template>

    <!--autocomplete users-->
    <b-autocomplete
        expanded
        v-model="q"
        :data="filteredDataArray"
        :field="field_name"
        :placeholder="placeholder"
        :icon="icon"
        :open-on-focus="open_on_focus"
        ref="autocomplete"
        @select="option => selected = option">

        <template slot-scope="props">
            <div class="media">
                <div class="media-content" v-if="props.option">
                    {{props.option[field_name]}}

                </div>
            </div>
        </template>

        <template #empty>No results found</template>
    </b-autocomplete>
    <!--/autocomplete users-->


</template>

<script>

    import Fuse from "fuse.js";

    export default {
        props: {
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
                    return ["name"]
                }
            },
            icon: {
                type: String,
                default: "search"
            },
            open_on_focus: {
                type: Boolean,
                default: false
            },
            selected_value: String|Number,
            placeholder: {
                type: String,
                default: "Search"
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
                selected: null,
                fuse_config: {
                    shouldSort: true,
                    threshold: 0.6,
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
            this.fuse_config.keys = this.search_fields;
            this.setSelectedValue(this.selected_value);
        },
        computed: {
            filteredDataArray() {
                let list_filtered = [];

                if(this.options && this.q && this.q != this.selected_value)
                {
                    this.fuse_config.keys = this.search_fields;
                    let fuse = new Fuse(this.options, this.fuse_config);
                    let searched  = fuse.search(this.q);

                    if(searched.length)
                    {
                        for(let key in searched)
                        {
                            list_filtered.push(searched[key].item);
                        }
                    }

                } else
                {
                    list_filtered = this.options;
                }

                return list_filtered;
            }

        },
        watch: {
            options: function (newValue, oldValue) {
                this.options = newValue;

            },
            selected: function (newValue, oldValue) {
                if(newValue && newValue != this.selected_value)
                {
                    console.log('--->', newValue);
                    this.$emit('onSelect', newValue);
                }
            },
            selected_value: function (newValue)
            {
                console.log('--->', newValue);
                this.$refs.autocomplete.setSelected(newValue);
            }

        },
        methods: {
            //---------------------------------------------------------------------
            setSelectedValue: function (selected_value) {
                this.$refs.autocomplete.setSelected(selected_value);
            },
            //---------------------------------------------------------------------
            toArray: function (obj) {

                let result = Object.keys(obj).map(function(key) {
                    return [Number(key), obj[key]];
                });

                return result;
            }
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
        }
    }
</script>

