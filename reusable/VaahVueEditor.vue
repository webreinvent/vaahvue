<template>
        <div class="tiptap-editor">

            <!--editor-menu-bar-->
            <div class="editor-menu-bar">
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <b-field>

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

                    </div>
                </editor-menu-bubble>

            </div>

            <div class="tiptap-editor-content wysiwyg">
                <editor-content rows="15"  :editor="editor" />
            </div>
        </div>
</template>

<style>
    .ProseMirror {
        min-height: 200px;

    }
</style>

<script>

    import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
    import { Blockquote,  CodeBlock, HardBreak, Heading, OrderedList, BulletList,
        ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History,
        Image,

    } from 'tiptap-extensions';

    export default {
        props:{
            value: {
                type: String,
                default: function () {
                    return null
                }
            }
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
            'value' (new_val, old_val) {
                if(!new_val)
                {
                    this.editor.clearContent();
                } else {
                    this.setEditorContent(new_val);
                }
            }

        },
        mounted() {
            //----------------------------------------------------
            this.editor = this.setupEditor();

            this.setEditorContent(this.value);
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
            setEditorContent: function (content) {
                console.log('--->content', content);
                this.editor.setContent(content);

                this.$nextTick(() => {
                    this.editor.focus();
                });

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
                command({ href: url });
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

