<template>

    <div v-if="server" :class="custom_class">

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

            <div class="level-right" v-if="uploaded_files">
                <div v-for="(file, index) in uploaded_files"
                     :key="index">
                    <div class="level-item">
                        <div >
                            <img style="max-height: 100px;" :src="file">
                        </div>
                    </div>
                    <div class="level-item">

                        <b-field >

                            <b-tooltip label="Open Image" type="is-dark">
                                <p class="control">
                                    <b-button tag="a" :href="file"
                                              target="_blank"
                                              icon-left="external-link-alt"></b-button>
                                </p>
                            </b-tooltip>

                            <b-tooltip label="Remove File" type="is-dark">
                                <p class="control">
                                    <b-button type="is-danger" @click="removeFile(index)">Remove</b-button>
                                </p>
                            </b-tooltip>

                        </b-field>
                    </div>

                </div>
            </div>



        </div>

    </div>


</template>

<script>

    let base_url = document.getElementsByTagName('base')[0].href;

    import {VaahHelper as Vaah} from "../../../vaahvue/helpers/VaahHelper";

    export default {
        name: "VvImageGroup",
        props: {
            content: {
                type: Array,
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
                    return 'uid-image-group-'+Date.now();
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
                    return 'Drop your image here or click to upload.';
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
                default: true
            },
            allowed_types: {
                type: String,
                default: 'image/jpeg, image/png, image/gif'
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
                default: true
            },
            instant_upload: {
                type: Boolean,
                default: true
            },
            app_url: {
                type: String,
                default: null
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
                uploaded_files: [],
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
                this.uploaded_files = this.content;
            }

            this.onLoad();

        },
        watch: {

        },
        methods: {

            //---------------------------------------------------------------------
            onLoad: function()
            {

            },
            //---------------------------------------------------------------------
            serverConfig: function()
            {


                let self = this;

                if(this.upload_url)
                {
                    this.default_upload_url = this.upload_url;
                }


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
                            if(data && data.data)
                            {
                                console.log('--->image group - data.data', data.data);
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
                this.addFile(data.full_url);
            },
            //---------------------------------------------------------------------

            //---------------------------------------------------------------------
            onFileProcessed: function (error, file) {
                if(!error && this.remove_after_upload == true)
                {
                    this.pond.removeFile(file.id);
                }
            },
            //---------------------------------------------------------------------
            addFile: function(file){
                this.uploaded_files.push(file);
                this.emitData();
            },
            //---------------------------------------------------------------------
            removeFile: function (index) {
                this.uploaded_files.splice(index, 1);
                this.emitData();
            },
            //---------------------------------------------------------------------
            emitData: function () {
                this.$emit('input', this.uploaded_files);
            }
            //---------------------------------------------------------------------
        }
    }
</script>

