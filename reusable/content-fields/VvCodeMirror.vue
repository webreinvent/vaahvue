<template>

    <b-field :label="label"
             :labelPosition="labelPosition">

        <codemirror
                ref="cmEditor" :value="content"
                @input="emitOnInput"
                :options="cm_options"
        />
    </b-field>


</template>

<script>

    import { codemirror } from 'vue-codemirror'

    // language
    import 'codemirror/mode/xml/xml.js'
    import 'codemirror/mode/css/css.js'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/mode/php/php.js'

    // theme css
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/monokai.css'
    // require active-line.js
    import'codemirror/addon/selection/active-line.js'
    // autoCloseTags
    import'codemirror/addon/edit/closetag.js'

    export default {
        props:{
            content: {
                type: String,
                default: function () {
                    return null
                }
            },
            type: {
                type: String,
                default: null,
            },
            mode: {
                type: String,
                default: 'text/html',
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
        },
        components:{
            codemirror
        },
        data()
        {
            let obj = {
                cm_options: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    lineWrapping: true,
                    autoCloseTags: true,
                    mode: 'text/html',
                    line: true,
                    theme: 'monokai'
                    // more CodeMirror options...
                }
            };

            return obj;
        },

        created() {

        },
        watch: {
        },
        mounted() {
            //----------------------------------------------------
            this.cm_options.mode = this.mode;

            console.log('--->', this.cm_options);

            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            emitOnInput: function (data) {
                this.$emit('input', data);
            },
            //----------------------------------------------------
        },
    }
</script>

