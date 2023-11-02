<template>

    <div>
        <Calendar v-model="content_value"
                  dateFormat="dd/mm/yy"
                  class="w-full p-inputgroup"
                  inputClass="p-inputtext-sm"
                  :placeholder="props.placeholder"
                  panelClass="p-0"
                  :panelStyle="{minWidth: 'max-content',width: 'max-content'}"
                  showIcon
                  :pt="{
                      dropdownButton: {
                          root: 'p-button-sm'
                      },
                      table: {
                          class: 'm-0',
                          style: {
                              fontSize: '0.7rem'
                          }
                      },
                      group: 'p-2',
                      header: 'p-0 pb-1',
                      tableHeaderCell: 'p-1',
                      title: 'line-height-1',
                      previousButton: {
                          style: {
                              height: '1.5rem',
                              width: '1.5rem'
                          }
                      },
                      previousIcon: {
                          style: {
                              height: '0.65rem',
                              width: '0.65rem'
                          }
                      },
                      nextButton: {
                          style: {
                              height: '1.5rem',
                              width: '1.5rem'
                          }
                      },
                      nextIcon: {
                          style: {
                              height: '0.65rem',
                              width: '0.65rem'
                          }
                      },
                      container: 'pt-1',
                      weekDay: {
                          style: {
                              fontWeight: '500'
                          }
                      },
                      monthTitle: 'p-0',
                      yearTitle: 'p-0',
                      day: 'p-1',
                      dayLabel: {
                          style: {
                              height: '1.5rem',
                              width: '1.5rem',
                          }
                      }
                  }"
        />
    </div>

</template>

<script setup>
import { computed } from 'vue';
import moment from 'moment/moment';
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

const content_value = computed({
    // getter
    get() {
        const content = props.content;
        const content_value = new Date(Date.parse(content.toString()));
        return content_value;
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        emit('onInput', newValue);
    }
})
</script>

<style scoped>



</style>
