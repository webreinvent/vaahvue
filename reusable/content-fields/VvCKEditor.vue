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

window.ClassicEditor = ClassicEditor;

let base_url = document.getElementsByTagName("base")[0].getAttribute('href');

let media_upload_url = base_url+"/backend/cms/media/upload"

class MyUploadAdapter {
    constructor(props) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;
        // URL where to send files.
        //this.url = `http://localhost/jalapeno-website-dev/public/backend/cms/media/upload`;
        this.url = media_upload_url;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        let token = $('#_token').attr('content');

        console.log('--->token', token);

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        xhr.setRequestHeader('Authorization', $('#_token').attr('content'))
        xhr.setRequestHeader('X-CSRF-TOKEN', $('#_token').attr('content'))
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            console.log('--->response', response);

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.data.full_url
            });
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();

        this.loader.file.then(result => {
                data.append('file', result);
                this.xhr.send(data);
            }
        )
    }

};


function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader)
    }
}

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
                mediaEmbed: {previewsInData: true},
                //plugins: [ SimpleUploadAdapter ],
                extraPlugins: [ MyCustomUploadAdapterPlugin ],
                simpleUpload: {
                    // The URL that the images are uploaded to.
                    uploadUrl: 'http://example.com',

                    // Enable the XMLHttpRequest.withCredentials property.
                    withCredentials: true,

                    // Headers sent along with the XMLHttpRequest to the upload server.
                    headers: {
                        'X-CSRF-TOKEN': 'CSRF-Token',
                        Authorization: 'Bearer <JSON Web Token>'
                    },

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
                this.editor.destroy();
                this.editor = this.setupEditor();
                this.setEditorContent();
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

