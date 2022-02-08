<template>
    <div>
        <div class="switches-section is-clearfix" v-if="show_controls">
            <b-field class="is-pulled-right" grouped>
                <b-switch v-model="set_map_center"
                          v-if="!is_add_marker"
                          type="is-success">
                    Set Map Center
                </b-switch>

                <!--<b-switch v-model="hide_labels"
                          :disabled="set_map_center"
                          type="is-success">
                    Hide Labels
                </b-switch>-->

                <b-switch v-model="is_add_marker"
                          :disabled="set_map_center || is_remove_marker"
                          type="is-success">
                    <span v-if="!this.is_edit_ready">Add Markers</span>
                    <span v-else>Add/Edit Markers</span>
                </b-switch>

                <!--<b-switch v-model="is_remove_marker"
                          :disabled="set_map_center"
                          type="is-success">
                    Remove Markers
                </b-switch>-->
            </b-field>
        </div>


        <div class="pointers-list has-margin-bottom-20 has-margin-top-10" v-if="markers.length && show_map_pointers">
            <b-table :data="markers"
                     bordered
                     striped
                     narrowed
            >
                <b-table-column field="index" label="#" v-slot="props" width="40">
                    {{ props.index + 1 }}
                </b-table-column>
                <b-table-column field="name" label="Marker Name" v-slot="props">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="actions" label="Actions" v-slot="props">
                    <b-field  grouped>
                        <b-field>
                            <p class="control">
                                <b-button size="is-small" type="is-info" icon-left="eye" @click="viewMarker(props.row)" >
                                    View Marker
                                </b-button >

                            </p>
                            <p class="control">
                                <b-button
                                    size="is-small"
                                    icon-right="times"
                                    type="is-danger"
                                    @click="removeMarker(props.row)"/>
                            </p>
                        </b-field>

                        <b-field>
                            <p class="control" >
                                <b-button
                                    v-if="!hasPointer(props.row)"
                                    size="is-small"
                                    type="is-success"
                                    icon-left="plus"
                                    @click="addPointerForMarker(props.row)"
                                    :disabled="is_adding_pointer"
                                >
                                    Add Pointer
                                </b-button >
                            </p>
                            <p class="control">
                                <b-button
                                    v-if="hasPointer(props.row)"
                                    size="is-small"
                                    type="is-info"
                                    icon-left="eye"
                                    @click="viewPointer(props.row)">
                                    View Pointer
                                </b-button >
                            </p>
                            <p class="control">
                                <b-button
                                    v-if="hasPointer(props.row)"
                                    size="is-small"
                                    icon-right="times"
                                    type="is-danger"
                                    @click="removePointer(props.row)"/>
                            </p>

                        </b-field>


                    </b-field>


                </b-table-column>

            </b-table>
        </div>



        <!--Pointer modal-->
        <div class="modal-table-main sky-popup authorization-modal" v-if="active_pointer">
            <div class="modal" :class="{ 'is-active': is_pointer_modal_open }">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="modal-card modal-card-marign has-width-350">
                        <header class="modal-card-head">
                            <h6 class="modal-card-title">{{active_pointer.name}} Marker's Pointer</h6>
                            <button
                                dusk="sku-modal-close-btn"
                                class="delete modal-close"
                                @click="is_pointer_modal_open = false"
                                aria-label="close">
                            </button>
                        </header>
                        <div class="modal-table-start b-table has-background-white">
                            <table class="table is-bordered" >
                                <tr>
                                    <th>
                                        Pointer Latitude
                                    </th>
                                    <th>
                                        Pointer Longitude
                                    </th>
                                </tr>


                                <tr>
                                    <td>{{active_pointer.position.lat}}</td>
                                    <td>{{active_pointer.position.lng}}</td>
                                </tr>


                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/Pointer modal-->



        <!--Marker modal-->
        <div class="modal-table-main sky-popup authorization-modal" v-if="active_marker">
            <div class="modal" :class="{ 'is-active': is_marker_modal_open }">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="modal-card modal-card-marign has-width-350">
                        <header class="modal-card-head">
                            <h6 class="modal-card-title">{{active_marker.name}} Marker</h6>
                            <button
                                dusk="sku-modal-close-btn"
                                class="delete modal-close"
                                @click="is_marker_modal_open = false"
                                aria-label="close">
                            </button>
                        </header>
                        <div class="modal-table-start has-background-white">
                            <table class="table is-bordered">
                                <tr>
                                    <th>
                                        Marker Latitude
                                    </th>
                                    <th>
                                        Marker Longitude
                                    </th>
                                </tr>


                                <tr>
                                    <td>{{active_marker.position.lat}}</td>
                                    <td>{{active_marker.position.lng}}</td>
                                </tr>


                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/Marker modal-->


        <div class="has-margin-10">
            <b-message size="is-small" type="is-info" v-if="set_map_center">
                Drag map and click to set map center
            </b-message>
            <b-message  size="is-small" type="is-info" v-if="is_marker_mode && !is_adding_pointer">
                <span v-if="!is_remove_marker">Now, you can click on map to add markers</span>
                <span v-else>Click on any marker to remove it</span>
            </b-message>

            <b-message size="is-small" type="is-info" v-if="is_adding_pointer">
                Please click on the map to add pointer
            </b-message>
        </div>


        <GmapMap
            ref="map"
            :key="map_key"
            :center='center'
            :zoom='zoom'
            :style='custom_style'
            :map-type-id='map_type_id'
            :option="{
                rotateControl: true,
                streetViewControl: false,
            }"
            @click="mapClicked"
        >
            <!--@NOTE
            To add marker labels add the following attributes
            :label="!hide_labels?{text: m.name, color: '#fff', fontWeight: '900', y:'100px'}:null"
            -->

            <!--Flag Markers-->
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="is_marker_mode && !is_adding_pointer"
                :draggable="is_marker_mode && !is_adding_pointer"
                :icon="image_url+'/'+marker_icon"
                @click="markerClicked(m,index)"
                @dragend="markerDragged($event, m)"
            />
            <!--/Flag Markers-->


            <!--Map Pointers-->
            <GmapMarker
                v-if="show_map_pointers"
                :key="index+100"
                v-for="(m, index) in pointers"
                :position="m.position"
                :clickable="is_marker_mode"
                :draggable="is_marker_mode"
                :icon="image_url+'/'+pointer_icon"
                @dragend="pointerDragged($event, m)"
            />
            <!--/Map Pointers-->

        </GmapMap>


       <!-- <div id="floating-panel">
            <input id="add-pointer" type="button" value="Add Pointer" @click="addPointer()" />
            <input id="remove-pointer" type="button" value="Remove Pointer" />
        </div>-->

    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: 'GoogleMapMarkers',
        props: {
            map_key: Number,
            latitude: {
                type: String | Number,
                default: 0
            },
            longitude: {
                type: String | Number,
                default: 0
            },
            zoom: {
                type: String | Number,
                default: 16
            },
            custom_style: {
                type: String,
                default: 'width:100%;  height: 400px;'
            },

            map_type_id: {
                type: String,
                default: 'satellite'
            },
            show_controls: {
                type: Boolean,
                default: true,
            },
            is_rotatable: {
                type: Boolean,
                default: true,
            },
            image_url: {
                type: String,
                default: null
            },
            marker_icon: {
                type: String,
                default: null
            },
            pointer_icon: {
                type: String,
                default: null
            },
            rotate_left_icon: {
                type: String,
                default: null
            },
            rotate_right_icon: {
                type: String,
                default: null
            },
            heading: {
                type: String | Number,
                default: '0'
            },
            tilt: {
                type: String | Number,
                default: '0'
            },
            is_edit_ready: { // sets add marker default to true and changes its switch label
                type: Boolean,
                default: false
            },
            show_map_pointers: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            google: gmapApi,
            is_marker_mode() {
                return this.is_add_marker || this.is_remove_marker;
            },
            center() {
                return {
                    lat: parseFloat(this.latitude),
                    lng: parseFloat(this.longitude)
                }
            }
        },
        data() {
            return {
                currentPlace: null,
                places: [],
                set_map_center: false,
                hide_labels: true,
                is_add_marker: this.is_edit_ready,
                is_remove_marker: false,
                show_floating_panel: false,
                active_marker: null,
                active_pointer: null,
                is_pointer_modal_open: false,
                is_marker_modal_open: false,
                is_adding_pointer: false,
            }
        },
        inject: ['markers','pointers'],
        watch: {
            set_map_center(new_val) {
                if (new_val) {
                    this.hide_labels = false;
                    this.is_add_marker = false;
                    this.is_remove_marker = false;
                }
            },
        },

        mounted() {
            this.onLoad();
        },
        methods: {
            //-----------------------------------------------------------------------------
            onLoad() {
                this.setRotateControls();
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            setRotateControls(place) {
                let self = this;

                this.$refs.map.$mapPromise.then((map) => {
                    const buttons = [
                        ["Rotate Left", "rotate", 10, self.google.maps.ControlPosition.LEFT_CENTER],
                        ["Rotate Right", "rotate", -10, self.google.maps.ControlPosition.RIGHT_CENTER],
                    ];

                    buttons.forEach(([text, mode, amount, position]) => {
                        const controlDiv = document.createElement("div");
                        const controlUI = document.createElement("b-button");

                        controlUI.classList.add("ui-button");
                        if (`${text}` === 'Rotate Left') {
                            controlUI.innerHTML = `<img src='` + self.image_url + `/` + self.rotate_left_icon + `' width='40px'/>`;
                        } else {
                            controlUI.innerHTML = `<img src='` + self.image_url + `/` + self.rotate_right_icon + `' width='40px'/>`;
                        }


                        controlUI.addEventListener("click", () => {
                            self.rotateMap(amount);
                        });
                        controlDiv.appendChild(controlUI);
                        map.controls[position].push(controlDiv);
                    });
                });

            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            mapClicked(e) {
                if (!this.set_map_center) {
                    if(this.is_adding_pointer){
                        this.addPointer(e);
                    }else{
                        this.addMarker(e);
                    }
                } else {

                    let pos = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                    };
                    let self = this;

                    this.$refs.map.$mapPromise.then((map) => {
                        map.panTo(pos);
                        map.setZoom(self.zoom);
                        self.$emit('centerChanged', pos);
                    });

                }
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            addMarker(e) {
                if (!this.is_add_marker) return;

                this.$buefy.dialog.prompt({
                    message: `Please enter marker name`,
                    inputAttrs: {
                        placeholder: 'e.g. Marker 1',
                        maxlength: 10
                    },
                    trapFocus: true,
                    onConfirm: (name) => {
                        if(this.markerExists(name)){
                            this.$vaah.toastErrors(['Marker with same name already exists']);
                            return;
                        }

                        const position = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        };
                        let marker = {
                            name: name,
                            position: position
                        };
                        this.markers.push(marker);


                        this.show_floating_panel = true;
                        this.active_marker = marker;


                    }
                });
            },
            //-----------------------------------------------------------------------------
            markerExists(name){
                let list = this.markers.filter(item=>{
                    return item.name === name;
                });

                return list.length>0;
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            markerClicked(marker, index) {
                if (!this.is_marker_mode) return;
                if (this.is_adding_pointer) return;

                /*if (this.is_remove_marker) {
                    this.removeMarker(index);
                    return;
                }*/

                this.$buefy.dialog.prompt({
                    message: `Rename marker: `,
                    inputAttrs: {
                        placeholder: 'e.g. Marker 1',
                        maxlength: 10,
                        value: marker.name
                    },
                    trapFocus: true,
                    onConfirm: (name) => {
                        marker.name = name;
                    }
                });
            },
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            markerDragged(e, marker) {
                //if(!this.is_marker_mode) return;

                marker.position = e.latLng;
            },
            //-----------------------------------------------------------------------------
            pointerDragged(e, pointer){
                pointer.position = e.latLng;
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            removeMarker(marker) {
                //this.markers.splice(index, 1);
                this.removeByAttr(this.markers, 'name', marker.name);
                this.removePointer(marker);
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            rotateMap(amount) {
                let map = this.$refs.map.$mapObject;
                let heading = map.heading ? map.heading + amount : amount;


                map.setHeading(heading);
                map.heading = heading;
                map.panTo(this.center);

            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            addPointerForMarker(marker) {
                this.active_marker = marker;
                this.is_adding_pointer = true;
            },
            //-----------------------------------------------------------------------------
            addPointer(e) {
                const position = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                };
                this.pointers.push({
                    name: this.active_marker.name,
                    position: position
                });

                this.active_marker = null;
                this.is_adding_pointer = false;
            },
            //-----------------------------------------------------------------------------

            //-----------------------------------------------------------------------------
            viewPointer(marker){
                let list = this.pointers.filter(item=>{
                   return item.name === marker.name;
                });

                if(list.length<1) {
                    this.$vaah.toastErrors(['No pointers found']);
                    return null;
                }

                this.active_pointer = list[0];
                this.is_pointer_modal_open = true;

            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            viewMarker(marker){
                let list = this.markers.filter(item=>{
                    return item.name === marker.name;
                });

                if(list.length<1) {
                    this.$vaah.toastErrors(['No markers found']);
                    return null;
                }

                this.active_marker = list[0];
                this.is_marker_modal_open = true;
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            hasPointer(marker){
                let list = this.pointers.filter(item=>{
                    return item.name === marker.name;
                });

                return list.length>0;
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            removePointer(marker){
                this.removeByAttr(this.pointers, 'name', marker.name);
            },
            //-----------------------------------------------------------------------------
            removeByAttr(arr, attr, value){
                let i = arr.length;
                while(i--){
                    if( arr[i]
                        && arr[i].hasOwnProperty(attr)
                        && (arguments.length > 2 && arr[i][attr] === value ) ){

                        arr.splice(i,1);

                    }
                }
                return arr;
            }
            //-----------------------------------------------------------------------------

        }
    }
</script>

<style scoped>
    .switches-section{
        margin: 0;
    }
    .info-text{
        color: #296fa8
    }
    label{
        margin-left: 5px;
    }

</style>
