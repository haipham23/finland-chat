'use strict';

Accounts.config({
  forbidClientAccountCreation: true,
  loginExpirationInDays: null
});

Meteor.publish('usersOnline', function() {
  return Meteor.users.find({ 'status.online': true });
});

Meteor.methods({
  'get-details'() {
    var user = Meteor.users.findOne({_id: this.userId});
    return user.profile;
  },
  'save-nick'(nick) {
    Meteor.users.update({_id: this.userId}, { $set: { 'profile.nickName': nick } });
  }
});

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    options.profile.picture = `http://graph.facebook.com/${user.services.facebook.id}/picture/?type=large`;
    user.profile = options.profile;
    user.profile.nickName = 'User' + Math.floor((Math.random() * 10000));
  }
  return user;
});
