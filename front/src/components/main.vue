<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-dense md-primary" style="background-color: #d50000;">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-end">
            <!-- <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button> -->
            <template v-if="currentTab === 'Acts'">
              <md-button class="md-primary" @click.native="s.actsComponent = 'ActsEditor'" v-if="s.actsComponent === 'ActsViewer'">
                <md-icon>add</md-icon> New Act
              </md-button>
              <!-- <md-field style="color:white;"> -->
                <!-- <label>Type here!</label> -->
                <!-- <md-input v-model="s.searchString" placeholder="Search"></md-input> -->
                <!-- <span class="md-helper-text">Helper text</span> -->
              <!-- </md-field> -->
              <md-button class="md-primary" @click.native="clearEditor"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>arrow_back</md-icon> Back
              </md-button>
              <!-- <md-button class="md-primary" @click.native="lastRevision"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>change_history</md-icon> Changes
              </md-button> -->
              <md-button class="md-primary" @click.native="lastRevision"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>undo</md-icon> Last revision
              </md-button>
              <md-button class="md-primary" @click.native="nextRevision"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>redo</md-icon> Next revision
              </md-button>
              <md-button class="md-primary" @click.native="clearEditor"  v-if="s.actsComponent === 'ActsEditor' && s.editorState !== 0">
                <md-icon>close</md-icon> Cancel
              </md-button>
              <md-button class="md-primary" @click.native="enableEditing"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>receipt</md-icon> New Amendment
              </md-button>
              <md-button class="md-primary" @click.native="reviewChanges"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 1">
                <md-icon>done</md-icon> Confirm and Review Changes
              </md-button>
              <md-button class="md-primary" @click.native="save" v-if="s.actsComponent === 'ActsEditor' && s.editorState === 2">
                <md-icon>send</md-icon> Propose as New Bill
              </md-button>
            </template>
            <template v-if="currentTab === 'Bills'">
              <md-button class="md-primary" @click.native="voteBill()" v-if="s.billsComponent === 'ActsEditor' && s.editorState === 3">
                Vote <md-icon>thumb_up</md-icon>
              </md-button>
              <md-button class="md-primary" v-if="s.billsComponent === 'ActsEditor' && s.editorState === 3">
                Vote <md-icon>thumb_down</md-icon>
              </md-button>
              <md-button class="md-primary" @click.native="$store.state.billsComponent = 'BillsViewer'" v-if="s.billsComponent === 'ActsEditor' && s.editorState === 3">
                <md-icon>arrow_back</md-icon> Back
              </md-button>
              <!-- <md-button class="md-primary" @click.native="clearEditor"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>undo</md-icon> Last revision
              </md-button>
              <md-button class="md-primary" @click.native="clearEditor"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>redo</md-icon> Next revision
              </md-button>
              <md-button class="md-primary" @click.native="clearEditor"  v-if="s.actsComponent === 'ActsEditor' && s.editorState !== 0">
                <md-icon>close</md-icon> Cancel
              </md-button>
              <md-button class="md-primary" @click.native="enableEditing"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 0">
                <md-icon>receipt</md-icon> Create New Amendment
              </md-button>
              <md-button class="md-primary" @click.native="reviewChanges"  v-if="s.actsComponent === 'ActsEditor' && s.editorState === 1">
                <md-icon>done</md-icon> Confirm and Review Changes
              </md-button>
              <md-button class="md-primary" @click.native="save" v-if="s.actsComponent === 'ActsEditor' && s.editorState === 2">
                <md-icon>send</md-icon> Propose as New Bill
              </md-button> -->
            </template>
          </div>

          <div class="md-toolbar-section-start">
            <span class="md-title">Singapore Statutes Blockchain</span>
            <!-- <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button> -->
            <md-button class="md-icon-button" v-if="s.showBack">
              <md-icon>arrow_back</md-icon>
            </md-button>
            <md-tabs md-sync-route class="md-primary">
              <md-tab id="tab-home" md-label="Current Acts" @click="currentTab = 'Acts'"></md-tab>
              <md-tab id="tab-pages" md-label="Pending Bills" @click="currentTab = 'Bills'"></md-tab>
            </md-tabs>
            <!-- <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button> -->
          </div>
        </div>
      </md-app-toolbar>

      <!-- <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer> -->

      <md-app-content>
        <component v-bind:is="currentTab"></component>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Acts from './acts.vue'
