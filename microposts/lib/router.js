// First we need to configure iron:router

// meteor add iron:router

Router.configure({
  layoutTemplate: 'layout' // we configure the router to fetch for a template named 'layout'
});



Router.map(function(){
  // Posts Route
  // "posts" route is set to home '/'
  this.route('posts',{
    path: '/', // The path of the template
    template: 'posts' // Template to access
  });


  // About Route
  this.route('about'); // navigates you to http://localhost:3000/about


  // Profile Route
  this.route('profile');
});