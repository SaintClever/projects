// Profiel Images Collection
ProfileImages = new FS.Collection("ProfileImages", {
  stores: [new FS.Store.GridFS("ProfileImages")]
});



// Note: Because we removed insecure we have to allow people to insert, update, and find/dsiplay there avatar
ProfileImages.allow({
  insert:function(userId, doc){ // <- The first argument is for the userId and the second one is for the document
    return true;
  },
  update:function(userId, doc, fields, modifier){
    return true;
  },
  download:function(){ // Find or display image
    return true;
  }
});



UserImages = new Mongo.Collection("UserImages");

Posts = new Mongo.Collection("posts");

Posts.attachSchema(new SimpleSchema({
  body: {
    type: String,
    max: 500
  },
  userId: {
    type: String,
    autoValue: function(){return Meteor.userId()}
  },
  username:{
    type: String,
    autoValue: function(){return Meteor.users.findOne({_id: this.userId}).username}
  },
  createdAt: {
    type: Date,
    autoValue: function(){return new Date()}
  }
}));



// Note: Because we removed insecure we have to allow people to insert a post
Posts.allow({
  insert:function(userId, doc){
    return true;
  }
});


