<template>

    <b-field :label="label"
             :labelPosition="labelPosition">

        <div class="content">
            <jodit-editor v-if="is_simple"
                          v-model="editorData"
                          :config="editorConfig"
                          :buttons="buttons"
                          @input="emitOnInput"/>

            <jodit-editor v-else
                          v-model="editorData"
                          :config="editorConfig"
                          @input="emitOnInput"/>
        </div>
    </b-field>


</template>

<script>

let base_url = document.getElementsByTagName("base")[0].getAttribute('href');
import $ from 'jquery'


let media_upload_url = base_url + "/backend/cms/media/upload";

export default {
    props: {
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
        is_simple: {
            type: Boolean,
            default: false,
        },
    },
    components: {
    },
    data() {
        let obj = {
            editorData: "",
            buttons: [ 'source', 'eraser', '|', 'bold', 'link',  'brush', '|', 'ul', 'ol', '|', 'fontsize', 'paragraph', '|',  'image', 'fullsize'],
            editorConfig: {
                askBeforePasteFromWord: false,
                askBeforePasteHTML: true,
                //defaultActionOnPaste: 'insert_as_html',
                defaultActionOnPaste: 'insert_clear_html',
                //defaultActionOnPaste: 'insert_as_text',
                /*cleanHTML: {
                    cleanOnPaste: true,
                    denyTags: 'script,img'
                },*/
                uploader: {
                    url: media_upload_url + "?_token=" + $('meta[name="csrf-token"]').attr('content'),  //your upload api url
                    insertImageAsBase64URI: false,
                    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
                    //headers: {"token":`${db.token}`},
                    filesVariableName: function (t) {
                        return 'files[' + t + ']';
                    }, //"files",
                    withCredentials: false,
                    pathVariableName: 'path',
                    format: 'json',
                    method: 'POST',
                    prepareData: function (formdata) {
                        return formdata;
                    },
                    isSuccess: function (e) {
                        return e.data;
                    },
                    getMessage: function (e) {
                        return void 0 !== e.data.messages && Array.isArray(e.data.messages)
                            ? e.data.messages.join('')
                            : '';
                    },
                }
            }
        };

        return obj;
    },

    created() {

    },
    watch: {
        '$route'(to, from) {
            if (this.editor) {
                this.editor.destroy();
                this.editor = this.setupEditor();
                this.setEditorContent();
            }
        },
        content: {
            immediate: true,
            handler(newValue) {
                if (!newValue) {
                    this.clearContent();
                } else {
                    this.setEditorContent(newValue);
                }
            },
        },

    },
    mounted() {
        //----------------------------------------------------
        this.editor = this.setupEditor();
        this.setEditorContent(this.content);
        //----------------------------------------------------
    },
    methods: {
        //----------------------------------------------------
        setupEditor: function () {

        },
        //---------------------------------------------------------------------
        setEditorContent: function (content) {
            if (content) {
                this.editorData = content;
            }
        },
        //----------------------------------------------------
        clearContent: function () {
            this.editorData = '';
        },
        //----------------------------------------------------
        emitOnInput: function () {
            this.$emit('input', this.editorData);
        },
        //----------------------------------------------------

        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------
    },

}
</script>

