<template>
    <div v-if="map_center">
        <gmap-map v-bind:center="map_center"
                  :map-type-id='map_type_id'
                  v-bind:zoom="zoom"
                  :style="{'width': width, 'height':height}" >
            <gmap-polyline v-bind:path.sync="points" v-bind:options="{ strokeColor:line_color}">
            </gmap-polyline>
        </gmap-map>

        <b-button @click="addPoints">Add Points</b-button>

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

            line_color:{
                type: String,
                default: '#f00'
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
                map_center: {lat: 18.984738, lng: 72.820000},
                points: [],
                add_point: null,

            }
        },
        //------------------------------------------------------
        watch:{
            new_point: function (newVal, oldVal)
            {
                if(newVal)
                {
                    console.log('new point--->', newVal);
                    this.points.push(newVal);

                    console.log('this.points--->', this.points);

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
        mounted() {
            if(this.initial_points)
            {
                this.points = this.initial_points;
            }

            if(this.center)
            {
                this.map_center = this.center;
            }

            console.log('--->', this.map_center);

            this.onLoad();
        },
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

                console.log('point--->', point);

                this.path.push(point);

                console.log('--->', this.path);


            },
            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------

        },
    };
</script>

<style scoped>

</style>
