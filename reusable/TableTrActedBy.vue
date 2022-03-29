<template>

    <tr>
        <th align="right">{{$vaah.toLabel(label)}}</th>
        <td colspan="2">
            <b-tag v-if="value && !fetch_by">
                {{value.name}}
            </b-tag>

            <b-tag v-if="value && fetch_by">
                {{value[fetch_by]}}
            </b-tag>
        </td>
    </tr>

</template>
<script>

    export default {
        name: "TableTrActedBy",
        props: ['label', 'value' ,'fetch_by'],
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
