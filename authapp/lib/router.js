Router.configure({
  layoutTemplate: 'form_layout'
});

Router.map(function(){
  // Login Home
  this.route('login', {
    paht: '/',
    template: 'login'
  });
});