Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('about', {
    path: '/',
    template: 'about'
  })
});