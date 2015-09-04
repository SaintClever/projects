Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    if (Meteor.isServer) {
      postAttributes.title += "(server)";
      // Wait for 5 seconds
      Meteor._sleepForMs(5000);
    } else {
      postAttributes.title += "(client)";
    }

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  }
});

// ---------------------------------------------- We created a Meteor.method above, therefore the allow method is not needed

/*
Posts.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId
  }
});
*/

/* Meteor remove insecure

Thankfully data security is baked right into Meteor collections; it's just that it's turned off by default when you create a new project. This enables you to get started easily and start building out your app while leaving the boring stuff for later.

Our app no longer needs these training wheels, so let's take them off! We'll remove the insecure package:
*/