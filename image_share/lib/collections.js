// Whatever is in lib runs first
Images = new Mongo.Collection("images");

// set up security on Images collection
Images.allow({
  insert:function(userId, doc){
    console.log("testing security on image insert");
    if(Meteor.user()){
      // console.log(doc);
      // forced the image to be owned by the user
      doc.createdBy = userId;
      if(userId != doc.createdBy){// the user is messing about 
        return false;
      } else { // the user is logged in, the image has the correct userId
        return true;
      }
    } else {// user not logged in
      return false;
    }
  },
  remove:function(userId, doc){
    return true; //<-- this means the user is allowed to remove from the doc
  }
})