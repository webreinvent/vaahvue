<template>

    <div v-if="options">

        <b-field>
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                :maxtags="max_tags"
                autocomplete
                :allow-new="allow_new"
                :open-on-focus="open_on_focus"
                :field="field_name"
                :icon="icon"
                :type="type"
                :placeholder="placeholder"
                attached
                size="is-small"
                @add="emitTags"
                @remove="emitTags"
                @typing="getFilteredTags"
                :before-adding="doesItemExist">

                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            <span v-if="props.option && props.option[field_name]">
                                {{ props.option[field_name] }}
                            </span>

                        </div>
                    </div>
                </template>

                <template slot="empty">
                    <span>No results found</span>
                </template>

            </b-taginput>
        </b-field>
    </div>

</template>
<script>
import Fuse from "fuse.js";

export default {
    props: {
        options: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
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
            default: false
        },
        allow_new: {
            type: Boolean,
            default: false
        },
        selected_value: {
            type: Array | Object,
            default: function () {
                return []
            }
        },
        placeholder: {
            type: String,
            default: "Search"
        },
        type: {
            type: String,
            default: "Search"
        },
        max_tags: {
            type: String | Number
        },
    },
    data() {
        return {
            filteredTags: [],
            isSelectOnly: false,
            tags: [],
        }
    },
    mounted() {
        console.log('--->', this.selected_value);
        this.tags = this.selected_value;
        this.getFilteredTags();
    },
    watch: {

        options: function (newValue, oldValue) {
            this.options = newValue;

        },
        selected_value: function (newValue, oldValue) {

            this.tags = newValue;
        }


    },
    methods: {
        getFilteredTags(text) {

            var config = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: this.search_fields
            };

            let list_filtered;

            if (this.options && text) {
                let fuse = new Fuse(this.options, config);
                list_filtered = fuse.search(text);
                list_filtered = Object.keys(list_filtered).map(function (key) {
                    return list_filtered[key]['item'];
                });
            } else {
                list_filtered = this.options;
            }

            console.log('--->list_filtered', list_filtered);

            this.filteredTags = list_filtered;
        },
        emitTags: function () {
            const tags = [];
            let self = this;

            if (this.allow_new) {
                this.tags.forEach(tag => {
                    const item = tag instanceof Object ?
                        {is_new: false, [self.field_name]: tag[self.field_name]} :
                        {is_new: true, [self.field_name]: tag};
                    tags.push(item);
                })

                this.tags = tags;
            }

            this.$emit('onTagChange', this.tags);
            this.$emit('onSelect', this.tags);


        },

        doesItemExist(item) {

            if (!this.tags) return true;

            let self = this;

            console.log('-->tag', this.tags);

            let add = this.tags.find(function (el) {

                if (item instanceof Object)
                    return el[self.field_name] === item[self.field_name];

                return el[self.field_name] === item;

            });

            console.log('-->add', add);

            if (!add) {
                return true;
            }
        },
    }
}


</script>
