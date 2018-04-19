<template>
  <div id="bills">
    <component v-bind:is="$store.state.billsComponent"></component>
  </div>
</template>

<script>
import BillsViewer from './billsviewer.vue'
import ActsEditor from './actseditor.vue'
export default {
  components: {
    BillsViewer,
    ActsEditor
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
