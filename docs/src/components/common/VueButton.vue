<template>
  <button :class="type">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { type } = defineProps<{ type: "brand" | "alt" | "sponsor" }>();
</script>

<style scoped>
button {
  margin: 4px;
  padding: 0 10px;
  border: 1px solid;
  border-radius: 4px;
}
button.brand {
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border-color: var(--vp-button-brand-border);
}
button.brand:hover {
  color: var(--vp-button-brand-hover-text);
  background: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}
button.brand:active {
  color: var(--vp-button-brand-active-text);
  background: var(--vp-button-brand-active-bg);
  border-color: var(--vp-button-brand-active-border);
}

button.alt {
  color: var(--vp-button-alt-text);
  background: var(--vp-button-alt-bg);
  border-color: var(--vp-button-alt-border);
}
button.alt:hover {
  color: var(--vp-button-alt-hover-text);
  background: var(--vp-button-alt-hover-bg);
  border-color: var(--vp-button-alt-hover-border);
}
button.alt:active {
  color: var(--vp-button-alt-active-text);
  background: var(--vp-button-alt-active-bg);
  border-color: var(--vp-button-alt-active-border);
}
button.sponsor {
  color: var(--vp-button-sponsor-text);
  background: var(--vp-button-sponsor-bg);
  border-color: var(--vp-button-sponsor-border);
}
button.sponsor:hover {
  color: var(--vp-button-sponsor-hover-text);
  background: var(--vp-button-sponsor-hover-bg);
  border-color: var(--vp-button-sponsor-hover-border);
}
button.alt:active {
  color: var(--vp-button-alt-active-text);
  background: var(--vp-button-alt-active-bg);
  border-color: var(--vp-button-alt-active-border);
}
</style>
