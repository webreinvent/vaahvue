<template>
    <content-loader>
        <rect x="25" y="10" rx="5" ry="5" width="30%" height="5" />
        <rect x="25" y="20" rx="5" ry="5" width="50%" height="5" />
        <rect x="25" y="30" rx="5" ry="5" width="80%" height="5" />
    </content-loader>
</template>

<script>

    import { ContentLoader } from "vue-content-loader";

    export default {
        name: "Loader",
        components:{
            ContentLoader,
        },
        data()
        {
            let obj = {

            };

            return obj;
        },

        created() {

        },
        watch: {

        },
        methods: {

            //---------------------------------------------------------------------
            //---------------------------------------------------------------------
        },
    }
</script>

