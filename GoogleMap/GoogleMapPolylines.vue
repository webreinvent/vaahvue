<template>
    <div v-if="map_center">
        <gmap-map v-bind:center="map_center"
                  :map-type-id='map_type_id'
                  v-bind:zoom="zoom"
                  :style="{'width': width, 'height':height}" >

            <gmap-polyline v-bind:path.sync="points" v-bind:options="{ strokeColor:line_color}">
            </gmap-polyline>

            <!--Flag Markers-->
            <GmapMarker
                v-for="(marker, index) in markers"
                :key="index"
                :position="marker.position"
                :icon="image_url+'/'+marker_icon"
            />
            <!--/Flag Markers-->

        </gmap-map>


    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps'

    export default {
        name: 'GoogleMapPolylines',
        //------------------------------------------------------
        props: {
            center:{
                type: Object,
                default: null
            },
            zoom:{
                type: Number,
                default: 16
            },
            map_type_id: {
                type: String,
                default: 'satellite'
            },
            width:{
                type: String,
                default: '600px'
            },
            height:{
                type: String,
                default: '400px'
            },
            image_url:{
                type: String,
                default: null
            },
            marker_icon:{
                type: String,
                default: null
            },
            line_color:{
                type: String,
                default: '#f00'
            },
            initial_markers:{
                type: Array,
                default: null
            },
            initial_points:{
                type: Array,
                default: null
            },
            new_point:{
                type: Object,
                default: null
            }

        },
        //------------------------------------------------------
        computed: {
            google : gmapApi,
        },
        //------------------------------------------------------
        data() {
            return {
                map_center: {lat: 18.984738, lng: 72.820001},
                points: [],
                markers: [],
                add_point: null,

            }
        },
        //------------------------------------------------------
        mounted() {

            console.log('this.center--->', this.center);
            console.log('this.initial_markers--->', this.initial_markers);

            if(this.initial_markers)
            {

                this.markers = this.initial_markers;
            }

            if(this.initial_points)
            {
                this.points = this.initial_points;
            }

            if(this.center)
            {
                this.map_center = this.center;
            }

            this.onLoad();
        },
        //------------------------------------------------------
        watch:{
            new_point: function (newVal, oldVal)
            {
                if(newVal)
                {
                    this.points.push(newVal);
                }
            },
            center: function (newVal, oldVal)
            {
                if(newVal)
                {
                    this.map_center = newVal;
                }
            },

        },
        //------------------------------------------------------

        //------------------------------------------------------
        methods: {
            //-----------------------------------------------------------------------------
            onLoad(){
            },
            //-----------------------------------------------------------------------------
            addPoints: function ()
            {
                let lat = parseFloat("55.93"+Math.floor(Math.random() * 100000) + 1);
                let lng = parseFloat("-4.77"+Math.floor(Math.random() * 100000) + 1);
                let point = {lat: lat, lng: lng };
                this.path.push(point);
            },
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------

        },
    };
</script>

<style scoped>

</style>
