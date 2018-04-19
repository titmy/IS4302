import SimpleSchema from 'simpl-schema'

amendments = new Meteor.Collection('amendments');

amendments.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
})

amendmentSchema = new SimpleSchema({
  content: {
    type: String
  },
  remark: {
    type: String,
    optional: true
  },
  billId: {
    type: String
  }
});

amendments.attachSchema( amendmentSchema );

Meteor.methods({
  createAmendment: function (amendment) {
    amendments.insert(amendment)
  }
})
