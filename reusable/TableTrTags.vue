<template>

    <tr>
        <th align="right">{{$vaah.toLabel(label)}}</th>
        <td colspan="2">
            <b-tag v-if="value" v-for="(item, index) in value"
                   :key="index">
                <span v-if="column_to_display">
                    {{item[column_to_display]}}
                </span>
                <span v-else>
                    {{item}}
                </span>
            </b-tag>
        </td>

    </tr>

</template>
<script>

    export default {
        name: "TableTrTags",
        props: {
            label: {
                type: String,
            },
            value: {
                type: Object||Array,
            },
            column_to_display: {
                type: String,
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
            //---------------------------------------------------------------------
        }
    }

</script>
