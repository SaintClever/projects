Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a'); // create and store a href tag in var a
    a.href = this.url; // return the href tag with the entire URL
    return a.hostname; // return the hostname which has a href
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }
  // ,
  // commentsCount: function() {
  //   return Comments.find({postId: this._id}).count();
  // }
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});