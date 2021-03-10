<template>

    <b-field :label="label"
             v-if="json"
             :labelPosition="labelPosition">
        <v-jsoneditor v-model="json"
                      ref="editor"
                      :options="options"
                      :plus="true"
                      @input="emitOnInput"
                      @error="onError">
        </v-jsoneditor>
    </b-field>


</template>

<script>
    import VJsoneditor from 'v-jsoneditor'
    export default {
        props:{
            content: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            type: {
                type: String,
                default: null,
            },
            size: {
                type: String,
                default: null,
            },
            custom_class: {
                type: String,
                default: null,
            },
            label: {
                type: String,
                default: null,
            },
            labelPosition: {
                type: String,
                default: null,
            },
            placeholder: {
                type: String,
                default: null,
            },
        },
        components:{
            VJsoneditor,
        },
        data()
        {
            let obj = {
                options:{
                    mode: 'code',
                },
                json: {}
            };

            return obj;
        },

        created() {

        },
        watch: {
            content: function (newVal, oldVal) {
                if(newVal)
                {
                    this.json = newVal;
                }
            }
        },
        mounted() {
            //----------------------------------------------------
            if(this.content)
            {
                console.log('--->this.content json', this.content);
                this.json = this.content;
            }
            //----------------------------------------------------
        },
        methods: {
            //----------------------------------------------------
            onError() {
                console.log('error')
            },
            //----------------------------------------------------
            onChange: function(e)
            {
                let json = this.$refs.editor.editor.get();
                console.log('json', json);
                this.emitOnInput(json);
            },
            //----------------------------------------------------
            emitOnInput: function (data) {
                this.$emit('input', this.json);
            },
            //----------------------------------------------------
        },
    }
</script>

