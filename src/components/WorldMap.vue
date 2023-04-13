<template>
    <div ref="container" style="height: 90vh; width: 90%; margin: auto; position: relative;"></div>
</template>
  
<script>
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
    name: "WorldMap",
    mounted() {
        Cesium.buildModuleUrl.setBaseUrl("/node_modules/cesium/Build/Cesium/");

        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDBjODljNC1hMzViLTRhZTEtYTZiMi0zOGMwZWFkYzJiZGUiLCJpZCI6MTMzNDE4LCJpYXQiOjE2ODEzMzQzNzd9.djV-ah9fU5K_kKAh570cNf1vZ90HGzySReJw8X73D1w";

        const container = document.createElement("div");
        const creditContainer = document.createElement("div");
        container.style.backgroundColor = "transparent";

        this.$refs.container.appendChild(container);

        const viewer = new Cesium.Viewer(container, {
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

        viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;

        const canvas = viewer.canvas;
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
};
</script>
  
<style scoped>
.cesium-viewer canvas {
    background-color: transparent !important;
}
</style>
  