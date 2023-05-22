<template>
    <div ref="container" style="height: 90vh; width: 90%; margin: auto; position: relative;"></div>
</template>
  
<script>
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import Cookies from 'js-cookie';
export default {
    name: "WorldMap",
    data() {
        return {
            viewer: null,
            colors: [
                Cesium.Color.RED,
                Cesium.Color.GREEN,
                Cesium.Color.BLUE,
                Cesium.Color.YELLOW,
                Cesium.Color.PURPLE
            ]
        };
    },
    mounted() {
        Cesium.buildModuleUrl.setBaseUrl("/node_modules/cesium/Build/Cesium/");

        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDBjODljNC1hMzViLTRhZTEtYTZiMi0zOGMwZWFkYzJiZGUiLCJpZCI6MTMzNDE4LCJpYXQiOjE2ODEzMzQzNzd9.djV-ah9fU5K_kKAh570cNf1vZ90HGzySReJw8X73D1w";

        const container = document.createElement("div");
        const creditContainer = document.createElement("div");
        container.style.backgroundColor = "transparent";

        this.$refs.container.appendChild(container);

        this.viewer = new Cesium.Viewer(container, {
            terrainProvider: Cesium.createWorldTerrain(),
            imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }),
            baseLayerPicker: false,
            skyBox: false,
            skyAtmosphere: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: false,
            selectionIndicator: false,
            creditContainer: creditContainer,
            contextOptions: {
                webgl: { alpha: true },
                alpha: true,
            },
        });
        this.fetchClustersAndDrawPolygons();
        this.viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;

        const canvas = this.viewer.canvas;
        const handleWheel = (event) => {
            event.preventDefault();
            event.stopPropagation();

            const direction = event.deltaY < 0 ? 1.0 : -1.0;
            const zoomAmount = 0.05 * direction;
            viewer.camera.zoomIn(zoomAmount);
            viewer.camera.zoomoUT(zoomAmount);
        };
        canvas.addEventListener("wheel", handleWheel, { passive: false });
    },
    methods: {
        async fetchClustersAndDrawPolygons() {
            const token = Cookies.get('token');
            const response = await fetch("http://127.0.0.1:7000/api/users/nearby", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { clusters, currentUserClusterIndex, user } = await response.json();
            clusters.forEach((cluster, index) => {
                const rectangle = Cesium.Rectangle.fromDegrees(
                    cluster.minLongitude,
                    cluster.minLatitude,
                    cluster.maxLongitude,
                    cluster.maxLatitude
                );

                this.viewer.entities.add({
                    name: "Cluster",
                    rectangle: {
                        coordinates: rectangle,
                        material: this.colors[index % this.colors.length].withAlpha(0.5)
                    }
                });

                // Add a pin to the center of the user cluster
                if (index === currentUserClusterIndex) {
                    const centerLongitude = (cluster.minLongitude + cluster.maxLongitude) / 2;
                    const centerLatitude = (cluster.minLatitude + cluster.maxLatitude) / 2;


                    this.viewer.entities.add({
                        name: "User Cluster",
                        position: Cesium.Cartesian3.fromDegrees(user.user_longitude, user.user_latitude),
                        billboard: {
                            image: "../assets/pin.png",
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            scale: 0.05
                        }
                    });
                }
            });
        }
    }
};
</script>
  
<style scoped>
.cesium-viewer canvas {
    background-color: transparent !important;
}
</style>