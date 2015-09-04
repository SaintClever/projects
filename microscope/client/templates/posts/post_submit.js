Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault(); // ensure we preventDefault on the event argument to our handler to make sure the browser doesn't go ahead and try to submit the form

    var post = { // This function uses jQuery to parse out the values of our various form fields
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postInsert', post, function(error, result){ // Name of method to call or invoke. An argument(as many as you DESIRE). Lastly an asyncCallback. Check posts.js for the Meteor.method we created called 'postInsert'
      // Display the error to the user and abort
      if (error)
        return alert(error.reason);

      // show this result but route anyway
      if (result.postExists)
        alert('This link has already been posted');
    });

    Router.go('postsList');
  }
});

/* Meteor method callbacks - The Meteor.call is a Meteor method callback
Meteor method callbacks always have two arguments, error and result. If for whatever reason the error argument exists, we'll alert the user (using return to abort the callback). If everything's working as it should, we'll redirect the user to the freshly created post's discussion page.
*/

// post._id = Posts.insert(post); // We populate a new post object from the results and asign it to post._id. Therefore a new _id is generated
// Router.go('postPage', post); // The Router's .go() function uses the this generated _id to construct a URL for us to browse to

/*
The net result is the user hits submit, a post is created, and the user is instantly taken to the discussion page for that new post.
*/