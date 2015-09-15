// Everything gets pushed into these templates
Router.configure({
  layoutTemplate: 'layout',
  // loadingTemplate: 'loading',
  // notFoundTemplate: 'notFound' 
});


Router.map(function(){
  // Home
  this.route('/', {
    path: '/',
    template: 'layout'
  });

});


//or

/*
//Home
this.route('/', function () {
  this.layout('layout');
});
*/