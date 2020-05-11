<template>

    <b-field :label="label"
             :labelPosition="labelPosition" >


        <div class="tiptap-editor" :class="size+' '+custom_class">

            <!--editor-menu-bar-->
            <div class="editor-menu-bar">
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <b-field>

                            <p class="control">
                                <b-tooltip label="Undo" type="is-dark">
                                    <b-button icon-left="undo"
                                              @click="commands.undo">
                                    </b-button>
                                </b-tooltip>
                            </p>

                            <p class="control">
                                <b-tooltip label="Redo" type="is-dark">
                                <b-button icon-left="redo"
                                          @click="commands.redo">
                                </b-button>
                                </b-tooltip>
                            </p>

                            <p class="control">
                                <b-button icon-left="bold"
                                          :class="{ 'is-active': isActive.bold() }"
                                          @click="commands.bold">
                                </b-button>
                            </p>
                            <p class="control">
                                <b-button icon-left="italic"
                                          :class="{ 'is-active': isActive.italic() }"
                                          @click="commands.italic">
                                </b-button>
                            </p>

                            <p class="control">
                                <b-button icon-left="underline"
                                          :class="{ 'is-active': isActive.underline() }"
                                          @click="commands.underline">
                                </b-button>
                            </p>

                            <p class="control">
                                <b-button icon-left="strikethrough"
                                          :class="{ 'is-active': isActive.strike() }"
                                          @click="commands.strike">
                                </b-button>
                            </p>

                            <p class="control">
                                <b-button :class="{ 'is-active': isActive.heading() }"
                                          @click="commands.heading({ level: 1 })"
                                          >
                                    H1
                                </b-button>
                            </p>



                            <p class="control">
                                <b-button :class="{ 'is-active': isActive.heading() }"
                                          @click="commands.heading({ level: 2 })"
                                >
                                    H2
                                </b-button>
                            </p>

                            <p class="control">
                                <b-button :class="{ 'is-active': isActive.heading() }"
                                          @click="commands.heading({ level: 3 })"
                                >
                                    H3
                                </b-button>
                            </p>

                            <p class="control">
                                <b-button icon-left="image"
                                          @click="showImagePrompt(commands.image)">
                                </b-button>
                            </p>


                            <p class="control">
                                <b-button icon-left="list-ul"
                                          :class="{ 'is-active': isActive.bullet_list() }"
                                          @click="commands.bullet_list">
                                </b-button>
                            </p>

                            <p class="control">
                                <b-button icon-left="list-ol"
                                          :class="{ 'is-active': isActive.ordered_list() }"
                                          @click="commands.ordered_list">
                                </b-button>
                            </p>

                            <p class="control">
                                <b-tooltip label="Redo" type="is-dark">
                                    <b-button icon-left="redo"
                                              @click="commands.redo">
                                    </b-button>
                                </b-tooltip>
                            </p>



                        </b-field>

                    </div>

                </editor-menu-bar>
            </div>
            <!--/editor-menu-bar-->


            <div class="editor-menu-bubble">

                <editor-menu-bubble class="menububble" :editor="editor"
                                    @hide="hideLinkMenu"
                                    v-slot="{ commands, isActive, getMarkAttrs, menu }">
                    <div
                        class="menububble"
                        :class="{ 'is-active': menu.isActive }"
                        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">



                        <p class="control">
                            <b-button icon-left="bold"
                                      class="menububble__button"
                                      :class="{ 'is-active': isActive.bold() }"
                                      @click="commands.bold">
                            </b-button>
                        </p>
                        <p class="control">
                            <b-button icon-left="italic"
                                      class="menububble__button"
                                      :class="{ 'is-active': isActive.italic() }"
                                      @click="commands.italic">
                            </b-button>
                        </p>

                        <p class="control">
                            <b-button icon-left="underline"
                                      class="menububble__button"
                                      :class="{ 'is-active': isActive.underline() }"
                                      @click="commands.underline">
                            </b-button>
                        </p>

                        <p class="control">
                            <b-button icon-left="strikethrough"
                                      class="menububble__button"
                                      :class="{ 'is-active': isActive.strike() }"
                                      @click="commands.strike">
                            </b-button>
                        </p>


                        <form class="menububble__form" v-if="linkMenuIsActive"
                              @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                            <input class="menububble__input" type="text" v-model="linkUrl"
                                   placeholder="https://"
                                   ref="linkInput" @keydown.esc="hideLinkMenu"/>
                            <b-button class="menububble__button"
                                      icon-left="minus"
                                    @click="setLinkUrl(commands.link, null)" type="button">
                            </b-button>
                        </form>

                        <template v-else>
                            <b-button
                                class="menububble__button"
                                @click="showLinkMenu(getMarkAttrs('link'))"
                                icon-left="link"
                                :class="{ 'is-active': isActive.link() }">
                            </b-button>
                        </template>


                    </div>
                </editor-menu-bubble>

            </div>

            <div class="tiptap-editor-content">
                <editor-content  :editor="editor" />
            </div>
        </div>


    </b-field>


</template>

<script>

import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import { Blockquote,  CodeBlock, HardBreak, Heading, OrderedList, BulletList,
    ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History,
    Image,

} from 'tiptap-extensions';

export default {
    props:{
        content: {
            type: String,
            default: function () {
                return null
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
    components: {
        EditorContent,
        EditorMenuBar,
        EditorMenuBubble,
    },
    data()
    {
        let obj = {
            editor: null,
            editor_html: null,
            linkUrl: null,
            linkMenuIsActive: false,
        };

        return obj;
    },

    created() {

    },
    watch: {
    },
    mounted() {
        //----------------------------------------------------
        this.editor = this.setupEditor();
        this.setEditorContent();
        //----------------------------------------------------
    },
    methods: {
        //----------------------------------------------------
        setupEditor: function()
        {
            let editor = new Editor({
                extensions: [
                    new Blockquote(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new BulletList(),
                    new OrderedList(),
                    new ListItem(),
                    new TodoItem(),
                    new TodoList(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Link(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    new Image(),

                ],
                content: '<p>Write...</p>',
                onUpdate: ({ getJSON, getHTML }) => {
                    this.editor_html = getHTML();
                    this.emitOnInput();
                },
            });
            return editor;
        },
        //---------------------------------------------------------------------
        setEditorContent: function () {
            this.editor.setContent(this.content);
        },
        //----------------------------------------------------
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href
            this.linkMenuIsActive = true
            this.$nextTick(() => {
                this.$refs.linkInput.focus()
            })
        },
        //----------------------------------------------------

        hideLinkMenu() {
            this.linkUrl = null
            this.linkMenuIsActive = false
        },
        //----------------------------------------------------

        setLinkUrl(command, url) {
            command({ href: url })
            this.hideLinkMenu()
        },
        //----------------------------------------------------
        showImagePrompt(command) {
            const src = prompt('Enter the url of your image here');
            if (src !== null) {
                command({ src })
            }
        },
        //----------------------------------------------------
        //----------------------------------------------------
        emitOnInput: function () {
            this.editor_html = this.editor.getHTML();
            this.$emit('input', this.editor_html);
        },
        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------
    },
    beforeCreate() {
        console.log('for created-->');
        if(this.editor)
        {
            this.editor.destroy()
        }
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

