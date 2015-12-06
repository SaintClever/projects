/// routing
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', { // This means I'm going to render the template called welome to the main, which is located in ApplicationLayout
    to:"main"
  });
});

Router.route('/images', function () {
  this.render('navbar', { // render navbar to navbar
    to:"navbar"
  });
  this.render('images', { // render images to main
    to:"main"
  });
});

Router.route('/image/:_id', function () {
  this.render('navbar', { // render navbar to navbar
    to:"navbar"
  });
  this.render('image', { // render images to main
    to:"main",
    data:function(){
      return Images.findOne({_id:this.params._id});
    }
  });
});

/// infiniscroll
//loads in images when scroll
Session.set("imageLimit", 8);
lastScrollTop = 0;
$(window).scroll(function(event){
  // test if we are near the bottom of the window
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    // where are we in the page?
    var scrollTop = $(this).scrollTop();
    // console.log(new Date());
    // test if we are going down
    if (scrollTop > lastScrollTop) {
      /* console.log("going down at the bottom of the page") everytime you hit the bottom of the page this prints out */
      Session.set("imageLimit", Session.get("imageLimit") + 4);
    }
    lastScrollTop = scrollTop;

  }
});



/// accounts config
Accounts.ui.config({ // This forces Meteor to request a username, email and password. By default it only request email and password.
  passwordSignupFields: "USERNAME_AND_EMAIL"
});



/// image.helpers
// Template.images.helpers({images:img_data});
// This template is pulling in data from the mongo db collection named Images
Template.images.helpers({
  images:function(){
    // images:
    if(Session.get("userFilter")){ // They set a filter! So this will only retrieve images which have been created by the user that they clicked on. Otherwise just give them all of the image!
      return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating: -1}});
    } else { // Return all the images
      return Images.find({}, {sort:{createdOn: -1, rating: -1}, limit:Session.get("imageLimit")});
    }
  },
  filtering_images:function(){
    if(Session.get("userFilter")){
      return true;
    } else {
      return false;
    }
  },
  getFilterUser:function(){
    if(Session.get("userFilter")){
      var user = Meteor.users.findOne({_id:Session.get("userFilter")});
      return user.username;
    } else {
      return false;
    }
  },
  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if(user){
      return user.username;
    } else {
      return "anon";
    }
  }
});



/// body.helpers
// used to display the currently logged in user
Template.body.helpers({username:function(){
  if (Meteor.user()) {
    return Meteor.user().username;
    // return Meteor.user().emails[0].address;
  } else {
    return "anonymous internet user";
  }
  // console.log(Meteor.user().emails[0].address); // Meteor.user is a reactive data source. Its also the users specific account recognizer aka email address whenever you sign in
  // return "dunno..who are you?";
  }
});



/// images.events
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
  },
  'click .js-set-image-filter':function(event) {
    Session.set("userFilter", this.createdBy); //Session stores key value pairs, and is a reactive data source. Basically Session only renders only the images created by that specific user, hence the term session. Its that users images or session, and notice the tag "userFilter" above. We're filtering the sessions of a specific user or filtering the users based off a specific session...what?
  },
  'click .js-unset-image-filter':function(event) {
    Session.set("userFilter", undefined); // undefined just means show me the default set up
  }
});



/// image_add_form.events
Template.image_add_form.events({
  'submit .js-add-image':function(evnet) { // We listen to submit events on forms
    var ima_src, img_alt;
    img_src = event.target.img_src.value;
    img_alt = event.target.img_alt.value;
    console.log("src:" + img_src + " alt:" + img_alt);

    if (Meteor.user()){
      Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdOn:new Date(),
        createdBy:Meteor.user()._id
      });
    }
    
    $("#image_add_form").modal('hide'); // Dismisses the modal after image is added
    return false; // This prevents the page from being reloaded
  }
});