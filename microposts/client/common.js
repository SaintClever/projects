// Meteor plugin: https://github.com/Differential/accounts-entry (better than standard sign-in)

// After removing autopublish you have to subscribe to view the posts. If you go to the server you can view function that allows the client to subscribe to the "posts", "ProfileImages" and "UserImagaes".
Meteor.subscribe("posts");

Meteor.subscribe("ProfileImages");

Meteor.subscribe("UserImages");

Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/',        // mandatory - path to redirect to after sign-out
    dashboardRoute: '/',    // mandatory - path to redirect to after successful sign-in
    passwordSignupFields:  'USERNAME_AND_EMAIL' // Allows user to sign in with username or email. Also allows the user to have both username and email present in your account.
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
});

Template.registerHelper('getProfileImg', function(userId){
  var imgUrl = UserImages.findOne({userId: userId}).image
  return imgUrl;
});

// Note: meteor reset wipes your database clean