// The server is publishing the "post", "ProfileImages" and "UserImages" so the client can subscribe to it.

Meteor.publish("posts", function(){
  return Posts.find();
});

Meteor.publish("ProfileImages", function(){
  return ProfileImages.find();
});

Meteor.publish("UserImages", function(){
  return UserImages.find();
});