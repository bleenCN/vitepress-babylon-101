<template>
  <div>
    <div class="container">
      <canvas ref="canvasRef" class="canvas" />
      <vue-gui class="gui" @gui="getGui" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import VueGui from "../common/VueGui.vue";
import { BaseScene } from "./BaseScene";
import { GUI } from "dat.gui";
import { Color3, Vector3 } from "@babylonjs/core";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let baseScene: BaseScene;
let gui: GUI;

const getGui = (_gui: GUI) => (gui = _gui);
interface guiParams {
  lightColor: Vector3 | string;
  intensity: number;
}
const params: guiParams = {
  lightColor: new Color3(68 / 255, 227 / 255, 241 / 255).toHexString(),
  intensity: 1,
};
onMounted(() => {
  const pointLightF = gui.addFolder("pointLight");
  pointLightF.open();
  pointLightF
    .addColor(params, "lightColor")
    .onChange((diffuse) => baseScene.setPointLightProperties({ diffuse }));

  pointLightF
    .add(params, "intensity", 0.1, 5)
    .step(0.01)
    .onChange((intensity) => baseScene.setPointLightProperties({ intensity }));
});

onMounted(async () => {
  const canvas = canvasRef.value;
  baseScene = new BaseScene(canvas!);
  await baseScene.initModels();
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
