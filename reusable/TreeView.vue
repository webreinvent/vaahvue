<template>
    <div v-if="data">
        <vue-tree-list
                @delete-node="onDel"
                :model="data"
                v-bind:default-expanded="false"
        >
            <template v-slot:leafNameDisplay="slotProps">
        <span>
          <span class="muted">
              <b-tooltip label="Copy Id" type="is-dark">
                <vh-copy class="text-copyable"
                         :data="slotProps.model.id"
                         :label="'#'+slotProps.model.id"
                         @copied="copiedData">
                </vh-copy>
              </b-tooltip>
          </span>
            <b-tooltip label="Copy Slug" type="is-dark">
                <vh-copy class="text-copyable"
                         :data="slotProps.model.slug"
                         :label="slotProps.model.name"
                         @copied="copiedData">
                </vh-copy>
            </b-tooltip>
            <strong v-if="slotProps.model.children" class="muted">
                ({{ slotProps.model.children.length }})
            </strong>
        </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon">📂</span>
            <span class="icon" slot="editNodeIcon">📃</span>
            <span class="icon" slot="delNodeIcon">✂️</span>
        </vue-tree-list>
    </div>
</template>

<script>
    import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
    export default {
        props:{
            ajax_list_url: {
                type: String,
                required: true
            },
            options: {
                type: Array|Object,
                default: function () {
                    return []
                }
            },
            ajax_delete_url: {
                type: String,
                required: true
            }
        },
        components: {
            VueTreeList
        },
        watch: {
            options: function (newValue, oldValue) {
                if(newValue){
                    this.data = new Tree(
                        newValue
                    );
                }


            },
        },
        data() {
            return {
                newTree: {},
                data: null
            }
        },
        mounted() {
            // this.getList();

            console.log('221',this.options);

            if(this.options) {
                this.data = new Tree(
                    this.options
                );
            }



            // $("span[title]").css("display", "none");
        },
        methods: {
            getList() {
                this.$Progress.start();

                this.params = {};

                let url = this.ajax_list_url;
                this.$vaah.ajaxGet(url, this.params, this.getListAfter);
            },
            //---------------------------------------------------------------------
            getListAfter: function(data, res)
            {
                this.$Progress.finish();

                if(data){
                    this.data= new Tree(
                        data.list
                    )
                }
            },
            onDel(node) {
                this.$Progress.start();

                this.params = {
                    id : node.id
                };

                let url = this.ajax_delete_url;
                this.$vaah.ajax(url, this.params, this.onDelAfter);
            },
            //---------------------------------------------------------------------
            onDelAfter: function(data, res)
            {
                this.$Progress.finish();


                if(res.data.status === 'success'){

                    this.getList();

                }
            },
            copiedData: function (data) {

                this.$vaah.toastSuccess(['copied']);

                // alertify.success('copied');

                this.$vaah.console(data, 'copied data');

            },
        }
    }
</script>

<style>
    span[title="Add Tree Node"]{
        display: none;
    }
    span[title="Add Leaf Node"]{
        display: none;
    }
    span[title="edit"]{
        display: none;
    }
    span[title="delete"]{
        cursor: pointer;
    }
</style>

