Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  /*
  var img_data = [
    {
      img_src: "laptops.jpg",
      img_alt: "some laptops"
    },
    {
      img_src: "bass.jpg",
      img_alt: "a bass guitar"
    },
    {
      img_src: "beard.jpg",
      img_alt: "some beard"
    }
  ];
  */

  // The below template is pulling in data from the array above not from the db.
  // Template.images.helpers({images:img_data});

  // This template is pulling in data from the mongo db collection named Images
  Template.images.helpers({images:
    Images.find({}, {sort:{createdOn: -1, rating: -1}})
  });

  // used to display the currently logged in user
  Template.body.helpers({username:function(){
    if (Meteor.user()) {
      return Meteor.user().emails[0].address;
    } else {
      return "anonymous internet user";
    }
    // console.log(Meteor.user().emails[0].address); // Meteor.user is a reactive data source. Its also the users specific account recognizer aka email address whenever you sign in
    // return "dunno..who are you?";
    }
  });

  Template.images.events({
    'click .js-image':function(event){
      $(event.target).css("width", "50px");
    },
    'click .js-del-image':function(event) {
      var image_id = this._id;
      console.log(image_id);
      $("#" + image_id).hide('slow', function (){
        Images.remove({"_id":image_id});
      })
    },
    'click .js-rate-image':function(event) {
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      
      var image_id = this.id;
      console.log(image_id);
      Images.update({_id:image_id}, {$set: {rating:rating}});
    },
    'click .js-show-image-form':function(event) {
      $("#image_add_form").modal('show');
    }
  });

  Template.image_add_form.events({
    'submit .js-add-image':function(evnet) { // We listen to submit events on forms
      var ima_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log("src:" + img_src + " alt:" + img_alt);

      Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdOn:new Date()
      });
      $("#image_add_form").modal('hide'); // Dismisses the modal after image is added
      return false; // This prevents the page from being reloaded
    }
  });
}





if (Meteor.isServer) {
  // console.log("I am the server");
}