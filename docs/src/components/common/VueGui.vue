<template>
  <div ref="guiRef" class="gui">
    <div class="title">dat.gui</div>
  </div>
</template>

<script setup lang="ts">
import { GUI } from 'dat.gui';
import { onMounted, ref } from 'vue';

const emits = defineEmits<{
  (e: 'gui', value: GUI): void
}>()


const guiRef = ref<HTMLDivElement | null>(null)
const gui = new GUI()

onMounted(() => {
  const guicontainer = guiRef.value
  guicontainer?.appendChild(gui.domElement)
  emits('gui', gui)
})
</script>

<style>
.gui {
  background: #000;
  color: #000;
}

.gui>.title {
  color: #fff;
  text-align: center;
}

.gui input,
.gui select {
  color: #000;
  -webkit-appearance: auto;
  appearance: auto;
  line-height: normal;
}

.gui .dg.a {
  margin-right: 0;
}
</style>