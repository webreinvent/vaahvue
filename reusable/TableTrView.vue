<template>



    <tr v-if="label == 'created_at' || label == 'updated_at' || label == 'deleted_at'">
        <th :width="set_width" align="right">{{toLabel(label)}}</th>
        <td colspan="2">
            <span v-if="value">
                {{value}}
                <small>
                    / {{$vaah.fromNow(value)}}
                </small>
            </span>
        </td>

    </tr>
    <tr v-else>
        <th width="130" align="right">{{toLabel(label)}}</th>
        <td>{{value}}</td>
        <td width="20">
            <span v-if="is_copiable">
                <vh-copy :data="''+value+''"
                         confirm_dialog="buefy">
                <b-icon icon="copy"></b-icon>
                </vh-copy>
            </span>

        </td>
    </tr>



</template>

<script>
    import {VaahHelper as Vaah} from "./../helpers/VaahHelper";

    export default {
        name: "TableTrView",
        props: ['value', 'label', 'is_copiable', 'is_upper_case', 'width'],
        computed:{

        },
        components:{
        },
        data()
        {
            let obj = {
                set_width: 130
            };

            return obj;
        },
        created() {

        },
        watch: {

        },
        mounted() {

            if(this.width)
            {
                this.set_width = this.width;
            }


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

