<script setup>
import {computed, reactive, ref, watch} from 'vue';
import {vaah} from '../../../../vaahvue/pinia/vaah'
import { useContentStore } from '../../../../stores/store-contents'
import axios from 'axios';
// import Loader from "../../../vaahvue/vue-three/loader.vue";

/**----------------------
 * Props
 */

const upload_refs = ref([])
const is_media_uploading = ref(false)
const store = useContentStore();

const temp_setter = ref(store.reset_uploader);

const props = defineProps({
    uploadUrl: {
        type: String,
        required: false
    },
    folderPath: {
        type: String,
        default: 'public/media'
    },
    fileName: {
        type: String,
        default: null
    },
    maxFileSize:{
        type: Number,
        default: 1000000
    },
    file_limit:{
        type: Number,
        default: 5
    },
    can_select_multiple:{
        type: Boolean,
        default: false
    },
    is_basic:{
        type: Boolean,
        default: false
    },
    auto_upload:{
        type: Boolean,
        default: false
    },
    max_file_size:{
        type: Number,
        default: 1000000
    },
    file_type_accept:{
        type: String,
        default: 'image/jpeg, image/png, image/gif'
    },
    placeholder:{
        type: String,
        default: 'Upload Image'
    },
    store_label:{
        type: String,
        default: 'avatar'
    },
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
    }
});


watch(store.reset_uploader, async (new_val, old_val) => {
    console.log('watch',new_val);
    upload_refs.value.files = [];
    upload_refs.value.uploadedFiles = [];
})

/**----------------------
 * Data
 */
let files = reactive([]);
const emit = defineEmits(["onInput"]);

const content_value = computed({
    // getter
    get() {
        return props.content;
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        emit('onInput', newValue)
    }
})

/**----------------------
 * Methods
 */
function uploadFile(e){

    let uploaded_files = upload_refs.value.files;

    upload_refs.value.files = [];
    upload_refs.value.uploadedFiles = [];

    uploaded_files.slice()
        .reverse().forEach(async (file,index) => {

        if(file) {

            let uploaded_index = upload_refs.value.uploadedFiles.length;

            upload_refs.value.uploadedFiles[uploaded_index] = {
                objectURL:file.objectURL,
                name:file.name,
                size:file.size,
                upload_percentage:0,
            }

            is_media_uploading.value = true;
            let formData = new FormData();
            formData.append("file", file);
            formData.append('folder_path', props.folderPath);
            formData.append('file_name', props.fileName);
            formData.append('type', props.store_label);
            axios.post(store.base_url + '/vaah/manage/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                    upload_refs.value.uploadedFiles[uploaded_index].upload_percentage = parseInt(Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                }.bind(this)
            }).then(res => {
                console.log(res);
                is_media_uploading.value = false;

                if(res.data && !res.data.success){
                    vaah().toastErrors(res.data.errors);
                    return false;
                }

                if(res.data.messages){
                    vaah().toastSuccess(res.data.messages);
                }

                upload_refs.value.uploadedFiles = [];
                upload_refs.value.uploadedFileCount = 0;

                content_value.value = res.data.data.full_url;

            });
        }
    })

}

const onRemoveTemplatingFile = (removeUploadedFileCallback, index) => {
    if(removeUploadedFileCallback){
        removeUploadedFileCallback(index);
    }

    removeFile();
};

const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

function removeFile(e){

    content_value.value = null
    upload_refs.value.files = [];
    upload_refs.value.uploadedFiles = [];
    upload_refs.value.uploadedFileCount = 0;

}

function onUpload(e){

    if(upload_refs.value.files && upload_refs.value.files.length > 0){
        let uploaded_files = upload_refs.value.files;

        let reader = new FileReader();

        reader.readAsDataURL(uploaded_files[0]);
        reader.onload = evt => {
            let img = new Image();
            img.src = evt.target.result;
            img.onload = () => {

                if (img.width < store.assets.min_image_width || img.height < store.assets.min_image_height) {

                    let error_message = uploaded_files[0].name+': Image resolution too low. Minimum size is ' +
                        '' + store.assets.min_image_width + 'x' + store.assets.min_image_height + '.';

                    upload_refs.value.messages = [error_message];

                    upload_refs.value.files = [];
                }
            }
        }

    }

}


