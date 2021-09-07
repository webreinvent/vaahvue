<template>

    <b-field :label="label"
             :labelPosition="labelPosition">
        <tree-select v-model="content"
                     :placeholder="placeholder"
                     :class="custom_class"
                     @select="emitOnSelect"
                     @deselect="emitOnSelect"
                     :clearable="is_clearable"
                     :multiple="is_multiple"
                     :show-count="show_count"
                     :flat="true"
                     :normalizer="normalizer"
                     :options="type_options" >

        </tree-select>
    </b-field>


</template>

<script>

    // import the component
    import TreeSelect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        props:{
            value: {
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
            ajax_url: {
                type: String,
                default: null,
            },
            taxonomy_type: {
                type: String|Number,
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
                content:null,
                type_options:[]
            };

            return obj;
        },

        created() {

        },
        watch: {
            options: function (newValue, oldValue) {
                if(newValue){
                    this.type_options = newValue;
                }


            },
        },
        mounted() {
            //----------------------------------------------------
            this.type_options = this.options;
            this.content = this.value;

            //----------------------------------------------------
            if(this.ajax_url && this.taxonomy_type){
                this.getOptions(this.taxonomy_type);
            }

            //----------------------------------------------------
        },
        methods: {
            getOptions: function (q) {
                let url = this.ajax_url;
                let params = {
                    q: q
                };

                console.log('--->', params);

                this.axios.post(url, params).then((response) => {
                    this.type_options = response.data;

                    console.log('--->', response);
                });
            },
            //----------------------------------------------------
            emitOnSelect: function (data) {

                this.$emit('input', this.content);

            },

            //---------------------------------------------------------------------
            normalizer: function (node) {

                let data = {
                    label: node.name,
                };

                if(node.children && node.children.length === 0){
                    delete node.children;
                }

                return data;
            },
            //----------------------------------------------------
        },
    }
</script>

