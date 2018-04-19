<template>
  <div id="acts-viewer">
    <ActCard v-for="(e,i) in acts" :key="i" @click.native="showEditor(e)" :act="e"></ActCard>
  </div>
</template>

<script>
import ActCard from './actcard.vue'
export default {
  components: {
    ActCard
  },
  computed: {
    acts () {
      return (this.$store.state.actsList || []).filter(e => e.title.includes(this.$store.state.searchString) || e.chapter.includes(this.$store.state.searchString))
    },
    amendments () {
      return this.$store.state.amendments
    },
    bills () {
      return this.$store.state.bills
    }
  },
  methods: {
    showEditor (e) {
      console.log(e.billIds)
      var d = e.content
      var i = -1
      if ('billIds' in e) {
        for (i in e.billIds) {
          d = d.compose(this.amendments[this.bills[e.billIds[i]].amendmentIds[0]].content)
        }
      }
      this.$store.state.editorState = 0
      this.$store.state.title = e.title
      this.$store.state.description = e.description
      this.$store.state.chapter = e.chapter
      this.$store.state.editorContent = d
      this.$store.state.editorOriginalContent = d
      this.$store.state.actsComponent = 'ActsEditor'
      this.$store.state.editorActId = e._id
      this.$store.state.editorActBillIndex = parseInt(i) + 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
