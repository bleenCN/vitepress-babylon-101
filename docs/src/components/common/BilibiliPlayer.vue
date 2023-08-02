<script setup lang="ts">
const props = defineProps<{
  url: string
}>()

</script>

<template>
  <iframe class="player" :src="props.url" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
    scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" />
</template>


<style scoped>
.player {
  width: 100%;
  height: auto;
}
</style>