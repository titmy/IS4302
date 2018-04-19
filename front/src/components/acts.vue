<template>
  <component v-bind:is="$store.state.actsComponent"></component>
</template>

<script>
import ActsViewer from './actsviewer.vue'
import ActsEditor from './actseditor.vue'
export default{
  components: {
    ActsViewer,
    ActsEditor
  },
  mounted () {
  },
  data: () => ({
    currentComponent: 'ActsViewer'
  })
}
</script>

<style scoped>
#acts-viewer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
