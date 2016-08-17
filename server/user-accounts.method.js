'use strict';

Accounts.config({
  forbidClientAccountCreation: true,
  loginExpirationInDays: null
});

Meteor.publish('usersOnline', function() {
  return Meteor.users.find({ 'status.online': true }, { fields: { profile: 1 } });
});

Meteor.methods({
  'get-details'() {
    var user = Meteor.users.findOne({_id: this.userId});

    if(user) {
      return user.profile;
    } else {
      throw new Meteor.Error('User not found');
    }
  },
  'save-nick'(nick) {
    if(Meteor.users.find({'profile.nickName': nick}).count() > 0) {
      throw new Meteor.Error('This nick name is not available');
    }

    return Meteor.users.update({_id: this.userId}, { $set: { 'profile.nickName': nick } });
  },
  'register'(account) {
    if(!account.email || !account.password) {
      throw new Meteor.Error('Incorrect email or password');
    }

    return Accounts.createUser({
      email: account.email,
      password: account.password
    });
  }
});

Meteor.users.deny({
  update() { return true; }
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
    user.profile = options.profile;
    user.profile.picture = `http://graph.facebook.com/${user.services.facebook.id}/picture/?type=small`;
  } else {
    user.profile = {
      picture: '/images/chat.svg'
    };
  }

  user.profile.nickName = options.email;
  return user;
});

// function _generateNick() {
//   let nickName = `User ${Math.floor((Math.random() * 1000000))}`;
//
//   while(Meteor.users.find({'profile.nickName': nickName}).count() > 0) {
//     nickName = `User ${Math.floor((Math.random() * 1000000))}`;
//   }
//
//   return nickName;
// }
