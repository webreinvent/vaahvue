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
        <td width="50">
            <span v-if="is_copiable">
                <b-button @click="copy(value)" type="is-text">
                <b-icon icon="copy"></b-icon>
                </b-button>
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
            copy: function (string)
            {
                if (!navigator.clipboard) {
                    this.fallbackCopy(string);
                    return;
                }

                let self = this;

                navigator.clipboard.writeText(string).then(function() {
                    self.$vaah.toastSuccess(['Copied']);
                }, function(err) {
                    self.$vaah.toastErrors(['Could not copied | '+err]);
                });

            },
            //----------------------------------------------------------
            fallbackCopy: function (string)
            {
                let textArea = document.createElement("textarea");
                textArea.value = string;

                // Avoid scrolling to bottom
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";

                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                let self = this;

                try {
                    let successful = document.execCommand('copy');
                    let msg = successful ? 'successful' : 'unsuccessful';
                    self.$vaah.toastSuccess(['Copied']);
                } catch (err) {
                    self.$vaah.toastErrors(['Could not copied | '+err]);
                }

                document.body.removeChild(textArea);
            },
            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
        },
    }
</script>

