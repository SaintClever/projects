/********* METEOR DEPLOY *********/

// user$ meteor deploy mytodos15.meteor.com ("mytodos" is the app name given at meteor.com)

/********* DEPLOY END *********/







/********* MONGO COLLECTION *********/

Todos = new Mongo.Collection('todos');
// Finding the data in the Mongo.Collection
// Todos.find().fetch();

/********* COLLECTION END *********/










/********* METEOR CLIENT *********/

// Inserting data into the Mongo.Collection
// Todos.insert({text:"Start Meteor Course", createdAt:new Date()});

if (Meteor.isClient) {
  // Clients call Meteor.subscribe to express interest in document collections published by the server.
  Meteor.subscribe('todos');
  // Template Helpers
  Template.main.helpers({ // Notice "main" contains "todos". This "todos" is the Mongo.Collection('todos') db you created. (In your HTML file the same structure takes) place
    todos: function(){
      return Todos.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.main.events({
    //The "submit" is the action. The ".new-todo" is the html element
    "submit .new-todo": function(event){
      // The "text" in event.target.text.value represents the "name="text"" in the input tag, within the form.

      // "event.target..." basicaly means get the element that triggered a specific event, which in this case is "text"

      var text = event.target.text.value;
      // Todos.insert({
      //   text: text,
      //   createdAt: new Date(),
      //   userId: Meteor.userId(), // Meteor.userId() Get the current user id, or null if no user is logged in. A reactive data source.
      //   username: Meteor.user().username // Meteor.user() Get the current user record, or null if no user is logged in. A reactive data source.
      // });
      Meteor.call('addTodo', text);
      // Clear Form
      event.target.text.value = '';

      // Prevent Submit
      return false;
    },
    "click .toggle-checked": function(){
      // The $set operator replaces the value of a field with the specified value.
      // The $set operator expression has the following form:
      // { $set: { <field1>: <value1>, ... } }
      // "set this field to this value"
      // Todos.update(this._id, {$set:{checked: ! this.checked}});
      Meteor.call('setChecked', this._id, !this.checked);
    },
    "click .delete-todo": function(){
      if(confirm('Are You Sure?')){
        // Todos.remove(this._id);
        Meteor.call('deleteTodo', this._id);
      }
    }
  });

  // to request a username instead of a email in account signin / create account
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

/********* CLIENT END *********/










/********* METEOR SERVER *********/

// Notes: After your methods are created apply
// user$ meteor remove insecure                  
// user$ meteor remove autopublish 
// the above commands strips away all insecurities within your app to potential hackers. Because of this we have to create a server

if (Meteor.isServer) {
  // To publish data to clients, call Meteor.publish on the server with two arguments: the name of the record set, and a publish function that will be called each time a client subscribes to this record set.
  Meteor.publish('todos', function(){
    if(!this.userId){ // <- This basically states...If no user is logged-in return ALL the Todos
      return Todos.find();
    } else {
      return Todos.find({userId: this.userId}); // <- If a user is currently logged-in find HIS or HER 'todos'
    }
  });
}

/********* SERVER END *********/










/********* METEOR METHODS *********/

// Meteor Methods
// Are both on the client and server
Meteor.methods({
  addTodo: function(text){

    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  deleteTodo: function(todoId){
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Todos.remove(todoId);
  },

  setChecked: function(todoId, setChecked){
    // Make personal or public todo list information viewable only to currently logged in user
    /* This method lets you retrieve a specific document from your collection. The findOne method is most commonly called with a specific document _id:
    ex. var post = Posts.findOne(postId); */
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Todos.update(todoId, {$set:{checked: setChecked}});
  }

});

/********* METHODS END *********/




