'use strict';

ServiceConfiguration.configurations.remove({
  service: 'facebook'
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: Meteor.settings.fbId,
  secret: Meteor.settings.fbSecret
});

ServiceConfiguration.configurations.remove({
  service: 'google'
});

ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: Meteor.settings.gId,
  secret: Meteor.settings.gSecret
});
