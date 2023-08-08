<template>
  <div>
    <div class="container">
      <canvas ref="canvasRef" class="canvas" />
      <vue-gui class="gui" @gui="getGui" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import VueGui from "../common/VueGui.vue";
import { Shadow } from "./Shadow";
import { GUI } from "dat.gui";
import { Color3, Vector3 } from "@babylonjs/core";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let shadow: Shadow;
let gui: GUI;

const getGui = (_gui: GUI) => (gui = _gui);
interface guiParams {
  intensity: number;
  angle: number;
  exponent: number;
  mapSize: number;
}
const params: guiParams = {
  intensity: 1,
  angle: 90,
  exponent: 1,
  mapSize: 1024,
};
onMounted(() => {
  const lightF = gui.addFolder("light");
  lightF.open();
  lightF
    .add(params, "intensity", 0.1, 10)
    .step(0.01)
    .onChange((intensity) => shadow.setLightproperties({ intensity }));
  lightF
    .add(params, "angle", 0, 180)
    .step(0.01)
    .onChange((angle) =>
      shadow.setLightproperties({ angle: (angle / 180) * Math.PI })
    );
  lightF
    .add(params, "exponent", 0, 10)
    .step(0.01)
    .onChange((exponent) => shadow.setLightproperties({ exponent }));

  gui
    .add(params, "mapSize", 256, 2048)
    .step(1)
    .onChange((mapSize) => shadow.setShadowProperties({ mapSize }));
});

onMounted(async () => {
  const canvas = canvasRef.value;
  shadow = new Shadow(canvas!);
  await shadow.initModels();
  shadow.createLight();
  shadow.createGizmo(shadow.spotLight!);
  shadow.createShadow();
});
</script>

<style scoped>
.canvas {
  width: 100%;
  height: auto;
  margin-top: 20px;
}

.color-container {
  display: flex;
  align-items: center;
}

.container {
  position: relative;
}

.gui {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
