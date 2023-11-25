<template>
    <div  v-if="content_value.list && content_value.list.length"
          class="p-inputgroup mb-1" data-pc-name="inputgroup" data-pc-section="root"
          v-for="(list, index) in content_value.list"
          :key="index">
        <InputText type="text"
                   style="width: 50%;"
                   v-model="content_value.list[index]"
                   class="p-inputtext-sm mb-1"
        />
        <Button icon="pi pi-trash"
                class="p-button-sm mb-1"
                aria-label="Delete"
                @click="deleteContentItem(index)"
        />
    </div>
    <div class="p-inputgroup" data-pc-name="inputgroup" data-pc-section="root">
        <InputText type="text"
                       style="width: 50%;"
                       v-model="content_value.item"
                       :placeholder="'Add New Item'"
                       class="p-inputtext-sm"
            />
            <Button icon="pi pi-plus"
                    class="p-button-sm"
                    aria-label="Add"
                    @click="addNewContentItem()"
            />
    </div>

</template>

<script setup>
import { reactive, watch} from 'vue'
const emit = defineEmits(["onInput"]);
const props = defineProps({
    content: {
        type: [Array, String],
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
})

const content_value = reactive({

    item: null,
    list : typeof props.content === 'object' ?  props.content : typeof props.content === 'string' ?  [props.content] : []
})

watch(content_value, (newValue, oldValue) => {
    emit('onInput', newValue.list);
})
const addNewContentItem = () => {
    content_value.list.push(content_value.item);
    content_value.item = null;
}
const deleteContentItem = (index) => {
    content_value.list.splice(index, 1);
}
</script>

<style scoped>



</style>
