Template.register.events({
  "submit .form-signup": function(event){
    var email = event.target.email.value;
    var password = event.target.password.value;
    var password2 = event.target.password2.value;
    var first_name = event.target.first_name.value;
    var last_name = event.target.last_name.value;

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        first_name: first_name,
        first_last: first_last
      }
    }, function(err){
      if(err){
        FlashMessages.sendError('There was an error with registration');
      } else {
        FlashMessages.sendSuccess('Account Created! You are now logged in');
      }
    });

    // Prevent Submit
    return false;
  }
})