<template>
  <div>
    <div>
      <span>light type: </span>
      <vue-button
        v-for="lightType in lights.types"
        :type="lights.active === lightType ? 'brand' : 'alt'"
        @click="
          () => {
            lightTypeClickHandler(lightType);
          }
        "
      >
        {{ lightType }}
      </vue-button>
    </div>

    <div :style="{ display: 'flex', gap: '20px' }">
      <div class="color-container">
        <span>diffuse:</span
        ><input
          type="color"
          v-model="lightColorConfig.diffuse"
          name="diffuse"
          id="diffuse"
          @change="colorChangeHandler"
        />
      </div>
      <div class="color-container">
        <span>specular:</span
        ><input
          type="color"
          v-model="lightColorConfig.specular"
          name="specular"
          id="specular"
          @change="colorChangeHandler"
        />
      </div>
      <div
        class="color-container"
        :style="
          lights.active === 'hemiLight'
            ? {}
            : { opacity: 0.3, cursor: 'not-allowed', filter: 'grayscale(1)' }
        "
        title="Only available with HemiLight"
      >
        <span>ground:</span
        ><input
          :disabled="lights.active !== 'hemiLight'"
          type="color"
          :style="
            lights.active === 'hemiLight' ? {} : { cursor: 'not-allowed' }
          "
          v-model="lightColorConfig.ground"
          name="ground"
          id="ground"
          @change="colorChangeHandler"
        />
      </div>
    </div>

    <canvas ref="canvasRef" class="canvas" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import VueButton from "../common/VueButton.vue";
import { LightColorConfig, LightsScene } from "./LightsScene";

import * as dat from "dat.gui";

const gui = new dat.GUI();

export type LightType =
  | "hemiLight"
  | "pointLight"
  | "directionalLight"
  | "spotLight";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const lights = reactive<{ types: LightType[]; active: LightType }>({
  types: ["hemiLight", "pointLight", "directionalLight", "spotLight"],
  active: "hemiLight",
});

const lightColorConfig = reactive<LightColorConfig>({
  diffuse: "#ffffff",
  specular: "#ffffff",
  ground: "#000000",
});

let lightsScene: LightsScene | undefined;

const lightTypeClickHandler = (type: LightType) => {
  if (lights.active === type) return;

  lights.active = type;
  lightsScene?.removeLight();

  switch (type) {
    case "hemiLight":
      lightsScene?.createHemiLight();
      break;
    case "pointLight":
      lightsScene?.createPointLight();
      break;
    case "directionalLight":
      lightsScene?.createDirectionalLight();
      break;
    case "spotLight":
      lightsScene?.createSpotLight();
      break;
  }
};

const colorChangeHandler = () => {
  lightsScene?.setLightColors(lightColorConfig);
};

onMounted(() => {
  const canvas = canvasRef.value;
  lightsScene = new LightsScene(canvas!);
  lightsScene.createHemiLight();
});
</script>

<style>
.canvas {
  width: 100%;
  height: auto;
  margin-top: 20px;
}
.color-container {
  display: flex;
  align-items: center;
}
</style>
