<template>

    <div>
        <div class="p-inputgroup" data-pc-name="inputgroup" data-pc-section="root">
            <InputText type="text" v-model="content_value"
                       :placeholder="props.placeholder"
                       class="p-inputtext-sm" />
            <Button icon="pi pi-sync" @click="generateUuid()" />
        </div>

    </div>

</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue'
const emit = defineEmits(["onInput"]);
const props = defineProps({
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
})

let content_value = computed({
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

function generateUuid()
{
    emit('onInput', uuidv4())
}
</script>

<style scoped>



</style>
