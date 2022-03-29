<template>

    <tr>
        <th align="right">{{$vaah.toLabel(label)}}</th>
        <td>
            <b-button size="is-small"
                      @click="showModal"
                      type="is-primary"
                      rounded
                      icon-left="eye">
                View
            </b-button>


        </td>



    </tr>

</template>
<script>

    import {ModalProgrammatic as Modal} from 'buefy';

    export default {
        name: "TableTrMeta",
        props: ['label', 'value'],
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
                                    <pre class="is-size-5">`+JSON.stringify(this.value, null, 2)+`</pre>
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
