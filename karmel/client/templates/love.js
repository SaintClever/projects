// if (Love.find().count === 0) {
//   Love.insert({
//     questionnaire: {
//       question: "01. What do you like most of love?",
//       opt00: "My sweet and only darling.",
//       opt01: "enjoy the love feeling.... When we touch it\'s like heaven",
//       opt02: "I don\'t really know...",
//       opt03: "I love the time we spend togheter!",
//       opt04: "The safeness i feel with my love... the wonderful kisses we share",
//       opt05: "All of it! And when we get married, more of it !!!" 
//     }
//   );
// }

Template.love.helpers({ // love is the template name
  // love: function() { // love is also the name with gave our function but it can have any name, also this is item you loop through
    questionnaire: {
      question: "01. What do you like most of love?",
      opt00: "My sweet and only darling.",
      opt01: "enjoy the love feeling.... When we touch it\'s like heaven",
      opt02: "I don\'t really know...",
      opt03: "I love the time we spend togheter!",
      opt04: "The safeness i feel with my love... the wonderful kisses we share",
      opt05: "All of it! And when we get married, more of it !!!" 
    } //data
  // }
});
//Template
//function, loop Item
//data