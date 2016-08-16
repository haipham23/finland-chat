'use strict'

Meteor.publish('messages', function() {
  return Messages.find({}, {sort: {createdAt : 1}, limit: 1000});
});

Meteor.methods({
  'chat-insert'(msg) {
    if(!this.userId) throw new Meteor.Error('Not authorized');

    Messages.insert({
      owner: this.userId,
      nickName: msg.nickName,
      content: msg.content,
      createdAt: new Date(),
      isEdited: false
    });

  }
});
