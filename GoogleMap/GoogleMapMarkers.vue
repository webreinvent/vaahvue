<template>
    <div>
        <div class="switches-section is-clearfix" v-if="show_controls">
            <b-field class="is-pulled-right" grouped>
                <b-switch v-model="set_map_center"
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

                <b-switch v-model="is_remove_marker"
                          :disabled="set_map_center"
                          type="is-success">
                    Remove Markers
                </b-switch>
            </b-field>
        </div>

        <div class="has-margin-10">
            <b-message size="is-small" type="is-info" v-if="set_map_center">
                Drag map and click to set map center
            </b-message>
            <b-message  size="is-small" type="is-info" v-if="is_marker_mode">
                <span v-if="!is_remove_marker">Now, you can click on map to add markers</span>
                <span v-else>Click on any marker to remove it</span>
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
                v-if="!set_map_center"
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="is_marker_mode"
                :draggable="is_marker_mode"
                :icon="image_url+'/'+marker_icon"
                @click="markerClicked(m,index)"
                @dragend="markerDragged($event, m)"
            />
            <!--/Flag Markers-->


            <!--Map Pointers-->
            <GmapMarker
                :key="index"
                v-for="(m, index) in pointers"
                :position="m.position"
                :clickable="is_marker_mode"
                :draggable="is_marker_mode"
                :icon="image_url+'/'+pointer_icon"
                @click="markerClicked(m,index)"
                @dragend="markerDragged($event, m)"
            />
            <!--Map Pointers-->


        </GmapMap>


        <div id="floating-panel">
            <input id="add-pointer" type="button" value="Add Pointer" @click="addPointer()" />
            <input id="remove-pointer" type="button" value="Remove Pointer" />
        </div>

    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: 'GoogleMapMarkers',
        props: {
            map_key: Number,
            latitude: {
                type: String|Number,
                default: 0
            },
            longitude: {
                type: String|Number,
                default: 0
            },
            zoom: {
                type: String|Number,
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
            show_controls:{
                type: Boolean,
                default: true,
            },
            is_rotatable:{
                type: Boolean,
                default: true,
            },
            image_url:{
                type: String,
                default: null
            },
            marker_icon:{
                type: String,
                default: null
            },
            pointer_icon:{
                type: String,
                default: null
            },
            rotate_left_icon:{
                type: String,
                default: null
            },
            rotate_right_icon:{
                type: String,
                default: null
            },
            heading:{
                type: String|Number,
                default: '0'
            },
            tilt:{
                type: String|Number,
                default: '0'
            },
            is_edit_ready:{ // sets add marker default to true and changes its switch label
                type: Boolean,
                default: false
            },
            show_map_pointers:{
                type: Boolean,
                default: false
            }
        },
        computed: {
            google : gmapApi,
            is_marker_mode(){
                return this.is_add_marker || this.is_remove_marker;
            },
            center(){
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
                pointers: [], //@todo make this inject value
                show_floating_panel: false,
                active_marker: null,
            }
        },
        inject: ['markers'],
        watch:{
            set_map_center(new_val){
                if(new_val){
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
            onLoad(){
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
                            controlUI.innerHTML = `<img src='`+self.image_url+`/`+self.rotate_left_icon+`' width='40px'/>`;
                        } else {
                            controlUI.innerHTML = `<img src='`+self.image_url+`/`+self.rotate_right_icon+`' width='40px'/>`;
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
            mapClicked(e){
                if(!this.set_map_center){
                    if(this.active_marker){
                        this.addPointer(e);
                    }else{
                        this.addMarker(e)
                    }
                }
                else{

                    let pos = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                    };
                    let self = this;

                    this.$refs.map.$mapPromise.then((map) => {
                        map.panTo(pos);
                        map.setZoom(self.zoom);
                        self.$emit('centerChanged',pos);
                    });

                }
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            addMarker(e){
                if(!this.is_add_marker) return;

                this.$buefy.dialog.prompt({
                    message: `Please enter marker name`,
                    inputAttrs: {
                        placeholder: 'e.g. Marker 1',
                        maxlength: 10
                    },
                    trapFocus: true,
                    onConfirm: (name) => {
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
            markerClicked(marker, index){
                if(!this.is_marker_mode) return;

                if(this.is_remove_marker){
                    this.removeMarker(index);
                    return;
                }

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
            markerDragged(e, marker){
                //if(!this.is_marker_mode) return;

                marker.position = e.latLng;
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            removeMarker(index){
                this.markers.splice(index, 1);
            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            rotateMap(amount){
                let map = this.$refs.map.$mapObject;
                let heading = map.heading?map.heading + amount : amount;


                map.setHeading(heading);
                map.heading = heading;
                map.panTo(this.center);

            },
            //-----------------------------------------------------------------------------


            //-----------------------------------------------------------------------------
            addPointer(e){
                const position = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                };
                this.pointers.push({
                    name: this.active_marker.name,
                    position: position
                });
            }
            //-----------------------------------------------------------------------------

        },
    };
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
