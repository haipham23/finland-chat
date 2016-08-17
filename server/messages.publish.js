'use strict'

Meteor.publish('messages', function() {
  return Messages.find({}, {sort: {createdAt : 1}, limit: 1000});
});

Meteor.methods({
  saveMessage(msg) {

    if(!msg.owner && this.userId) {
      Messages.insert({
        owner: this.userId,
        nickName: msg.nickName,
        content: msg.content,
        createdAt: new Date(),
        isEdited: false
      });
    }

    else if(msg.owner && msg.owner === this.userId) {
      Messages.update({_id: msg._id}, {$set: {
        nickName: msg.nickName,
        content: msg.content,
        isEdited: true
      }});
    }

    else {
      throw new Meteor.Error('Not authorized');
    }

  }
});
