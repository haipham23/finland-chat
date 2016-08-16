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

// Accounts.onCreateUser( ( options, user )=> {
//
//     user.profile  = getProfile( user );
//
//     function getProfile( user ) {
//
//         let service = user.services;
//         let network = _.keys( service )[ 0 ];
//         let data    = service[ network ];
//         let profile = {};
//
//         if ( network === 'facebook' ) {
//             profile.network = network;
//             profile.id      = data.id;
//             profile.email   = data.email;
//             profile.name    = data.name;
//             profile.locale  = data.locale;
//             profile.gender  = data.gender;
//             profile.picture = 'http://graph.facebook.com/' + data.id + '/picture?type=square';
//         }
//
//         else if ( network === 'google' ) {
//             profile.network = network;
//             profile.id      = data.id;
//             profile.email   = data.email;
//             profile.name    = data.name;
//             profile.locale  = data.locale;
//             profile.picture = data.picture;
//         }
//
//         else if ( network === 'twitter' ) {
//             profile.network = network;
//             profile.id      = data.id;
//             profile.email   = data.email;
//             profile.name    = data.screenName;
//             profile.locale  = data.lang;
//             profile.picture = data.profile_image_url_https;
//         }
//
//         let value        = {};
//         value[ network ] = profile;
//         return value;
//     }
//
//     Meteor.users.update( user._id, {
//         $set: {
//             profile: user.profile
//         }
//     } );
//
//     return user;
//
// } );

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    options.profile.picture = `http://graph.facebook.com/${user.services.facebook.id}/picture/?type=large`;
    user.profile = options.profile;
    user.profile.nickName = 'User' + Math.floor((Math.random() * 10000));
  }
  return user;
});
