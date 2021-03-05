<template>

    <tr >
        <th width="130" align="right">{{toLabel(label)}}</th>
        <td colspan="2">
            <span v-if="value">
                {{value}}
                <small>
                    / {{$vaah.fromNow(value)}}
                </small>
            </span>
        </td>

    </tr>

</template>

<script>
    import {VaahHelper as Vaah} from "./../helpers/VaahHelper";

    export default {
        name: "TableTrDateTime",
        props: ['value', 'label', 'is_upper_case'],
        computed:{

        },
        components:{
        },
        data()
        {
            let obj = {
                new_item: {
                }
            };

            return obj;
        },
        created() {

        },
        watch: {

        },
        methods: {
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
            toLabel: function(str)
            {
                if(!str)
                {
                    return null;
                }

                return Vaah.toLabel(str);
                //return str;
            },
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
        },
    }
</script>

