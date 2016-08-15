Messages = new Mongo.Collection('messages');

Messages.allow({
  insert: function(userId, message) {
    message.createdAt = new Date();
    return true;
  },
  update: function(userId, message, fields, modifier) {
    message.createdAt = new Date();
    return true;
  },
  remove: function(userId, message) {
    return true;
  }
});
