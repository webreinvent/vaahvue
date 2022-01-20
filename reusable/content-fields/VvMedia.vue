<template>

    <div v-if="server"  :class="custom_class">

        <div class="level">

            <div class="level-left">
                <div class="filepond">
                    <file-pond
                            :name="file_input_name"
                            :ref="uid"
                            :id="uid"
                            :server="server"
                            :maxFileSize="max_size"
                            :label-idle="label"
                            :allow-multiple="allow_multiple"
                            allowImageEdit="true"
                            allowImageCrop="true"
                            :instantUpload="instant_upload"
                            :imageCropAspectRatio="aspect_ratio"
                            :accepted-file-types="allowed_types"
                            :onprocessfile="onFileProcessed"
                            v-bind:files="files"
                            v-on:init="handleFilePondInit()">
                    </file-pond>

                    <p class="help">Maximum size allowed is {{max_size}}.
                        <span v-if="show_allowed_types">File Types: {{allowed_types}}</span>
                    </p>
                </div>
            </div>

            <div class="level-right" v-if="full_url">

                <b-field>

                    <p class="control">
                        <span class="button is-static">.{{full_url_ext}}</span>
                    </p>

                    <b-tooltip label="Open File" type="is-dark">
                        <p class="control">
                            <b-button tag="a" :href="full_url"
                                      target="_blank"
                                      icon-left="external-link-alt"></b-button>
                        </p>
                    </b-tooltip>

                    <b-tooltip label="Remove File" type="is-dark">
                        <p class="control">
                            <b-button type="is-danger" @click="removeImage">Remove</b-button>
                        </p>
                    </b-tooltip>

                </b-field>


            </div>



        </div>

    </div>


</template>

<script>

    let base_url = document.getElementsByTagName('base')[0].getAttribute("href");

    import {VaahHelper as Vaah} from "../../../vaahvue/helpers/VaahHelper";

    export default {
        name: "VvMedia",
        props: {
            content: {
                type: String,
                default: function () {
                    return null
                }
            },
            upload_url: {
                type: String,
                default: null
            },
            folder_path: {
                type: String,
                default: 'public/media'
            },
            file_input_name: {
                type: String,
                default: 'file'
            },
            file_name: {
                type: String,
                default: null
            },
            uid: {
                type: String,
                default: function () {
                    return 'uid-image-'+Date.now();
                }
            },
            custom_class: {
                type: String,
                default: function () {
                    return 'is-primary';
                }
            },
            label: {
                type: String,
                default: function () {
                    return 'Drop your file here or click to upload.';
                }
            },
            icon: {
                type: String,
                default: "search"
            },
            aspect_ratio: {
                type: String,
                default: null
            },
            allow_multiple: {
                type: Boolean,
                default: false
            },
            allowed_types: {
                type: String,
                default: null
            },
            max_size: {
                type: String,
                default: '2MB'
            },
            remove_after_upload: {
                type: Boolean,
                default: true
            },
            show_allowed_types: {
                type: Boolean,
                default: false
            },
            instant_upload: {
                type: Boolean,
                default: false
            },

        },
        computed:{
        },
        components:{

        },
        data()
        {
            let obj = {
                server: null,
                url: null,
                base_url: base_url,
                default_app_url: base_url,
                default_upload_url: base_url+'/backend/media/upload',
                pond: null,
                files: [],
                full_url: null,
                full_url_name: null,
                full_url_ext: null,
            };

            return obj;
        },
        created() {
        },
        mounted(){


            if(this.app_url)
            {
                this.default_app_url = this.app_url;
            }

            this.server = this.serverConfig();

            if(this.content)
            {
                this.full_url = this.content;
                this.full_url_name = Vaah.fileNameFromUrl(this.content);
                this.full_url_ext = Vaah.fileExtensionFromUrl(this.content);
            }

            this.onLoad();


        },
        watch: {
            content(newVal, oldVal) {
               if(newVal){
                   this.full_url = newVal;
                   this.full_url_name = Vaah.fileNameFromUrl(newVal);
                   this.full_url_ext = Vaah.fileExtensionFromUrl(newVal);
               }else{
                   this.full_url = '';
                   this.full_url_name = '';
                   this.full_url_ext = '';
               }
            },
        },
        methods: {

            //---------------------------------------------------------------------
            onLoad: function()
            {
                this.serverConfig();
            },
            //---------------------------------------------------------------------
            serverConfig: function()
            {


                let self = this;

                if(this.upload_url)
                {
                    this.default_upload_url = this.upload_url;
                }

                console.log('--->', this.default_upload_url);

                let server = {
                    url: this.default_upload_url,
                    process:{
                        method: 'POST',
                        timeout: 7000,
                        ondata: function (formData) {
                            formData.append('folder_path', self.folder_path);
                            formData.append('file_name', self.file_name);
                            return formData;
                        },
                        headers: {
                            'X-CSRF-TOKEN': $('#_token').attr('content')
                        },
                        onload: function (data) {
                            data = JSON.parse(data);
                            console.log('--->', data);
                            if(data && data.data)
                            {
                                console.log('--->image - data.data', data.data);
                                self.afterUpload(data.data);
                            }
                            let res = {
                                data: data
                            };
                            Vaah.processResponse(res);
                        },
                        onerror: function (error) {

                            console.log('--->', error);

                            //Vaah.processError(error);
                        },

                    }
                };


                return server;


            },
            //---------------------------------------------------------------------
            handleFilePondInit: function () {
                this.pond = this.$refs[this.uid];

                //this.$refs[this.uid].server = this.serverConfig();

            },
            //---------------------------------------------------------------------
            afterUpload: function (data) {

                if(data){
                    this.full_url = data.full_url;
                    this.full_url_name = Vaah.fileNameFromUrl(data.full_url);
                    this.full_url_ext = Vaah.fileExtensionFromUrl(data.full_url);

                    this.$emit('input', data.url);
                }

            },
            //---------------------------------------------------------------------
            onFileProcessed: function (error, file) {
                if(!error && this.remove_after_upload == true)
                {
                    this.pond.removeFile(file.id);
                }
            },
            //---------------------------------------------------------------------
            removeImage: function () {
                this.full_url = null;
                this.$emit('input', null);
            },
            //---------------------------------------------------------------------
        }
    }
</script>

