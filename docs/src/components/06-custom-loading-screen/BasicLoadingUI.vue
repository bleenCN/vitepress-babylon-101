<template>
  <div>
    <div class="container">
      <canvas ref="canvasRef" class="canvas" />
      <vue-gui class="gui" @gui="getGui" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vector3 } from '@babylonjs/core';
import { GUI } from 'dat.gui';
import { onMounted, ref } from 'vue';
import { BasicLoadingUI } from './BasicLoadingUI';
let gui: GUI;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const getGui = (_gui: GUI) => (gui = _gui);
interface guiParams {
  lightColor: Vector3 | string;
  intensity: number;
}

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = new BasicLoadingUI(canvas!)
})
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
