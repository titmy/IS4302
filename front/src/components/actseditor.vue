<template>
  <div id="acts-editor">
    <div class="outer-box">
      <md-field class="title-field">
        <label>Title</label>
        <md-input v-model="$store.state.title" :disabled="disabled"></md-input>
      </md-field>
      <md-field class="chapter-field">
        <label>Chapter</label>
        <md-input v-model="$store.state.chapter" :disabled="disabled"></md-input>
      </md-field>
    </div>
    <md-field>
      <label>Description</label>
      <md-input v-model="$store.state.description" :disabled="disabled"></md-input>
    </md-field>
    <template v-if="$store.state.editorState !== 0">
      <div class="outer-box">
        <md-field class="title-field">
          <label>Bill Title</label>
          <md-input v-model="$store.state.billTitle" :disabled="disabled"></md-input>
        </md-field>
        <!-- <md-field class="chapter-field"> -->
          <!-- <label>Effective Date</label> -->
          <!-- <md-datepicker class="chapter-field" v-model="selectedDate" /> -->
        <!-- </md-field> -->
      </div>
      <md-field>
        <label>Bill Description</label>
        <md-input v-model="$store.state.billComments" :disabled="disabled"></md-input>
      </md-field>
    </template>
    <quill-editor @change="onEditorChange($event)"
                  ref = "quillEditor"
                  :options = "$store.state.editorOptions">
    </quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// import { Delta } from 'quill-delta'
export default {
  components: {
    quillEditor
  },
  mounted () {
    if (this.$store.state.editorState === 1) {
      this.editor.enable()
      this.disabled = false
    } else if (this.$store.state.editorState === 0) {
      this.editor.disable()
      this.disabled = true
    } else if (this.$store.state.editorState === 2) {
      this.editor.disable()
      this.disabled = false
    }
    this.editor.setContents(this.$store.state.editorContent)
    this.$on('changeEditorContent', function (delta) {
      this.editor.setContents(this.$store.state.editorContent)
    }.bind(this))
  },
  data: () => ({
    disabled: true
  }),
  methods: {
    onEditorChange (e) {
      this.$store.state.editorContent = e.quill.getContents()
    }
  },
  computed: {
    editor () {
      return this.$refs.quillEditor.quill
    }
  },
  watch: {
    '$store.state.editorState': function (v, o) {
      if (v === 1) {
        this.editor.enable()
        this.disabled = false
      } else if (v === 0) {
        this.editor.disable()
        this.disabled = true
      } else if (v === 2) {
        this.editor.disable()
        this.disabled = false
      }
    },
    '$store.state.editorContent': function (v, o) {
      if (this.$store.state.editorChangeFlag) {
        this.editor.setContents(v)
        this.$store.state.editorChangeFlag = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.outer-box {
  display: flex;
  flex-direction: row;
}

.title-field {
  flex: 1 1 auto;
}

.chapter-field {
  flex: 1 0 200px;
}
</style>
