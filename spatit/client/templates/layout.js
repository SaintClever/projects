// Truncate Text
Template.registerHelper('truncateText', function(text, length){
  var newText = text.substring(0, length);
  newText = newText.substr(0, Math.min(newText.length, newText.lastIndexOf(" ")))
  return new Spacebars.SafeString(newText)
});


// Get Average Rating
Template.registerHelper('getAvg', function (reviews){
  var sum = 0;
  for (var i = 0; i < reviews.length; i++) {
    sum += parseInt(reviews[i].rating, 10);
  }
  var avg = sum / reviews.length;
  return Math.round(avg);
});


// Get Reviews Total
Template.registerHelper('getReviewsTotal', function (total){
  if(total > 0){
    return total;
  } else {
    return 0;
  }
});