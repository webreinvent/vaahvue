<template>

    <tr>
        <th align="right">{{$vaah.toLabel(label)}}</th>
        <td colspan="2">
            <b-tag v-if="value == 'Yes' || value == 1" type="is-success" >
                {{value}}
            </b-tag>

            <b-tag v-else>{{value}}</b-tag>

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
