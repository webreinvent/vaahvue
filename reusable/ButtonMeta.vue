<template>
    <b-button size="is-small"
              @click="showModal"
              :type="type"
              rounded
              icon-left="eye">
        {{label}}
    </b-button>
</template>
<script>

    import {ModalProgrammatic as Modal} from 'buefy';

    export default {
        name: "ButtonMeta",
        props: {
            type: {
                type: Object|String,
                default: "is-default"
            },
            label: {
                type: String|Number,
                default: "View"
            },
            value: {
                type: Object|String,
                default: null
            },
        },
        computed: {
        },
        components:{
        },


        data()
        {
            let obj = {

            };

            return obj;
        },
        created() {
        },
        mounted(){

            //---------------------------------------------------------
            //---------------------------------------------------------

        },

        watch: {

        },
        methods: {
            //---------------------------------------------------------------------
            showModal: function () {
                let props ={
                    width: 640,

                    scroll: 'keep',
                    content:  `<div class="card">
                                    <div class="card-content">
                                    <pre class="is-size-6">`+JSON.stringify(this.value, null, 2)+`</pre>
                                    </div>
                                </div>`,
                };

                Modal.open(props);
            },
            //---------------------------------------------------------------------

            //---------------------------------------------------------------------
        }
    }

</script>
