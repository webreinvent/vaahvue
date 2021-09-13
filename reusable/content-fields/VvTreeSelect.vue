<template>

    <b-field v-if="display_column" :label="label"
             :labelPosition="labelPosition">
        <tree-select ref="vv_tree_select"
                     v-model="value"
                     :placeholder="placeholder"
                     :class="custom_class"
                     @select="emitOnSelect"
                     @deselect="emitOnSelect"
                     :clearable="is_clearable"
                     :multiple="is_multiple"
                     :show-count="show_count"
                     :flat="is_multiple"
                     :normalizer="normalizer"
                     :options="type_options" >

        </tree-select>

        <p>
            <b-tooltip v-if="add_url" label="Add" type="is-dark">
                <b-button tag="a"
                          target="_blank"
                          :href="add_url"
                          icon-left="external-link-alt">
                </b-button>
            </b-tooltip>
        </p>

    </b-field>


</template>

<script>

    // import the component
    import TreeSelect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        props:{
            content: {
                type: String|Number|Array|Object,
                default: function () {
                    return null
                }
            },
            options: {
                type: Array|Object,
                default: function () {
                    return []
                }
            },
            meta: {
                type: Array|Object,
                default: function () {
                    return []
                }
            },
            ajax_url: {
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
            is_multiple: {
                type: Boolean,
                default: false,
            },
            is_clearable: {
                type: Boolean,
                default: false,
            },
            show_count: {
                type: Boolean,
                default: true,
            },
        },
        components:{
            TreeSelect
        },
        data()
        {
            let obj = {
                value:null,
                display_column: 'name',
                add_url: null,
                type_options:[]
            };

            return obj;
        },

        created() {

        },
        watch: {
            content: function (newValue, oldValue) {
                this.checkValueType(newValue);

            },
            value: function (newValue, oldValue) {

                if(!newValue){
                    this.$emit('input', null);
                }

            },
        },
        mounted() {

            this.type_options = this.options;

            this.checkValueType(this.content);

            //----------------------------------------------------
            if(this.ajax_url && this.meta){
                this.getOptions(this.meta);
            }

            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            getOptions: function (query) {
                let url = this.ajax_url;
                let params = query;

                this.axios.post(url, params).then((response) => {
                    if(response.data || response.data.status === 'success'){

                        this.type_options = response.data.data.list;
                        this.display_column = null;

                        this.display_column = response.data.data.display_column;
                        this.add_url = response.data.data.add_url;
                    }

                    if(!this.display_column){
                        this.display_column = 'name';
                    }
                });
            },
            //----------------------------------------------------
            emitOnSelect: function (data) {

                this.$emit('input', this.value);

            },

            //---------------------------------------------------------------------
            normalizer: function (node) {

                let data = {
                    label: node[this.display_column]
                };

                if(node.children && node.children.length === 0){
                    delete node.children;
                }

                return data;
            },

            //---------------------------------------------------------------------
            checkValueType: function (value) {

                this.value = value;

                if(this.is_multiple
                    && (typeof value === 'string' || typeof value === 'number')){
                    this.value = [value];
                }
            },
            //----------------------------------------------------
        },
    }
</script>

