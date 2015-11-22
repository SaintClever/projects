PlayersList = new Mongo.Collection('players');

// Template.leaderboard.player = function(){ // player is the name of this helper function which is looking for the leaderboard template

// }

if(Meteor.isClient){

  Template.leaderboard.helpers({ // Template name
    player: function() { // player is the function name
      return PlayersList.find(); //return all from of PlayersList collection
    }
  });

}

if(Meteor.isServer){

}

