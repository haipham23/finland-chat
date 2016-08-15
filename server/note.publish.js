'use strict'

Meteor.methods({
  'note-update'(note) {
    if(!this.userId || !note._id) throw new Meteor.Error('Not authorized');
    return Note.update({owner: this.userId, _id: note._id}, {$set: {content: note.content}});
  },
  'note-insert'() {
    if(!this.userId) throw new Meteor.Error('Not authorized');
    Note.insert({owner: this.userId, content: '', createdAt: new Date(), isShare: false});
    return Note.find({owner: this.userId}, {_id: 1, content: 1, owner: 0}).fetch().reverse();
  },
  'note-get'() {
    if(!this.userId) throw new Meteor.Error('Not authorized');
    if(Note.find({owner: this.userId}).count() === 0) {
      Note.insert({owner: this.userId, content: '', createdAt: new Date()});
    }
    return Note.find({owner: this.userId}, {_id: 1, content: 1, owner: 0}).fetch().reverse();
  },
  'note-share'(note) {
    if(!this.userId || !note._id) throw new Meteor.Error('Not authorized');
    Note.update({owner: this.userId, _id: note._id}, {$set: {isShare: !note.isShare}});
    return Note.find({owner: this.userId}, {_id: 1, content: 1, owner: 0}).fetch().reverse();
  },
  'note-view'(id) {
    if(!id) throw new Meteor.Error('No Id');
    let n = Note.findOne({_id: id});
    if(n && n.isShare) return n;
    else throw new Meteor.Error('Note not found');
  }
});
