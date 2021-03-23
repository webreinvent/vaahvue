<template>

    <b-field :label="label"
             :labelPosition="labelPosition" >

        <div class="content" >
        <ckeditor :editor="editor"
                  v-model="editorData"
                  @input="emitOnInput"
                  :config="editorConfig">
        </ckeditor>
        </div>
    </b-field>


</template>

<style>
.ck-editor__editable_inline {
    min-height: 200px;
}
</style>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

window.ClassicEditor = ClassicEditor;
window.SimpleUploadAdapter = SimpleUploadAdapter;


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
    components: {

    },
    data()
    {
        let obj = {
            editor: ClassicEditor,
            editorData: "",

            editorConfig: {
                plugins: [ SimpleUploadAdapter ],
                simpleUpload: {
                    // The URL that the images are uploaded to.
                    uploadUrl: 'http://example.com',

                    // Enable the XMLHttpRequest.withCredentials property.
                    withCredentials: true,

                    // Headers sent along with the XMLHttpRequest to the upload server.
                    headers: {
                        'X-CSRF-TOKEN': 'CSRF-Token',
                        Authorization: 'Bearer <JSON Web Token>'
                    }
                }
            }
        };

        return obj;
    },

    created() {

    },
    watch: {
        '$route' (to, from) {
            if(this.editor)
            {
                //this.editor.destroy();
                //this.editor = this.setupEditor();
                //this.setEditorContent();
            }
        },
        content: {
            immediate: true,
            handler(newValue) {
                if(!newValue)
                {
                    //this.editor.clearContent();
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
        setupEditor: function()
        {

        },
        //---------------------------------------------------------------------
        setEditorContent: function (content) {
            if(content)
            {
                this.editorData = content;
            }
        },
        //----------------------------------------------------
        emitOnInput: function () {
            console.log('--->', this.editorData);
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

