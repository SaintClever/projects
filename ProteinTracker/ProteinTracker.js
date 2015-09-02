Users = new Mongo.Collection('users');
History = new Mongo.Collection('history');


/********* CLIENT *********/
// Hard coding data in template
if (Meteor.isClient) {

  /********* MUST BE THE SAME NAME AS THE COLLECTION NAMES *********/
  // Subscribe from the client
  Meteor.subscribe('users');
  Meteor.subscribe('history');
  /********* MUST BE THE SAME NAME AS THE COLLECTION NAMES *********/

  Template.userDetails.helpers({
    user: function(){

      /* hard coded
      var user = {
        total: 123,
        goal: 251
      };
      return user;
      */


      return Users.findOne();

    }
  });


  Template.history.helpers({
    historyItem: function(){

      /* hard coded
       var historyItems = [
         { date: '10/31/2015 5:00 AM', value: 20 },
         { date: '10/31/2015 6:00 AM', value: 20 },
         { date: '10/31/2015 7:00 AM', value: 20 },
         { date: '10/31/2015 8:00 AM', value: 20 },
         { date: '10/31/2015 9:00 AM', value: 20 }
       ]
       return historyItems;
       */

       // The first arguement is to filter the returned data, we're filtering nothing
       // The second arguemnt is to sort the returned data.
       // Then we limit our Documents within our Collection to only show 5
       return History.find({}, {sort: {date: -1}, limit: 5});
    }
  });


  Template.userDetails.events({
    'click #addAmount': function(event){
      // prevent the page from relading
      event.preventDefault();

      // parseInt(); takes the user string and turns it into an interger
      var amount = parseInt($("#amount").val());

      // Update the Users.Collection by this._id.
      // $inc means increment
      // $inc the total by the amount variable (not the amount variable is the input box)
      Users.update(this._id, {$inc: {total: amount}});
      History.insert({
        value: amount,
        date: new Date().toTimeString(),
        userId: this._id
      });
    }
    
  });


}
/********* CLIENT *********/





/********* SERVER *********/
if (Meteor.isServer) {

  /********* MUST BE THE SAME NAME AS THE COLLECTION NAMES *********/
  // Publising occurs in the server
  Meteor.publish('users', function(){
    return Users.find();
  });

  Meteor.publish('history', function(){
    return History.find();
  })
  /********* MUST BE THE SAME NAME AS THE COLLECTION NAMES *********/


  Meteor.startup(function () {
  // code to run on server at startup

      // If theres no data in our Users Collection insert total & goal dummy data
      if(Users.find().count() === 0) {


        Users.insert({
          total: 120,
          goal: 200
        });
      }
    

      if(History.find().count() === 0) {
        History.insert({
          date: new Date().toTimeString(),
          value: 50
        });
        History.insert({
          date: new Date().toTimeString(),
          value: 30
        });
        History.insert({
          date: new Date().toTimeString(),
          value: 10
        });
      }
  });
}
/********* SERVER *********/