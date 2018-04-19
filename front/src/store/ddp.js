import Vue from 'vue'
import _ from 'lodash'
import { createClass } from 'asteroid'
import Delta from 'quill-delta'
// import { METEOR_ENDPOINT } from '../config'

const createConn = function (dispatch) {
  const Asteroid = createClass()

  const conn = new Asteroid({
    endpoint: 'ws://localhost:3000/websocket'
    // endpoint: METEOR_ENDPOINT
  })

  conn.on('connected', function () {
    console.log('Connected to Server!')
  })
  // conn.loginWithPassword({username: 'foodlover', password: '123456'})
  // }.bind(this))

  conn.on('disconnected', function () {
    console.log('Disconnected!')
  })

  conn.on('loggedIn', function () {
    console.log('Logged In!')
    conn.subscribe('vendors')
    conn.subscribe('currentOrderCustomer')
  })

  conn.on('loggedOut', function () {
    // this.$router.push('/')
    console.log('Logged Out!')
  })

  conn.ddp.on('added', function (item) {
    dispatch('ddpAdded', item)
  })

  conn.ddp.on('changed', function (item) {
    dispatch('ddpChanged', item)
  })

  conn.ddp.on('removed', function (item) {
    dispatch('ddpRemoved', item)
  })

  conn.ddp.on('ready', function () {
    console.log('Ready!')
  })
  return conn
}

const state = {
  conn: null
}

const actions = {
  ddpConnect ({ commit, dispatch, state }) {
    if (!state.conn || state.conn) {
      const conn = createConn(dispatch)
      conn.connect()
      commit('setConn', conn)
      dispatch('subscribe', { subscriptionName: 'location' })
    } else {
      state.conn.connect()
    }
  },
  ddpDisconnect ({ state }) {
    state.conn.disconnect()
  },
  subscribe ({ commit, state }, { subscriptionName, args }) {
    args = args || []
    state.conn.subscribe(subscriptionName, ...args)
  },
  call ({ commit, state, dispatch }, { methodName, args }) {
    args = args || []
    console.log(methodName)
    console.log(args)
    state.conn.call(methodName, ...args).then(console.log)
  },
  ddpAdded ({ commit, state }, item) {
    var obj = {
      ...item.fields,
      _id: item.id
    }
    console.log(item, obj)
    if (!(item.collection in state)) {
      commit('initializeCollection', item.collection)
    }
    if (obj._id in state[item.collection]) {
      commit({
        type: 'updateCollection',
        collection: item.collection,
        item: obj
      })
    } else {
      commit({
        type: 'addToCollection',
        collection: item.collection,
        item: obj
      })
    }
  },
  ddpChanged ({ commit, state }, item) {
    var newObj = {
      ...state[item.collection][item.id]
    }
    if ('cleared' in item) {
      newObj = _.omit(newObj, item.cleared)
    }
    if ('fields' in item) {
      newObj = {
        ...newObj,
        ...item.fields
      }
    }
    commit({
      type: 'updateCollection',
      collection: item.collection,
      item: newObj
    })
  },
  ddpRemoved ({ commit }, item) {
    commit({
      type: 'removeCollection',
      collection: item.collection,
      id: item.id
    })
  }
}

const mutations = {
  setConn (state, conn) {
    state.conn = conn
  },
  initializeCollection (state, collection) {
    Vue.set(state, collection, {})
    Vue.set(state, collection + 'List', [])
  },
  addToCollection (state, { collection, item }) {
    console.log('addToCollection', state, collection, item)
    if ((collection === 'acts' || collection === 'amendments') && 'content' in item) {
      item.content = new Delta(JSON.parse(item.content))
    }
    Vue.set(state[collection], item._id, item)
    state[collection + 'List'].push(item)
    console.log('mutations', state)
  },
  updateCollection (state, { collection, item }) {
    if ((collection === 'acts' || collection === 'amendments') && 'content' in item) {
      item.content = new Delta(JSON.parse(item.content))
    }
    Vue.set(state[collection], item._id, item)
    const collectionList = state[collection + 'List']
    const index = collectionList.findIndex(function (e) {
      return e._id === item.id
    })
    collectionList[index] = item
  },
  removeCollection (state, { collection, id }) {
    Vue.delete(state[collection], id)
    const collectionList = state[collection + 'List']
    collectionList.splice(collectionList.findIndex(function (e) {
      return e._id === id
    }), 1)
  }
}

export default {
  state,
  actions,
  mutations
}
