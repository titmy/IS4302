import SimpleSchema from 'simpl-schema'

bills = new Meteor.Collection('bills');

bills.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

billSchema = new SimpleSchema({
  amendmentIds: [String],
  remark: {
    type: String,
    optional: true
  },
  minVotes: {
    type: Number
  },
  voteIds: [String],
  billState: {
    type: String
  },
  comments: {
    type: String,
    optional: true
  },
  actId: {
    type: String
  },
  dateOfEffect: {
    type: Date
  },
  title: {
    type: String
  }
});

bills.attachSchema( billSchema );

Meteor.methods({
  createBill: function (bill) {
    bills.insert(bill)
  },
  createAmendingBill: function (actId, firstAmendment, title, description) {
    console.log(title)
    var bill = {
      amendmentIds: [],
      minVotes: 1,
      voteIds: [],
      billState: 'PENDING',
      actId: actId,
      dateOfEffect: new Date(),
      title: title,
      comments: description
    };
    var billId = bills.insert(bill);
    console.log(billId);
    firstAmendment.billId = billId;
    console.log(firstAmendment);
    var amdId = amendments.insert(firstAmendment);
    console.log(amdId);
    bills.update(billId, {$push: {amendmentIds: amdId}})
  },
  createEnactmentBill: function (newAct) {
    var actId = acts.insert(newAct);
    var bill = {
      amendmentIds: [],
      minVotes: 1,
      voteIds: [],
      billState: 'PENDING',
      actId: actId,
      dateOfEffect: new Date()
    };
  },
  voteBill: function (billId) {
    // bills.update({_id: billId}, {$push: {voteIds: this.userId}})
    bills.update(billId, {$push: {voteIds: 'a'}})
    var bill = bills.findOne(billId)
    if (bill.voteIds.length >= bill.minVotes && bill.billState === 'PENDING') {
      bills.update(billId, {$set: {billState: 'PASSED'}})
      acts.update(bill.actId, {$push: {billIds: billId}})
    }
  },
  updateBill: function (bill) {
    var change = bill;
    var id = bill._id;
    delete bill._id
    bills.update(id, {$set: bill})
  }
})
