import Vue from 'vue'
import Vuex from 'vuex'
import ddp from './ddp'
import Delta from 'quill-delta'
// import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...ddp.state,
    actsComponent: 'ActsViewer',
    billsComponent: 'BillsViewer',
    billTitle: '',
    billComments: '',
    editorDelta: new Delta(),
    editorOriginalContent: new Delta(),
    editorChangeFlag: false,
    editorContent: new Delta(),
    editorOptions: {

    },
    title: '',
    description: '',
    chapter: '',
    editorState: 0,
    searchString: '',
    editorActId: '',
    editorActBillIndex: 0
  },
  mutations: {
    ...ddp.mutations
  },
  actions: {
    ...ddp.actions
  },
  getters: {
    locations (state) {
      return state.locationsList
    }
  },
  modules: {
  }
})
