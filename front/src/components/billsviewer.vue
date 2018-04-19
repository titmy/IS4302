<template>
  <div id="bills-viewer">
    <BillCard v-for="(e,i) in bills" :key="i" :bill="e" @click.native="showEditor(e)"></BillCard>
  </div>
</template>

<script>
import BillCard from './billcard.vue'
import Delta from 'quill-delta'
export default {
  components: {
    BillCard
  },
  computed: {
    bills () {
      return this.$store.state.billsList
    },
    acts () {
      return this.$store.state.acts
    },
    amendments () {
      return this.$store.state.amendments
    }
  },
  methods: {
    showEditor (e) {
      var d = new Delta()
      // console.log(this.amendments[e.amendmentIds[0]].content)
      this.amendments[e.amendmentIds[0]].content.forEach(function (op) {
        if ('insert' in op) {
          d.insert(op.insert, {background: '#cce8cc'})
        } else if ('delete' in op) {
          d.retain(op.delete, {background: '#facccc', strike: true})
        } else if ('retain' in op) {
          d.retain(op.retain)
        }
      })
      this.$store.state.editorChangeFlag = true
      this.$store.state.editorState = 3
      this.$store.state.title = this.acts[e.actId].title
      this.$store.state.chapter = this.acts[e.actId].chapter
      this.$store.state.description = this.acts[e.actId].description
      this.$store.state.billTitle = e.title
      this.$store.state.billComments = e.comments
      this.$store.state.chapter = e.chapter
      this.$store.state.editorContent = this.acts[e.actId].content.compose(d)
      this.$store.state.editorOriginalContent = this.acts[e.actId].content.compose(this.amendments[e.amendmentIds[0]].content)
      this.$store.state.billsComponent = 'ActsEditor'
      this.$store.state.editorActId = e._id
    }
  }
}
</script>

<style scoped>
#bills-viewer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
