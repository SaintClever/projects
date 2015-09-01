Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a'); // create and store a href tag in var a
    a.href = this.url; // return the href tag with the entire URL
    return a.hostname; // return the hostname which has a href
  }
});