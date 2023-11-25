<template>

    <div>

        <TreeSelect class="w-full"
                     v-model="content_value"
                     selectionMode="single"
                     :options="type_options"
                     placeholder="Select..."
        />

    </div>

</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {vaah} from '../../../pinia/vaah'
const emit = defineEmits(["onInput"]);
const props = defineProps({
    content: {
        type: [String,Number,Array,Object],
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
    is_multiple: {
        type: Boolean,
        default: false,
    },
    meta: {
        type: [Array,Object],
        default: function () {
            return []
        }
    },
    ajax_url: {
        type: String,
        default: null,
    },
})

onMounted(() => {
    console.log(1111);
    if(props.ajax_url&&props.meta){
        getOptions();
    }

})

const content_value = computed({
    // getter
    get() {
        if(props.content){
            let obj = {};
            obj = {...obj, [props.content] : true }

            return obj;
        }
        return null;
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        emit('onInput', newValue)
    }
})

function getOptions(){

    let options = {
        params:props.meta,
        method:'post'
    }

     vaah().ajax(
        props.ajax_url,
         getOptionsAfter,options
    );
}

const add_url = ref('');
const display_column = ref('');
const type_options = ref([]);

function getOptionsAfter(data,res){

    if(data){
        type_options.value = data.list;
        display_column.value = null;

        display_column.value = data.display_column;
        add_url.value = data.add_url;
    }

}
</script>


<style scoped>



</style>
