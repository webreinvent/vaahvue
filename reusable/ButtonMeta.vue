<template>
    <div>
        <b-button size="is-small"
                  @click="showModal"
                  :type="type"
                  rounded
                  icon-left="eye">
            {{label}}
        </b-button>

    </div>
</template>
<script>

import {ModalProgrammatic as Modal} from 'buefy';

export default {
    name: "ButtonMeta",
    props: {
        is_image: {
            type: Boolean,
            default: false
        },
        type: {
            type: Object | String,
            default: "is-default"
        },
        label: {
            type: String | Number,
            default: "View"
        },
        value: {
            type: Object | String,
            default: null
        },
    },
    computed: {},
    components: {},


    data() {
        let obj = {};

        return obj;
    },
    created() {
    },
    mounted() {

        //---------------------------------------------------------
        //---------------------------------------------------------

    },

    watch: {},
    methods: {
        //---------------------------------------------------------------------
        showModal: function () {

            let content_body = this.is_image ?
                `<p class="image"><img src="` + this.value + `"></p>` :
                `<pre class="is-size-6">` + JSON.stringify(this.value, null, 2) + `</pre>`;

            let content = `<div class="card">
                                 <div class="card-content">
                                    ${content_body}
                                 </div>
                           </div>`;

            let props = {
                scroll: 'keep',
                width: 640,
                content: `${content}`
            };

            Modal.open(props);
        },
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
    }
}

</script>