import Bills from './bills.vue'
import Delta from 'quill-delta'
export default {
  components: {
    Acts,
    Bills
  },
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false,
    currentTab: 'Acts'
  }),
  methods: {
    save () {
      console.log(this.s.billTitle)
      this.$store.dispatch('call', {
        methodName: 'createAmendingBill',
        args: [
          this.s.editorActId,
          {
            content: JSON.stringify(this.s.editorDelta)
          },
          this.s.billTitle,
          this.s.billDescription
        ]
      })
      // this.$store.dispatch('call', {
      //   methodName: 'createAct',
      //   args: [{
      //     title: this.s.title,
      //     description: this.s.description,
      //     chapter: this.s.chapter,
      //     content: JSON.stringify(this.s.editorContent)
      //   }]
      // })
      this.clearEditor()
    },
    voteBill () {
      this.$store.dispatch('call', {
        methodName: 'voteBill',
        args: [
          this.s.editorActId
        ]
      })
      this.s.billsComponent = 'BillsViewer'
    },
    clearEditor () {
      this.s.editorState = 0
      this.s.title = ''
      this.s.description = ''
      this.s.chapter = ''
      this.s.editorContent = new Delta()
      this.s.actsComponent = 'ActsViewer'
      this.s.editorActId = ''
      this.s.billTitle = ''
      this.s.billComments = ''
    },
    enableEditing () {
      this.s.editorState = 1
    },
    reviewChanges () {
      this.s.editorDelta = this.s.editorOriginalContent.diff(this.s.editorContent)
      var d = new Delta()
      this.s.editorDelta.forEach(function (op) {
        if ('insert' in op) {
          d.insert(op.insert, {background: '#cce8cc'})
        } else if ('delete' in op) {
          d.retain(op.delete, {background: '#facccc', strike: true})
        } else if ('retain' in op) {
          d.retain(op.retain)
        }
      })
      this.s.editorState = 2
      this.s.editorChangeFlag = true
      this.s.editorContent = this.s.editorOriginalContent.compose(d)
      // this.$emit('changeEditorContent', this.s.editorContent)
      // console.log(this.$refs.quillEditor.quill)
      // console.log(this.s.editorDelta)
    },
    lastRevision () {
      var t = this
      var e = t.s.acts[t.s.editorActId]
      var d = e.content
      if (t.s.editorActBillIndex > 0) {
        t.s.editorActBillIndex -= 1
      }
      var i = 0
      if ('billIds' in e) {
        for (i in e.billIds) {
          if (i < t.s.editorActBillIndex) {
            d = d.compose(t.s.amendments[t.s.bills[e.billIds[i]].amendmentIds[0]].content)
          }
        }
      }
      t.s.editorChangeFlag = true
      t.s.editorContent = d
    },
    nextRevision () {
      var t = this
      var e = t.s.acts[t.s.editorActId]
      var d = e.content
      if (t.s.editorActBillIndex < e.billIds.length) {
        t.s.editorActBillIndex += 1
      }
      var i = 0
      if ('billIds' in e) {
        for (i in e.billIds) {
          console.log(t.s.editorActBillIndex)
          if (i < t.s.editorActBillIndex) {
            d = d.compose(t.s.amendments[t.s.bills[e.billIds[i]].amendmentIds[0]].content)
          }
        }
      }
      t.s.editorChangeFlag = true
      t.s.editorContent = d
    },
    viewChanges () {

    }
  },
  computed: {
    s () {
      return this.$store.state
    }
  }
}
</script>

<style lang="scss">

  .md-app {
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
