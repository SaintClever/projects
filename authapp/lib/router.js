Router.configure({
  layoutTemplate: 'form_layout'
});

Router.map(function(){
  // Login
  this.route('login', {
    path: '/',
    template: 'login'
  });

  // Register
  this.route('register');
});