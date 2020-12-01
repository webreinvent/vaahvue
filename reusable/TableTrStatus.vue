<template>

    <tr>
        <th align="right"><span v-if="label">{{$vaah.toLabel(label)}}</span></th>
        <td colspan="2">
            <b-tag v-if="value == 'Yes' || value == 1" type="is-success" >
                Yes
            </b-tag>

            <b-tag v-else>No</b-tag>

        </td>
    </tr>

</template>
<script>

    export default {
        name: "TableTrStatus",
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
            //---------------------------------------------------------------------
        }
    }

</script>
