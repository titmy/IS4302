import SimpleSchema from 'simpl-schema'

acts = new Meteor.Collection('acts');

acts.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
})

actSchema = new SimpleSchema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  description: {
    type: String
  },
  chapter: {
    type: String
  },
  billIds: [String]
});

acts.attachSchema( actSchema );

Meteor.methods({
  createAct: function (act) {
    acts.insert(act);
  },
  updateAct: function (act) {
    var change = act;
    var id = act._id;
    delete act._id
    acts.update(id, {$set: act})
  }
});
