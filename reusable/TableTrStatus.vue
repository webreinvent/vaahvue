<template>

    <tr>
        <th align="right">{{$vaah.toLabel(label)}}</th>
        <td colspan="2">
            <b-tag v-if="value == 'Yes'" type="is-success" >
                {{value}}
            </b-tag>

            <b-tag v-else>{{value}}</b-tag>

        </td>
    </tr>

</template>
<script>

    export default {
        name: "TableTrActedBy",
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