</script>

<template>
    <ProgressBar v-if="is_media_uploading"
                 mode="indeterminate" style="height: 6px"></ProgressBar>
    <FileUpload name="file"
                :auto="auto_upload"
                :accept="file_type_accept"
                ref="upload_refs"
                :mode="is_basic?'basic':'advanced'"
                :multiple="can_select_multiple"
                :customUpload="true"
                @uploader="uploadFile"
                @removeUploadedFile="removeFile"
                @select="onUpload"
                :file-limit="1"
                :showUploadButton="!auto_upload"
                :showCancelButton="!auto_upload"
                :maxFileSize="store.assets.max_file_upload_size">
        <template #empty>

            <div v-if="content_value" >
                <div class="p-fileupload-file" style="
                        padding: 10px;
                        border: 1px solid #ccc;
                        min-height: 60px;">
                    <div >
                            <span v-if="content_value.split('.').pop() === 'png'
                            || content_value.split('.').pop() === 'jpeg'
                            || content_value.split('.').pop() === 'jpg' ">
                                <img width="50" height="50"
                                     :src="content_value">
                            </span>
                        <span v-else>
                                <img width="50" height="50"
                                     src="https://findicons.com/files/icons/1579/devine/256/file.png">
                            </span>
                    </div>
                    <a :href="content_value" target="_blank"
                       rel="noopener noreferrer"
                       class="p-button p-component p-button-icon-only
                       p-button-rounded p-button-outlined">
                        <span class="p-button-icon pi pi-external-link" data-pc-section="icon"></span>
                    </a>

                    <span class="font-semibold"></span>
                    <div class="p-fileupload-file-actions">
                        <Button icon="pi pi-times" severity="danger"
                                @click="onRemoveTemplatingFile(null,index)"
                                rounded outlined aria-label="Cancel" />

                    </div>
                </div>
            </div>
            <div v-else class="flex align-items-center justify-content-center flex-column">
                <p>{{ placeholder }}</p>
            </div>
        </template>

        <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
            <div v-if="uploadedFiles.length > 0"
                 v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                 class="p-fileupload-file gi-upload-file-details">
                <div class="file-warp">
                    <img role="presentation"
                         class="p-fileupload-file-thumbnail"
                         :alt="file.name" :src="file.objectURL"
                         width="50">
                </div>

                <div class="p-fileupload-file-details ">
                    <div class="p-fileupload-file-name">
                        {{ file.name }},
                        <small><strong>{{ formatSize(file.size) }}</strong></small>
                    </div>
                    <ProgressBar class="gi-upload-progressbar"
                                 :showValue="false"
                                 :value="file.upload_percentage">
                    </ProgressBar>
                    <div class="upload-progress">
                        {{file.upload_percentage}}%
                    </div>


                </div>



                <div class="p-fileupload-file-actions">
                    <Button icon="pi pi-times"
                            disabled
                            @click="removeUploadedFileCallback(index)"
                            outlined rounded  severity="danger" />
                </div>
            </div>
            <div v-if="files.length > 0"
                 v-for="(file, index) of files" :key="file.name + file.type + file.size"
                 class="p-fileupload-file gi-upload-file-details">
                <div class="file-warp">
                    <img role="presentation"
                         class="p-fileupload-file-thumbnail"
                         :alt="file.name" :src="file.objectURL"
                         width="50">
                </div>

                <div class="p-fileupload-file-details">
                    <div class="p-fileupload-file-name">
                        {{ file.name }},
                        <small><strong>{{ formatSize(file.size) }}</strong></small>
                    </div>

                    <span class="p-badge p-component p-badge-warning p-fileupload-file-badge">
                        Pending
                    </span>

                </div>



                <div class="p-fileupload-file-actions">
                    <Button icon="pi pi-times"
                            @click="removeFileCallback(index)"
                            outlined rounded  severity="danger" />
                </div>
            </div>
        </template>
    </FileUpload>

</template>

