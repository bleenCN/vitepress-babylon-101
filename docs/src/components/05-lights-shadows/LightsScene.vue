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
import { LightColorConfig, LightType, LightsScene } from "./LightsScene";
import VueGui from "../common/VueGui.vue";

import { GUI } from "dat.gui";

interface LightsGuiParams {
  lightType: LightType;
  intensity: number;
  lightColorConfig: LightColorConfig;
  test: number;
}

const guiParams: LightsGuiParams = {
  lightType: "hemiLight",
  intensity: 1,
  lightColorConfig: {
    diffuse: "#ffffff",
    specular: "#ffffff",
    ground: "#000000",
  },
  test: 0,
};

let gui: GUI;
const getGui = (_gui: GUI) => (gui = _gui);
const guiInit = () => {
  const lightTypes: LightType[] = [
    "directionalLight",
    "hemiLight",
    "pointLight",
    "spotLight",
  ];
  gui.add(guiParams, "lightType", lightTypes).onChange((type: LightType) => {
    lightsScene?.createLight(type);
  });

  gui
    .add(guiParams, "intensity", 0, 30)
    .step(0.1)
    .onChange((value: number) => lightsScene?.setLightIntensity(value));

  const colors = gui.addFolder("colors");
  colors
    .addColor(guiParams.lightColorConfig, "diffuse")
    .onChange(() => lightsScene?.setLightColors(guiParams.lightColorConfig));
  colors
    .addColor(guiParams.lightColorConfig, "specular")
    .onChange(() => lightsScene?.setLightColors(guiParams.lightColorConfig));
  colors
    .addColor(guiParams.lightColorConfig, "ground")
    .onChange(() => lightsScene?.setLightColors(guiParams.lightColorConfig));
  colors.open();

  gui
    .add(guiParams, "test", 0, 1)
    .step(0.01)
    .onChange((v) => console.log(v));
};
onMounted(guiInit);

const canvasRef = ref<HTMLCanvasElement | null>(null);

const lightColorConfig = reactive<LightColorConfig>({
  diffuse: "#ffffff",
  specular: "#ffffff",
  ground: "#000000",
});

let lightsScene: LightsScene | undefined;

const colorChangeHandler = () => {
  lightsScene?.setLightColors(lightColorConfig);
};

onMounted(() => {
  const canvas = canvasRef.value;
  lightsScene = new LightsScene(canvas!);

  lightsScene.createLight("hemiLight");
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
