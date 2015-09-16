Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0); // uderscore's without() Method returns a sub-array containing the fields which are not url or title
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    // Latency Compensation in action
    // if (Meteor.isServer) {
    //   postAttributes.title += "(server)";
      // Wait for 5 seconds
    //   Meteor._sleepForMs(5000);
    // } else {
    //   postAttributes.title += "(client)";
    // }

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
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },

  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error('invalid', 'Post not found');
    if (_.include(post.upvoters, this.userId))
      throw new Meteor.Error('invalid', 'Already upvoted this post');
    Posts.update(post._id, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.url)
    errors.url = "Please fill in a URL";
  return errors;
}

// ---------------------------------------------- We created a Meteor.method above, therefore the allow method is not needed

/*
without_.without(array, *values) 
Returns a copy of the array with all instances of the values removed.

_.without([1, 2, 1, 0, 3, 1, 4], 0, 1); <- removes all 0's and 1's
=> [2, 3, 4]
*/

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